import React, { useState } from 'react';
import HomePage from './pages/homePage';
import SettingsPage from './pages/settings'
//import AboutPage from './pages/AboutPage';
import './design/app/App.css'; // Pour les styles généraux

const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="app-container">
      {/* Barre latérale gauche */}
      <div className="sidebar">
        <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'active' : ''}>
          Accueil
        </button>
        <button onClick={() => setActiveTab('about')} className={activeTab === 'about' ? 'active' : ''}>
          À propos
        </button>
        <button onClick={() => setActiveTab('settings')} className={activeTab === 'settings' ? 'active' : ''}>
          Paramètres
        </button>
      </div>

      {/* Contenu principal */}
      <div className="content">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'settings' && <SettingsPage />}
      </div>
    </div>
  );
};

export default App;
