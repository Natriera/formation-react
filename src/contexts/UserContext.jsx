import React, { createContext, useState, useEffect, useContext } from 'react';

// Créer le contexte utilisateur
export const UserContext = createContext();

// Fournisseur de contexte utilisateur
export const UserProvider = ({ children }) => {
  // Fonction pour charger depuis le localStorage
  const loadFromLocalStorage = (key, defaultValue) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : defaultValue;
  };

  // Fonction pour sauvegarder dans le localStorage
  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  // Initialiser la liste des utilisateurs avec les utilisateurs par défaut ou ceux dans le localStorage
  const [users, setUsers] = useState(() => loadFromLocalStorage('users'||[]));

  // Initialiser l'utilisateur avec celui du localStorage ou le premier utilisateur de la liste
  const [currentUser, setCurrentUser] = useState(() => loadFromLocalStorage('currentUser', users[0]));

  // Sauvegarder les utilisateurs dans le localStorage à chaque changement de la liste
  useEffect(() => {
    saveToLocalStorage('users', users);
  }, [users]);

  // Sauvegarder l'utilisateur actuel dans le localStorage à chaque changement
  useEffect(() => {
    saveToLocalStorage('currentUser', currentUser);
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte utilisateur
export const useUser = () => useContext(UserContext);