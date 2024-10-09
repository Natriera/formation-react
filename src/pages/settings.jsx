// pages/settings.js
import React, { useState , useContext} from 'react'; // Ajout de useState
import { RowSettingsContext } from '../contexts/RowSettingsContext';

const SettingsPage = () => {

  const {
    rowHeaderColor, setHeaderRowColor,
    rowBodyColor, setBodyRowColor,
    rowPaddingTop, setRowPaddingTop,
    rowMarginBottom, setRowMarginBottom,
    borderRadius, setBorderRadius
  } = useContext(RowSettingsContext);

  return (
    <div>
      <h2>Paramètres du design</h2>
      <p>Contenu des paramètres ici.</p>
      <div style = {{display: 'flex'}}>
        <div>
          <label>Couleur des livres :</label>
          <input 
            type="color" 
            value={rowHeaderColor} 
            onChange={(e) => setHeaderRowColor(e.target.value)} 
          />
        </div>

        <div>
          <label>Couleur du fond :</label>
          <input 
            type="color" 
            value={rowBodyColor} 
            onChange={(e) => setBodyRowColor(e.target.value)} 
          />
        </div>

        <div>
          <label>Padding top :</label>
          <input 
            type="number" 
            value={rowPaddingTop} 
            onChange={(e) => setRowPaddingTop(Number(e.target.value))} 
          />
        </div>

        <div>
          <label>Margin bottom :</label>
          <input 
            type="number" 
            value={rowMarginBottom} 
            onChange={(e) => setRowMarginBottom(Number(e.target.value))} 
          />
        </div>

        <div>
          <label>Border radius :</label>
          <input 
            type="number" 
            value={borderRadius} 
            onChange={(e) => setBorderRadius(Number(e.target.value))} 
          />
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;
