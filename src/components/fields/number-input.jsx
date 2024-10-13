import React from 'react';
import '../../design/fields/number-input.css'; // Chemin vers le fichier CSS du champ de texte

const NumberInput = ({value, onChange, style }) => {
  return (
    <div className="number-input-container">
      <input 
        type="number" 
        className="number-input" 
        value={value} 
        style={style}
        onChange={onChange} 
      />
      
    </div>
  );
};

export default NumberInput;
