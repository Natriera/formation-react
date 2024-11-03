// pages/settings.js
import React, { useContext, useState} from 'react'; // Ajout de useState
import { UserContext } from '../contexts/UserContext';
import RowType from '../components/rows/RowType'; // Lien vers RowType



const FavoritePage = () => {


    // Récupération des utilisateurs et de l'utilisateur courant depuis UserContext
    const { users, currentUserId } = useContext(UserContext);
    

  return (
    <div>
      <h2>Mes favoris</h2>

      <div className='div-container-align-center' style={{ width: '100%', borderRadius: '10px', marginBottom: '10px', backgroundColor: 'white' }}>
            <div
              className="book-list"
              style={{ maxHeight: '180px', overflowY: 'auto' }}
              >
              {users.find(user => user.id === currentUserId)?.favorites.map((book) => (
                <li>
                  {book} 
                </li>
              ))}
            </div>
          </div>
    </div>
  );
};

export default FavoritePage;
