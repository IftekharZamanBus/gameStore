import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image, Input, Button } from 'antd';

// sets the games using useState
function GameList() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editedGames, setEditedGames] = useState({});

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/games');
        setGames(response.data);
        setEditedGames(Object.fromEntries(response.data.map((game) => [game.id, { ...game, isEditing: false }])));
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEditChange = (id, field, value) => {
    setEditedGames({
      ...editedGames,
      [id]: {
        ...editedGames[id],
        [field]: value,
      },
    });
  };

  const toggleEditMode = (id) => {
    setEditedGames({
      ...editedGames,
      [id]: {
        ...editedGames[id],
        isEditing: !editedGames[id].isEditing,
      },
    });
  };

  const saveChanges = async (id) => {
    try {
      const updatedGame = editedGames[id];
      await axios.put(`http://localhost:5050/api/games/${id}`, updatedGame);

      setGames(games.map((game) => (game.id === id ? updatedGame : game)));
      toggleEditMode(id);
    } catch (error) {
      console.error('Error updating game:', error);
    }
  };

  const deleteGame = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/games/${id}`);
      setGames(games.filter((game) => game.id !== id));
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          style={{
            width: '900px',
            height: '50px',
            padding: '8px',
            border: '4px solid black',
            borderRadius: '4px',
            textAlign: 'center',
            color: 'rgba(0, 0, 0, 0.7)',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {games
          .filter((game) =>
            game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            game.quantity.toString().includes(searchTerm.toLowerCase()) ||
            game.price.toString().includes(searchTerm.toLowerCase()) ||
            String(game.isActive).toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((game) => (
            <div key={game.id} style={{ border: '4px solid black', padding: '10px', margin: '10px', width: '300px' }}>
              <p style={{ fontWeight: 'bold' }}>
                Name: {editedGames[game.id].isEditing ? (
                  <Input
                    value={editedGames[game.id].name}
                    onChange={(e) => handleEditChange(game.id, 'name', e.target.value)}
                  />
                ) : (
                  game.name
                )}
              </p>
              <p>
                Description: {editedGames[game.id].isEditing ? (
                  <Input.TextArea
                    value={editedGames[game.id].description}
                    onChange={(e) => handleEditChange(game.id, 'description', e.target.value)}
                  />
                ) : (
                  game.description
                )}
              </p>
              <p>
                Quantity: {editedGames[game.id].isEditing ? (
                  <Input
                    type="number"
                    value={editedGames[game.id].quantity}
                    onChange={(e) => handleEditChange(game.id, 'quantity', e.target.value)}
                  />
                ) : (
                  `${game.quantity} units`
                )}
              </p>
              <p>
                Price: {editedGames[game.id].isEditing ? (
                  <Input
                    type="number"
                    value={editedGames[game.id].price}
                    onChange={(e) => handleEditChange(game.id, 'price', e.target.value)}
                  />
                ) : (
                  `$${game.price}`
                )}
              </p>
              <p>Availability: {String(game.isActive).toLowerCase() === 'true' ? 'In Stock' : 'Out of Stock'}</p>
              <Image width={200} src={game.picture} />
              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-around' }}>
                {editedGames[game.id].isEditing ? (
                  <Button className="btn btn-primary" onClick={() => saveChanges(game.id)}>Save</Button>
                ) : (
                  <Button className="btn btn-primary" onClick={() => toggleEditMode(game.id)}>Edit</Button>
                )}
                <Button className="btn btn-danger" onClick={() => deleteGame(game.id)}>Delete</Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default GameList;