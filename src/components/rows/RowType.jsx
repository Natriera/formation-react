import React, { useState, useContext } from 'react'; // Ajout de useState
import '../../design/rows/rows.css'; // Chemin vers le fichier CSS de la modal
import ButtonDeleteRow from '../../components/buttons/ButtonDeleteRow'; // Lien vers le bouton
import ModalClassic from '../../components/modal/modalClassic'; // Lien vers la modal
import ModalMedium from '../../components/modal/modalMedium'; // Lien vers la modal
import ButtonClassic from '../../components/buttons/ButtonClassic'; // Lien vers le bouton
import InputText from '../../components/fields/text-field'; // Lien vers le champ de texte
import InputAreaText from '../../components/fields/text-area'; // Lien vers le champ de texte
import { RowSettingsContext } from '../../contexts/RowSettingsContext';



const RowType = ({ categoryId, book, deleteRowFunction, updateRowFunction }) => {

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookDesc, setNewBookDesc] = useState('');

  const [udpatedBook, setUpdatedBook] = useState();

  const handleUpdateBook = () => {
    
    const udpatedBook = { id: book.id, title: newBookTitle, resume: newBookDesc}
    updateRowFunction(udpatedBook)
    setIsUpdateModalOpen(false)

    
  };

  const handleUpdateBookCanceled = () => {
    setIsUpdateModalOpen(false);
    setNewBookTitle('');
    setNewBookDesc('');
  };


  const {
    rowHeaderColor
    } = useContext(RowSettingsContext);

  const handleClickOpenDelete = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen); // Bascule entre ouvrir et fermer la div
  };
  const handleClickOpenUpdateModale = () => {
    setIsUpdateModalOpen(!isUpdateModalOpen); // 
    setNewBookTitle(book.title);
    setNewBookDesc(book.resume);
  };



  return (
      <div className='div-book-row' style={{backgroundColor:`${rowHeaderColor}`}} >  
        <div style={{width : '100%', textAlign : 'left', paddingLeft : '10px', cursor:'pointer'}} onClick={handleClickOpenUpdateModale} >
          {book.title}
        </div>        
        <ButtonDeleteRow 
          label="🗑️" 
          onClick={handleClickOpenDelete}
        />

        <ModalClassic isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
          <h2>Confirmation</h2>
          <p>Vous êtes sur le point de supprimer le livre {book.title}.</p>
          <ButtonClassic 
            label="Confirmer" 
            onClick={() => {
              deleteRowFunction(categoryId, book.id); // Appel correct de la fonction lors du clic
              setIsDeleteModalOpen(false); // Ferme la modal après la suppression
            }} 
            />
        </ModalClassic>

        <ModalMedium isOpen={isUpdateModalOpen} onClose={handleUpdateBookCanceled}>
          <h2 style={{marginLeft:'10px', marginBottom:'20px', textAlign:'left'}} >Modifier le livre {book.title}</h2>
          <span style={{marginLeft:'10px', textAlign:'left'}}>Titre du livre *</span>
          <InputText 
            placeholder="Entrez le nom du livre" 
            value={newBookTitle} 
            onChange={(e) => setNewBookTitle(e.target.value)} 
          />
          <span style={{marginLeft:'10px', textAlign:'left'}} >Résumé du livre</span>
          <InputAreaText 
            value={newBookDesc} 
            type='textarea'
            onChange={(e) => setNewBookDesc(e.target.value)} 
          />
          <ButtonClassic 
            label="Modifier" 
            onClick={handleUpdateBook}
            disabled={newBookTitle.trim() === ''||newBookTitle.length <3}/>
        </ModalMedium>
         
    </div>
  );
};

export default RowType;
