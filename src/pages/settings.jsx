// pages/settings.js
import React, { useContext, useState} from 'react'; // Ajout de useState
import ListeDeroulanteField from '../components/fields/list-deroulante';
import ColorInput from '../components/fields/color-input';
import { RowSettingsContext } from '../contexts/RowSettingsContext';
import { UserContext } from '../contexts/UserContext';
import NumberInput from '../components/fields/number-input';





const SettingsPage = () => {

  const {
    rowHeaderColor, setHeaderRowColor,
    rowBodyColor, setBodyRowColor,
    rowPaddingTop, setRowPaddingTop,
    rowMarginBottom, setRowMarginBottom,
    borderRadius, setBorderRadius
  } = useContext(RowSettingsContext);

    // Récupération des utilisateurs et de l'utilisateur courant depuis UserContext
    const { users, currentUser, setCurrentUser } = useContext(UserContext);

    const handleUserChange = (e) => {
      const selectedUser = users.find(user => user.id === parseInt(e.target.value));
      setCurrentUser(selectedUser);
    };

    


  return (
    <div>
      <h2>Paramètres</h2>

      <p>Connecté en tant que : {currentUser.name}</p>
      <ListeDeroulanteField options={users} value={currentUser.id} onChange={handleUserChange}>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </ListeDeroulanteField>

      <div style = {{display: 'flex', marginTop:'25px'}}>
        <div style = {{width:'20%', marginRight:'10px'}}>
          <label>Couleur des livres :</label>
          <ColorInput 
            value={rowHeaderColor} 
            onChange={(e) => setHeaderRowColor(e.target.value)} 
          ></ColorInput>
        </div>
        <div style = {{width:'20%', marginRight:'10px'}}>
          <label>Couleur du fond :</label>
          <ColorInput
              value={rowBodyColor} 
              onChange={(e) => setBodyRowColor(e.target.value)} 
          ></ColorInput>
        </div>

        <div style = {{width:'20%', marginRight:'10px'}}>
          <label>Padding top :</label>
          <NumberInput 
            value={rowPaddingTop} 
            onChange={(e) => setRowPaddingTop(Number(e.target.value))} 
          ></NumberInput>
        </div>

        <div style = {{width:'20%', marginRight:'10px'}}>
          <label>Margin bottom :</label>
          <NumberInput 
            value={rowMarginBottom} 
            onChange={(e) => setRowMarginBottom(Number(e.target.value))} 
          ></NumberInput>
        </div>

        <div style = {{width:'20%'}}>
          <label>Border radius :</label>
          <NumberInput 
            value={borderRadius} 
            onChange={(e) => setBorderRadius(Number(e.target.value))} 
          ></NumberInput>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;
