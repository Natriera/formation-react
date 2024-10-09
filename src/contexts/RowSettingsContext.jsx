// src/contexts/RowSettingsContext.js
import React, { createContext, useState, useContext } from 'react';

export const RowSettingsContext = createContext();

export const RowSettingsProvider = ({ children }) => {
  const [rowHeaderColor, setHeaderRowColor] = useState('#ffdffb');
  const [rowBodyColor, setBodyRowColor] = useState('#f4f4f4');
  const [rowPaddingTop, setRowPaddingTop] = useState(15); // Hauteur par défaut en pixels
  const [rowMarginBottom, setRowMarginBottom] = useState(10); // Hauteur par défaut en pixels
  const [borderRadius, setBorderRadius] = useState(12); // Border radius par défaut


  return (
    <RowSettingsContext.Provider value={{
      rowHeaderColor, setHeaderRowColor,
      rowBodyColor,setBodyRowColor,
      rowPaddingTop,setRowPaddingTop,
      rowMarginBottom,setRowMarginBottom,
      borderRadius, setBorderRadius,
    }}>
      {children}
    </RowSettingsContext.Provider>
  );
};
