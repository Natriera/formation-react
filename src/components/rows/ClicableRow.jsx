import React, { useState , useContext, useEffect} from 'react'; // Ajout de useState
import '../../design/rows/clicableRow.css'; // Chemin vers le fichier CSS
import RowType from '../../components/rows/RowType'; // Lien vers RowType
import ButtonClassic from '../../components/buttons/ButtonClassic'; // Lien vers le bouton
import ModalClassic from '../../components/modal/modalClassic'; // Lien vers la modal
import InputText from '../../components/fields/text-field'; // Lien vers le champ de texte
import InputAreaText from '../../components/fields/text-area'; // Lien vers le champ de texte
import { RowSettingsContext } from '../../contexts/RowSettingsContext';


const ClicableRow = ({ category, books, onAddBook, onDeleteBook, isOpen, onToggle, onUpdateBook }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBookText, setNewBookText] = useState('');
  const [newBookDesc, setNewBookDesc] = useState('');


  const [bookSearch, setBookSearch] = useState('');

  const [visibleBooksCount, setVisibleBooksCount] = useState(4); // Affiche initialement 4 livres

  useEffect(() => {
    setVisibleBooksCount(4); // Remet à 4 à chaque fois que la recherche change
  }, [bookSearch]);
  
  const handleCloseModal = () => {
    setIsModalOpen(false); // Ferme la modal
    setNewBookText('');    // Reset du titre
    setNewBookDesc('');    // Reset du résumé
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(bookSearch.toLowerCase())
  );
  
  const visibleBooks = filteredBooks.slice(0, visibleBooksCount);

  const {
    rowHeaderColor, rowBodyColor,rowPaddingTop, rowMarginBottom, borderRadius
    } = useContext(RowSettingsContext);

  const handleClick = () => {
    onToggle(); // Bascule entre ouvrir et fermer la div
  };

  const handleAddBook = () => {
    if (newBookText.trim() === '') return;

    const newBook = { id: `${category.id}_${category.compteur}`, title: newBookText, resume: newBookDesc }; // Nouveau livre (book)
    onAddBook(newBook); // Appelle la fonction d'ajout

    setNewBookText(''); // Réinitialiser le champ
    setNewBookDesc('');
    setIsModalOpen(false); // Fermer la modal
  };

  const handleClickAddBook = () => {
    setIsModalOpen(!isModalOpen); // Bascule entre ouvrir et fermer la modal
  };


  return (
    <div>
      {/* Ligne cliquable pour la catégorie */}
      <div 
        className={`clicable-row ${isOpen ? 'open' : 'closed'}`} 
        style={{
          paddingTop: `${rowPaddingTop}px`, 
          borderRadius: `${borderRadius}px`, 
          backgroundColor: isOpen ? rowHeaderColor : 'inherit',
          marginBottom:`${rowMarginBottom}px`
        }} 
      >
        <div style={{paddingBottom : '10px', cursor: 'pointer'}}   onClick={handleClick} >
        {category.title}
        </div>

        {isOpen && (
        <>
          <div className='div-open-category' style={{backgroundColor:`${rowBodyColor}`, borderBottomLeftRadius:`${borderRadius}px`,borderBottomRightRadius: `${borderRadius}px`}}>
            <div className="div-container-bloc" >
              <ButtonClassic 
                  label="Ajouter un livre" 
                  value={newBookText}
                  onClick={handleClickAddBook}
                  style={{width : '90%'}}
                />
                <InputText 
                  type="text" 
                  placeholder="Rechercher un livre" 
                  value={bookSearch} 
                  onChange={(e) => setBookSearch(e.target.value)} 
              />
            </div>
            <div
              className="book-list"
              style={{ maxHeight: '180px', overflowY: 'auto' }}
              onScroll={(e) => {
                const { scrollTop, scrollHeight, clientHeight } = e.target;
                if (scrollTop + clientHeight >= scrollHeight) {
                  setVisibleBooksCount((prev) => Math.min(prev + 2, filteredBooks.length));
                }
              }}
            >
              {visibleBooks.map((book) => (
                <RowType
                  key={book.id}
                  book={book}
                  categoryId={category.id}
                  deleteRowFunction={onDeleteBook}
                  updateRowFunction={onUpdateBook}
                />
              ))}
            </div>

              
          </div>
        </>
      )}

      </div>
      {/* Afficher la div avec les livres si isOpen est vrai */}
      <ModalClassic isOpen={isModalOpen} onClose={() => handleCloseModal()}>
        <h2 style={{marginLeft:'10px', marginBottom:'20px'}} >Ajouter un livre</h2>
        <span style={{marginLeft:'10px'}}>Titre du livre *</span>
        <InputText 
          placeholder="Entrez le nom du livre" 
          value={newBookText} 
          onChange={(e) => setNewBookText(e.target.value)} 
        />
        <span style={{marginLeft:'10px'}} >Résumé du livre</span>
        <InputAreaText 
          value={newBookDesc} 
          type='textarea'
          onChange={(e) => setNewBookDesc(e.target.value)} 
        />
        <ButtonClassic 
          label="Ajouter" 
          onClick={handleAddBook}
          disabled={newBookText.trim() === ''||newBookText.length <3}        />
      </ModalClassic>
    </div>
  );
};

export default ClicableRow;
