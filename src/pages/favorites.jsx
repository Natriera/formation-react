// pages/settings.js
import React, { useContext, useMemo} from 'react'; // Ajout de useState
import { UserContext } from '../contexts/UserContext';
import FavRow from '../components/rows/FavoritesRow'; // Lien vers RowType
import { BookListContext } from '../contexts/BookListContext';



const FavoritePage = () => {


    // Récupération des utilisateurs et de l'utilisateur courant depuis UserContext
    const {users, currentUserId } = useContext(UserContext);
    const {allBooks} = useContext(BookListContext);

    // Ici, on effectue le filtrage des livres dans les favoris      
    const userfavoriteBooks = allBooks.filter(book => users.find(user => user.id === currentUserId).favorites.includes(book.id));
  
    

  return (
    <div>
      <h2>Mes favoris</h2>
      <div className='div-container-align-center' style={{ width: '100%', borderRadius: '10px', marginBottom: '10px', backgroundColor: 'white' }}>
            <div
              className="book-list"
              style={{ maxHeight: '180px', overflowY: 'auto' }}
              >
              {userfavoriteBooks.map((book) => (
                <FavRow 
                  key={book.id}  
                  book={book}>
                </FavRow>
              ))}
            </div>
          </div>
    </div>
  );
};

export default FavoritePage;
