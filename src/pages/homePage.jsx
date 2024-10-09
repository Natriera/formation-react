import React from 'react';
import CategoryList from '../bdd/bookCategoryList'; // Import du composant BookListType


const HomePage = () => {
  return (
    <div >
      <h2>Ma bibliothèque</h2>
      <CategoryList /> {/* Gérer la liste des types de livres */}
    </div>
  );
};

export default HomePage;
