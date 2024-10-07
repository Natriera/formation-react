import React, { useState } from 'react';

const BookList = () => {
  // Créons l'état pour stocker la liste des livres
  const [books, setBooks] = useState([
    { id: 1, title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry' },
    { id: 2, title: '1984', author: 'George Orwell' },
    { id: 3, title: 'Les Misérables', author: 'Victor Hugo' },
  ]);

  return (
    <div>
      <h1>Liste des Livres</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> par {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
