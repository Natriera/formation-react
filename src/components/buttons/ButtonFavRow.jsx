import React from 'react';
import '../../design/buttons/ButtonFavRow.css'; // Chemin vers le fichier CSS du bouton

const ButtonFavRow = ({ label, onClick, disabled, style }) => {
  return (
    <button 
      className="btn-fav-row"
      onClick={onClick} 
      disabled={disabled}
      style={style}
    >
      {label}
    </button>
  );
};

export default ButtonFavRow;
