// pages/settings.js
import React, { useContext , useState } from 'react'; // Ajout de useState
import { UserContext } from '../contexts/UserContext';
import FavRow from '../components/rows/FavoritesRow'; // Lien vers RowType
import { BookListContext } from '../contexts/BookListContext';
import InputText from '../components/fields/text-field'; // Lien vers la modal
import ButtonClassic from '../components/buttons/ButtonClassic'; // Lien vers le bouton




const FavoritePage = ( {navigateToHomePage}) => {


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
      
      {bookFavSearch.length > 0 ? (
        <div className='div-container-align-center' style={{ width: '100%', borderRadius: '10px', marginBottom: '10px', backgroundColor: 'white' }}>
          <div
            className="book-list"
            style={{ maxHeight: '500px', overflowY: 'auto', paddingLeft:'10px', paddingRight:'10px' }}
            >
            {bookFavSearch.map((book) => (
              <FavRow 
                key={book.id}  
                book={book}>
              </FavRow>
            ))}
          </div>
        </div> ) : 
        (
          <>
          <div className = "div-container-bloc" style={{marginTop:'30px', padding:'5px', border:'1px #b2dffb solid', borderRadius:'10px'}}>
            <div style = {{width:'50%'}} >
              <h5 style={{padding: '10px', textAlign:'center'}}>Aucun livre en favoris</h5>
            </div>
            <div className = "div-container-align-right" style = {{width:'50%', marginBottom:'0px'}}>
              <ButtonClassic
                label='Accéder à la liste des livres' 
                onClick={navigateToHomePage}
              />
            </div>
          </div>
          
          </>
          
        )
      }

    </div>
  );
};

export default FavoritePage;
