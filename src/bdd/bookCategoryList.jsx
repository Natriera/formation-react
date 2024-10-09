import React, { useState, useEffect, useMemo } from 'react';
import ButtonClassic from '../components/buttons/ButtonClassic'; // Lien vers le bouton
import ModalClassic from '../components/modal/modalClassic'; // Lien vers la modal
import InputText from '../components/fields/text-field'; // Lien vers la modal
import ClicableRow from '../components/rows/ClicableRow'; // Lien vers la modal
import RowType from '../components/rows/RowType'; // Lien vers RowType


const CategoryList = () => {

  // Fonctions pour sauvegarder et charger depuis le Local Storage
  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const loadFromLocalStorage = (key) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  };



  const [categories, setCategories] = useState(() => loadFromLocalStorage('categories') || []);
  const [compteurCat, setCompteurCat] = useState(() => loadFromLocalStorage('compteurCat') || 0);

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryText, setNewCategoryText] = useState('');
  const [searchAllBooks, setSearchAllBooks] = useState('');



  const allBooks = useMemo(() => {
    return categories.flatMap(category =>
      category.books.map(book => ({
        ...book,
        categoryTitle: category.title // Ajoute le titre de la catégorie au livre
      }))
    );
  }, [categories]); // Recalculer la liste si les catégories changent

  const filteredBooks = useMemo(() => {
    // Ici, on effectue le filtrage des livres selon la recherche
    return allBooks.filter(book => book.title.toLowerCase().includes(searchAllBooks.toLowerCase()));
  }, [allBooks, searchAllBooks]); // Le filtre ne s'exécute que si `books` ou `searchTerm` change

  const [openRowId, setOpenRowId] = useState(null)

  const handleToggleRow = (id) => {
    // Si la même ligne est cliquée, la ferme. Sinon, ouvre la nouvelle ligne.
    setOpenRowId(prevId => (prevId === id ? null : id));
  };

  const handleAddCategory = () => {
    if (newCategoryText.trim() === '') return;

    const newCategory = { id: compteurCat, title: newCategoryText, books: [], compteur: 0 };
    setCategories([...categories, newCategory]);
    setCompteurCat(compteurCat+1);

    setNewCategoryText(''); // Réinitialiser le champ
    setIsModalOpen(false); // Fermer la modal
  };


  // Sauvegarder les catégories dans le Local Storage à chaque changement
  useEffect(() => {
    saveToLocalStorage('compteurCat', compteurCat);
  }, [compteurCat]);

    // Sauvegarder les catégories dans le Local Storage à chaque changement
    useEffect(() => {
      saveToLocalStorage('categories', categories);
    }, [categories]);

  
  // Fonction pour ajouter un livre à une catégorie spécifique
  const addBookToCategory = (categoryId, newBook) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>       // Parcourir toutes les catégories et mettre à jour celle qui correspond à categoryId
        category.id === categoryId        // Si la catégorie a le même id que celui passé, on met à jour
          ? { 
              ...category, // On fait une copie de la catégorie pour ne pas la modifier directement
              books: [...category.books, newBook], // On ajoute le nouveau livre à la liste des livres
              compteur: category.compteur +1
            }
          : category // Sinon, on renvoie la catégorie telle qu'elle est
      )
    );
  };

  const deleteBookFromCategory = (categoryId, bookId) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === categoryId
          ? { ...category, books: category.books.filter(book => book.id !== bookId) }
          : category
      )
    );
  };
  

  return (
    <div>
      <p>Mes catégories</p> 
      <div>
        <div className='div-container-align-right'>
          <InputText 
              type="text" 
              placeholder="Rechercher parmi tous les livres" 
              value={searchAllBooks} 
              onChange={(e) => setSearchAllBooks(e.target.value)} 
              style = {{marginRight: '0px'}}
          />
        </div>

        {searchAllBooks.length > 0 && filteredBooks.length > 0 && (
        <div className='div-container-align-center' style = {{width : '95%', marginLeft:'2.5%', border:'1px solid blue', borderRadius:'10px', padding:'10px', marginBottom:'10px', position:'absolute', backgroundColor:'white'}}>
          <h5>Ma recherche</h5>
          {/* Contenu de la div qui apparaît seulement si searchAllBooks.length > 0 */}
            {filteredBooks.map((book) => (
            <RowType 
              key={book.id} 
              book={book} 
          />
            ))
          }
        </div>
        )}
      </div>
      <div>
        {categories.map((category) => (
          <ClicableRow 
            key={category.id} 
            category={category} 
            books={category.books}
            isOpen={openRowId === category.id}
            onAddBook={(newBook) => addBookToCategory(category.id, newBook)} // Passe la fonction d'ajout
            onDeleteBook={deleteBookFromCategory}
            onToggle={() => handleToggleRow(category.id)}
          />
        ))}
      </div>
      

      <div className = 'div-container-align-right'>
        <ButtonClassic 
          label="Ajouter une catégorie" 
          onClick={() => setIsModalOpen(true)}
          
        />
      </div>
    
      
      <ModalClassic isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Ajouter une catégorie</h2>
        <InputText 
          type="text" 
          placeholder="Entrez le nom de la catégorie" 
          value={newCategoryText} 
          onChange={(e) => setNewCategoryText(e.target.value)} 
        />
        <ButtonClassic 
            label="Ajouter" 
            onClick={handleAddCategory}
          />
      </ModalClassic>
    </div>
  );
};

export default CategoryList;
