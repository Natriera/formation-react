import React, { useContext } from 'react'; // Ajout de useState
import '../../design/rows/favRow.css'; // Chemin vers le fichier CSS de la modal
import { RowSettingsContext } from '../../contexts/RowSettingsContext';
import { UserContext } from '../../contexts/UserContext';
import ButtonFavRow from '../../components/buttons/ButtonFavRow'; // Lien vers le bouton


const FavRow = ({ book }) => {


  const {
    rowHeaderColor
    } = useContext(RowSettingsContext);

  const {
    users , currentUserId , setUsers
    } = useContext(UserContext);


  const handleFavClick = () => {
    const isFav = users.find(user => user.id === currentUserId)?.favorites.some(favId => favId === book.id);
    setUsers(prevUsers =>
      prevUsers.map(user => {
        if (user.id === currentUserId) {
          return {
            ...user,
            favorites: isFav 
              ? user.favorites.filter(favId => favId !== book.id) // Retire le livre des favoris
              : [...user.favorites, book.id] // Ajoute le livre aux favoris
          };
        }
        return user;
      })
    );
  };


  return (
      <div className='div-book-row' style={{backgroundColor:`${rowHeaderColor}`}} >  
        <div style={{width : '100%', textAlign : 'left', paddingLeft : '10px'}} >
          {book.title}
        </div>        
        <ButtonFavRow 
          label="⭐️" 
          onClick={handleFavClick}
        />
     
    </div>
  );
};

export default FavRow;
