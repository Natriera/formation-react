import React from 'react';
import '../../design/buttons/ButtonClassic.css'; // Chemin vers le fichier CSS du bouton

const ButtonClassic = ({ label, onClick, disabled, style }) => {
  return (
    <button 
      className="btn-classic" 
      onClick={onClick} 
      disabled={disabled}
      style={style}
    >
      {label}
    </button>
  );
};

export default ButtonClassic;
