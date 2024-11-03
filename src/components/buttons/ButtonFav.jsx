import React from 'react';
import '../../design/buttons/ButtonFav.css'; // Chemin vers le fichier CSS du bouton

const ButtonFav = ({ label, onClick, disabled, style, className }) => {
  return (
    <button 
      className={className} 
      onClick={onClick} 
      disabled={disabled}
      style={style}
    >
      {label}
    </button>
  );
};

export default ButtonFav;
