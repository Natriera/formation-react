import React from 'react';
import '../../design/buttons/ButtonPagination.css'; // Chemin vers le fichier CSS du bouton

const ButtonPagination = ({ label, onClick, disabled, style }) => {
  return (
    <button 
      className="btn-pagination" 
      onClick={onClick} 
      disabled={disabled}
      style={style}
    >
      {label}
    </button>
  );
};

export default ButtonPagination;
