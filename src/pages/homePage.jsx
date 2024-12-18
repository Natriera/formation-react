import React, { useState, useContext, useMemo } from 'react';
import ButtonClassic from '../components/buttons/ButtonClassic'; // Lien vers le bouton
import ModalClassic from '../components/modal/modalClassic'; // Lien vers la modal
import InputText from '../components/fields/text-field'; // Lien vers la modal
import ClicableRow from '../components/rows/ClicableRow'; // Lien vers la modal
import RowType from '../components/rows/RowType'; // Lien vers RowType
import ButtonPagination from '../components/buttons/ButtonPagination'; // Lien vers le bouton
import { BookListContext } from '../contexts/BookListContext';


const HomePage = () => {


  const { categories, compteurCat, allBooks, setCategories, setCompteurCat } = useContext(BookListContext);

  const [visibleBooksSearchCount, setVisibleBooksSearchCount] = useState(4); // Affiche initialement 4 livres


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryText, setNewCategoryText] = useState('');
  const [searchAllBooks, setSearchAllBooks] = useState('');

    // État pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Nombre de catégories par page

  // Calcul des indices pour la pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  // Découpe des catégories à afficher sur la page actuelle
  const currentCategories = categories.slice(indexOfFirstRow, indexOfLastRow);
  


  const filteredBooks = useMemo(() => {
    // Ici, on effectue le filtrage des livres selon la recherche
    return allBooks.filter(book => book.title.toLowerCase().includes(searchAllBooks.toLowerCase()));
  }, [allBooks, searchAllBooks]); // Le filtre ne s'exécute que si `books` ou `searchTerm` change


  const visibleBooks = filteredBooks.slice(0, visibleBooksSearchCount);

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

  const updateBook = (categoryId, updatedBook) => {
    // Mise à jour de l'état 'categories'
    setCategories(prevCategories =>
      // On parcourt les catégories actuelles
      prevCategories.map(category =>
        // Si la catégorie correspond à l'ID passé en paramètre
        category.id === categoryId
          ? {
              ...category, // On garde les propriétés actuelles de la catégorie
              books: category.books.map(book =>
                // On met à jour uniquement le livre qui correspond à l'ID du livre mis à jour
                book.id === updatedBook.id ? updatedBook : book
              ),
            }
          : category // Si ce n'est pas la bonne catégorie, on ne fait rien, on la retourne telle quelle
      )
    );
  };
  

  return (
    <div className="category-list-container"  style={{ width: '100%' }}>
      <div className="div-container-align-right">
        <div style={{ width: '45%' , marginRight: "2.5%"}}>
          <InputText 
            type="text" 
            placeholder="Rechercher parmi tous les livres" 
            value={searchAllBooks} 
            onChange={(e) => setSearchAllBooks(e.target.value)} 
          />
        </div>  
      </div>

      {searchAllBooks.length > 0 && filteredBooks.length > 0 && (
        <div className='div-container-align-center' style={{ width: '95%', marginLeft: '2.5%', border: '1px solid blue', borderRadius: '10px', padding: '10px', marginBottom: '10px', backgroundColor: 'white' }}>
          <h5>Ma recherche</h5>
            <div
              className="book-list"
              style={{ maxHeight: '180px', overflowY: 'auto' }}
              onScroll={(e) => {
                const { scrollTop, scrollHeight, clientHeight } = e.target;
                if (scrollTop + clientHeight >= scrollHeight) {
                  setVisibleBooksSearchCount((prev) => Math.min(prev + 2, filteredBooks.length));
                }
              }}
              >
              {visibleBooks.map((book) => (
                <RowType key={book.id} book={book} />
              ))}
            </div>
          </div>
      )}

      <div>
        {currentCategories.map((category) => (
          <ClicableRow 
            key={category.id} 
            category={category} 
            books={category.books}
            isOpen={openRowId === category.id}
            onAddBook={(newBook) => addBookToCategory(category.id, newBook)}
            onDeleteBook={deleteBookFromCategory}
            onToggle={() => handleToggleRow(category.id)}
            onUpdateBook={(updatedBook)=> updateBook(category.id, updatedBook)}
          />
        ))}
      </div>


      <div style={{display:'flex', margin:'2.5%'}}>
        <div style={{flex:'1'}}>
          <ButtonClassic 
            label="Ajouter une catégorie" 
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        <div className='div-container-align-right' style={{flex:'1'}} >
          <div className="pagination " style ={{marginRight:'2.5%' , paddingTop:'20px'}}>
            <ButtonPagination 
              label="Précedente" 
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            />
            <div  >
              <span style={{ display: 'flex', alignItems: 'center', height: '100%' }} >Page {currentPage}</span>
            </div>
            
            <ButtonPagination 
              label="Suivante" 
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastRow >= categories.length}
            />
           
          </div>
        </div> 
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

export default HomePage;
