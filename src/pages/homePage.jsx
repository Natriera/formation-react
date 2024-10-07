import React from 'react';
import CategoryList from '../bdd/bookCategoryList'; // Import du composant BookListType


const HomePage = () => {
  return (
    <div className="App">
      <header className="App-header" style={{marginTop : '20px'}}>
        <h1>Ma bibliothèque</h1>
      </header>
      <CategoryList /> {/* Gérer la liste des types de livres */}
    </div>
  );
};

export default HomePage;
