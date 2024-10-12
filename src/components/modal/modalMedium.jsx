import React from 'react';
import '../../design/modal/modalMedium.css'; // Chemin vers le fichier CSS de la modal

const ModalMedium = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Si la modal n'est pas ouverte, ne rien afficher

  return (
    <div className="modal-medium-overlay">
      <div className="modal-medium-content">
        <button className="modal-close" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default ModalMedium;
