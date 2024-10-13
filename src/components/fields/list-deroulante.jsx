import React from 'react';
import '../../design/fields/list-deroulante.css'; // Chemin vers le fichier CSS du champ de texte

const ListeDeroulanteField = ({ options, value, onChange, style }) => {
  return (
    <div className="list-deroulante-container">
      <select 
        className="list-deroulante" 
        value={value} 
        style={style}
        onChange={onChange}
      >
        {/* Affichage dynamique des options */}
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ListeDeroulanteField;