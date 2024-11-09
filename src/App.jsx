import React, { useState } from 'react';
import HomePage from './pages/homePage';
import SettingsPage from './pages/settings';
import FavoritePage from './pages/favorites';
import { RowSettingsProvider } from './contexts/RowSettingsContext';
import { UserProvider } from './contexts/UserContext'; // Importer UserProvider





//import AboutPage from './pages/AboutPage';
import './design/app/App.css'; // Pour les styles généraux
import { BookListProvider } from './contexts/BookListContext';

const App = () => {

  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="app-container">
      {/* Barre latérale gauche */}
      <div className="sidebar">
        <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'active' : ''}>
          Accueil
        </button>
        <button onClick={() => setActiveTab('favorites')} className={activeTab === 'favorites' ? 'active' : ''}>
          Favoris
        </button>
        <button onClick={() => setActiveTab('settings')} className={activeTab === 'settings' ? 'active' : ''}>
          Paramètres
        </button>
      </div>

      {/* Contenu principal */}

      <BookListProvider>
        <UserProvider>
          <RowSettingsProvider>
            <div className="content">
              {activeTab === 'home' && <HomePage />}
              {activeTab === 'favorites' && <FavoritePage />}
              {activeTab === 'settings' && <SettingsPage />}
            </div>
          </RowSettingsProvider>
        </UserProvider>
      </BookListProvider>
    </div>
  );
};

export default App;
