import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Input, Button, Image, Tooltip, Select } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Option } = Select;

function GameCards() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editedGames, setEditedGames] = useState({});

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/games');
        setGames(response.data);
        setEditedGames(
          Object.fromEntries(
            response.data.map((game) => [game.id, { ...game, isEditing: false }])
          )
        );
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
          placeholder="    Search..."
          value={searchTerm}
          onChange={handleInputChange}
          prefix={<SearchOutlined style={{ color: 'rgba(0, 0, 0, 1)' }} />}
          style={{
            width: '900px',
            height: '50px',
            padding: '8px',
            border: '4px solid black',
            borderRadius: '10px',
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
            <Card
              key={game.id}
              style={{ border: '4px solid black', padding: '10px', margin: '10px', width: '300px' }}
              cover={
                <div style={{ display: 'flex', justifyContent: 'center', height:'200px' }}>
                  <Image
                    width={'100%'}
                    height={'100%'}
                    src={`${import.meta.env.VITE_API_BASE_URL}${game.picture}`}
                    style={{ objectFit: 'cover'}}
                  />
                </div>
              }
            >
              <Meta
                title={
                  editedGames[game.id].isEditing ? (
                    <Input
                      value={editedGames[game.id].name}
                      onChange={(e) => handleEditChange(game.id, 'name', e.target.value)}
                    />
                  ) : (
                    game.name
                  )
                }
                description={
                  editedGames[game.id].isEditing ? (
                    <Input.TextArea
                      value={editedGames[game.id].description}
                      onChange={(e) => handleEditChange(game.id, 'description', e.target.value)}
                    />
                  ) : (
                    game.description
                  )
                }
              />
              <p>
                Quantity:{' '}
                {editedGames[game.id].isEditing ? (
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
                Price:{' '}
                {editedGames[game.id].isEditing ? (
                  <Input
                    type="number"
                    value={editedGames[game.id].price}
                    onChange={(e) => handleEditChange(game.id, 'price', e.target.value)}
                  />
                ) : (
                  `$${game.price}`
                )}
              </p>
              <p>
                Availability:{' '}
                {editedGames[game.id].isEditing ? (
                  <Select
                    value={editedGames[game.id].isActive ? 'In Stock' : 'Out of Stock'}
                    onChange={(value) =>
                      handleEditChange(game.id, 'isActive', value === 'In Stock' ? true : false)
                    }
                  >
                    <Option value="In Stock">In Stock</Option>
                    <Option value="Out of Stock">Out of Stock</Option>
                  </Select>
                ) : (
                  String(game.isActive).toLowerCase() === 'true' ? 'In Stock' : 'Out of Stock'
                )}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                {editedGames[game.id].isEditing ? (
                  <Tooltip title="Save changes">
                    <Button
                      style={{ backgroundColor: 'blue', color: 'white' }}
                      onClick={() => saveChanges(game.id)}
                    >
                      Save
                    </Button>
                  </Tooltip>
                ) : (
                  <Tooltip title="Edit game">
                    <Button
                      style={{ backgroundColor: 'white', color: 'black' }}
                      onClick={() => toggleEditMode(game.id)}
                    >
                      {<EditOutlined />}
                    </Button>
                  </Tooltip>
                )}
                <Tooltip title="Delete game">
                  <Button
                    style={{ backgroundColor: '#3655b3', color: 'white' }}
                    onClick={() => deleteGame(game.id)}
                  >
                    {<DeleteOutlined />}
                  </Button>
                </Tooltip>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}

export default GameCards;
