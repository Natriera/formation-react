import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';

// Créer le contexte utilisateur
export const BookListContext = createContext();

// Fournisseur de contexte utilisateur
export const BookListProvider = ({ children }) => {

  // Fonction pour charger depuis le localStorage
  const loadFromLocalStorage = (key, defaultValue) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : defaultValue;
  };
  // Fonction pour sauvegarder dans le localStorage
  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const [categories, setCategories] = useState(() => loadFromLocalStorage('categories') || []);
  const [compteurCat, setCompteurCat] = useState(() => loadFromLocalStorage('compteurCat') || 0);

  const allBooks = useMemo(() => {
    return categories.flatMap(category =>
      category.books.map(book => ({
        ...book,
        categoryTitle: category.title // Ajoute le titre de la catégorie au livre
      }))
    );
  }, [categories]); // Recalculer la liste si les catégories changent

  // Sauvegarder le compteur des catégories dans le Local Storage à chaque changement
  useEffect(() => {
    saveToLocalStorage('compteurCat', compteurCat);
  }, [compteurCat]);

  // Sauvegarder les catégories dans le Local Storage à chaque changement
  useEffect(() => {
    saveToLocalStorage('categories', categories);
  }, [categories]);

  return (
    <BookListContext.Provider value={{ categories, compteurCat, allBooks, setCategories, setCompteurCat}}>
      {children}
    </BookListContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte utilisateur
export const useBookList = () => useContext(BookListContext);