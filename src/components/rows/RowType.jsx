import React, { useState, useContext } from 'react'; // Ajout de useState
import '../../design/rows/rows.css'; // Chemin vers le fichier CSS de la modal
import ButtonDeleteRow from '../../components/buttons/ButtonDeleteRow'; // Lien vers le bouton
import ModalClassic from '../../components/modal/modalClassic'; // Lien vers la modal
import ButtonClassic from '../../components/buttons/ButtonClassic'; // Lien vers le bouton
import { RowSettingsContext } from '../../contexts/RowSettingsContext';



const RowType = ({ categoryId, book, deleteRowFunction }) => {

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    rowHeaderColor
    } = useContext(RowSettingsContext);

  const handleClickOpenDelete = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen); // Bascule entre ouvrir et fermer la div
  };


  return (
      <div className='div-book-row' style={{backgroundColor:`${rowHeaderColor}`}}>  
        <div style={{width : '100%', textAlign : 'left', paddingLeft : '10px'}}>
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
        
        
    </div>
  );
};

export default RowType;
