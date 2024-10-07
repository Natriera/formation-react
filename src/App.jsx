import React from 'react';
import CategoryList from './bdd/bookCategoryList'; // Import du composant BookListType
import './design/app/App.css'; // Chemin vers le fichier CSS principal

// Import des composants boutons et modals
import ButtonClassic from './components/buttons/ButtonClassic';
import ModalClassic from './components/modal/modalClassic';

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{marginTop : '20px'}}>
        <h1>Ma bibliothèque</h1>
      </header>
      <CategoryList /> {/* Gérer la liste des types de livres */}
    </div>
  );
}

export default App;
