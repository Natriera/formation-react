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

  /*const [users, setUsers] = useState(
    [{
      id:1,
      name:'user1',
      favorites:[]
    },
    {
      id:2,
      name:'user2',
      favorites:[]
    }]

  )*/

  //const [currentUserId, setCurrentUserId] = useState("1");


  // Initialiser la liste des utilisateurs avec les utilisateurs par défaut ou ceux dans le localStorage
  const [users, setUsers] = useState(() => loadFromLocalStorage('users'||[]));

  // Initialiser l'utilisateur avec celui du localStorage ou le premier utilisateur de la liste
  const [currentUserId, setCurrentUserId] = useState(() => loadFromLocalStorage('currentUserId', 1));

  // Sauvegarder les utilisateurs dans le localStorage à chaque changement de la liste
  useEffect(() => {
    saveToLocalStorage('users', users);
  }, [users]);

  // Sauvegarder l'utilisateur actuel dans le localStorage à chaque changement
  useEffect(() => {
    saveToLocalStorage('currentUserId', currentUserId);
  }, [currentUserId]);

  return (
    <UserContext.Provider value={{ currentUserId, setCurrentUserId, users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte utilisateur
export const useUser = () => useContext(UserContext);