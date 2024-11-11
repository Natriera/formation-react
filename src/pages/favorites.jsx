// pages/settings.js
import React, { useContext , useState } from 'react'; // Ajout de useState
import { UserContext } from '../contexts/UserContext';
import FavRow from '../components/rows/FavoritesRow'; // Lien vers RowType
import { BookListContext } from '../contexts/BookListContext';
import InputText from '../components/fields/text-field'; // Lien vers la modal




const FavoritePage = () => {


    // Récupération des utilisateurs et de l'utilisateur courant depuis UserContext
    const {users, currentUserId } = useContext(UserContext);
    const {allBooks} = useContext(BookListContext);

    const [textFavSearch, setTextFavSearch] = useState('');

    // Ici, on effectue le filtrage des livres dans les favoris      
    const userfavoriteBooks = allBooks.filter(book => users.find(user => user.id === currentUserId).favorites.includes(book.id));

    const bookFavSearch = userfavoriteBooks.filter( book => book.title.toLowerCase().includes(textFavSearch.toLowerCase()))
  
    

  return (
    <div>
      <h2>Mes favoris</h2>
      <div>
      <InputText 
        placeholder="Rechercher un livre" 
        value={textFavSearch} 
        onChange={(e) => setTextFavSearch(e.target.value)} 
      />
      </div>
      
      <div className='div-container-align-center' style={{ width: '100%', borderRadius: '10px', marginBottom: '10px', backgroundColor: 'white' }}>
        <div
          className="book-list"
          style={{ height: 'fit-content', overflowY: 'auto', paddingLeft:'10px', paddingRight:'10px' }}
          >
          {bookFavSearch.map((book) => (
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
