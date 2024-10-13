import React from 'react';
import '../../design/fields/color-input.css'; // Chemin vers le fichier CSS du champ de texte

const ColorInput = ({value, onChange, style }) => {
  return (
    <div className="color-input-container">
      <input 
        type="color" 
        className="color-input" 
        value={value} 
        style={style}
        onChange={onChange} 
      />
      
    </div>
  );
};

export default ColorInput;
