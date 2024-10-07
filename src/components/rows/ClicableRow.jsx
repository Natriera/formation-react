import React, { useState } from 'react'; // Ajout de useState
import '../../design/rows/clicableRow.css'; // Chemin vers le fichier CSS
import RowType from '../../components/rows/RowType'; // Lien vers RowType
import ButtonClassic from '../../components/buttons/ButtonClassic'; // Lien vers le bouton
import ModalClassic from '../../components/modal/modalClassic'; // Lien vers la modal
import InputText from '../../components/fields/text-field'; // Lien vers le champ de texte

const ClicableRow = ({ category, books, onAddBook, onDeleteBook, isOpen, onToggle }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBookText, setNewBookText] = useState('');
  const [bookSearch, setBookSearch] = useState('');


  const handleClick = () => {
    onToggle(); // Bascule entre ouvrir et fermer la div
  };

  const handleAddBook = () => {
    if (newBookText.trim() === '') return;

    const newBook = { id: category.compteur, title: newBookText }; // Nouveau livre (book)
    onAddBook(newBook); // Appelle la fonction d'ajout

    setNewBookText(''); // Réinitialiser le champ
    setIsModalOpen(false); // Fermer la modal
  };

  const handleClickAddBook = () => {
    setIsModalOpen(!isModalOpen); // Bascule entre ouvrir et fermer la modal
  };


  return (
    <div>
      {/* Ligne cliquable pour la catégorie */}
      <div className={`clicable-row ${isOpen ? 'open' : 'closed'}`} >
        <div style={{paddingBottom : '10px', cursor: 'pointer'}}   onClick={handleClick} >
        {category.title}
        </div>

        {isOpen && (
        <>
          <div className='div-open-category'>
            <div className="div-container-bloc" >
              <ButtonClassic 
                  style={{ width: '48%' }} // Style en ligne
                  label="Ajouter un livre" 
                  value={newBookText}
                  onClick={handleClickAddBook}
                />
                <InputText 
                  type="text" 
                  style={{width: '48%'}}
                  placeholder="Rechercher un livre" 
                  value={bookSearch} 
                  onChange={(e) => setBookSearch(e.target.value)} 
              />
            </div>
              <div>
                {books
                  .filter((book) => 
                  book.title.toLowerCase().includes(bookSearch.toLowerCase()) // Filtre en fonction de la recherche
                  )
                  .map((book) => (
                  <RowType 
                    categoryId={category.id}
                    key={book.id} 
                    book={book} 
                    deleteRowFunction={onDeleteBook}
                  /> 
                ))}
              </div> 
          </div>
        </>
      )}

      </div>
      {/* Afficher la div avec les livres si isOpen est vrai */}
      <ModalClassic isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Ajouter un livre</h2>
        <InputText 
          type="text" 
          placeholder="Entrez le nom du livre" 
          value={newBookText} 
          onChange={(e) => setNewBookText(e.target.value)} 
        />
        <ButtonClassic 
          label="Ajouter" 
          onClick={handleAddBook}
        />
      </ModalClassic>
    </div>
  );
};

export default ClicableRow;