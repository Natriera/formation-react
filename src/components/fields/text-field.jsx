import React from 'react';
import '../../design/fields/textField.css'; // Chemin vers le fichier CSS du champ de texte

const TextField = ({ placeholder, value, onChange, style }) => {
  return (
    <div className="text-field-container">
      <input 
        type="text" 
        className="text-field" 
        placeholder={placeholder} 
        value={value} 
        style={style}
        onChange={onChange} 
      />
      {/* Affiche la croix uniquement si le champ de texte n'est pas vide */}
      {value && (
        <span 
          className="clear-icon" 
          onClick={() => onChange({ target: { value: '' } })}
        >
          ✕
        </span>
      )}
    </div>
  );
};

export default TextField;
