import React, { useState } from 'react';
import HomePage from './pages/homePage';
//import AboutPage from './pages/AboutPage';
//import SettingsPage from './pages/SettingsPage';
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
      
      </div>
    </div>
  );
};

export default App;
