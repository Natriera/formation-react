import React from 'react';
import '../../design/fields/textArea.css'; // Chemin vers le fichier CSS du champ de texte

const TextAreaField = ({value, onChange, style }) => {
  return (
    <div className="text-area-container">
      <textarea 
        type="textarea" 
        className="text-area" 
        value={value} 
        style={style}
        onChange={onChange} 
        rows="5" 
        cols="50"
      />
      
    </div>
  );
};

export default TextAreaField;
