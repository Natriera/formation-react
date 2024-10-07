import React from 'react';
import '../../design/modal/modalClassic.css'; // Chemin vers le fichier CSS de la modal

const ModalClassic = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Si la modal n'est pas ouverte, ne rien afficher

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default ModalClassic;
