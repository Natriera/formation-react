import React from 'react';
import '../../design/buttons/ButtonDeleteRow.css'; // Chemin vers le fichier CSS du bouton

const ButtonDeleteRow = ({ label, onClick, disabled, style }) => {
  return (
    <button 
      className="btn-delete" 
      onClick={onClick} 
      disabled={disabled}
      style={style}
    >
      {label}
    </button>
  );
};

export default ButtonDeleteRow;
