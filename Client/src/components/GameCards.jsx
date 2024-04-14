// Import necessary modules and components from React, Axios, and Ant Design
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Input, Button, Image, Tooltip, Select } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { IN_STOCK } from '../constants/common';
import { get, put } from '../api/services';

// Destructure components from Ant Design
const { Meta } = Card;
const { Option } = Select;

// Define the functional component named GameCards
function GameCards({ loggedInUser }) {
  // State variables using the useState hook
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editedGames, setEditedGames] = useState({});

  // useEffect hook to fetch games from the API on component mount
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await get('/api/games');
        // Set initial state for games and editedGames using the API response
        setGames(response);
        setEditedGames(
          Object.fromEntries(
            response.map((game) => [game.id, { ...game, isEditing: false }])
          )
        );
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []); // Empty dependency array ensures that this effect runs only once on mount

  // Event handler for input change in the search bar
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Event handler for editing game details
  const handleEditChange = (id, field, value) => {
    setEditedGames({
      ...editedGames,
      [id]: {
        ...editedGames[id],
        [field]: value,
      },
    });
  };

  // Toggle between edit and view mode for a specific game
  const toggleEditMode = (id) => {
    setEditedGames({
      ...editedGames,
      [id]: {
        ...editedGames[id],
        isEditing: !editedGames[id].isEditing,
      },
    });
  };

  // Save changes to a game after editing
  const saveChanges = async (id) => {
    try {
      const updatedGame = editedGames[id];
      await put(`/api/games/${id}`, updatedGame);

      // Update games state with the edited game
      setGames(games.map((game) => (game.id === id ? updatedGame : game)));
      toggleEditMode(id);
    } catch (error) {
      console.error('Error updating game:', error);
    }
  };

  // Delete a game
  const deleteGame = async (id) => {
    try {
      await delete `/api/games/${id}`;
      // Update games state by filtering out the deleted game
      setGames(games.filter((game) => game.id !== id));
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };

  // Render the component
  return (
    <div>
      {/* Search bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
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

      {/* Display game cards */}
      <div
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {games
          .filter(
            (game) =>
              game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              game.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              game.quantity.toString().includes(searchTerm.toLowerCase()) ||
              game.price.toString().includes(searchTerm.toLowerCase()) ||
              String(game.is_active)
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
          )
          .map((game) => (
            // Individual game card
            <Card
              key={game.id}
              style={{
                border: '4px solid black',
                padding: '10px',
                margin: '10px',
                width: '300px',
              }}
              cover={
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: '200px',
                  }}
                >
                  {/* Game image */}
                  <Image
                    width={'100%'}
                    height={'100%'}
                    src={`${import.meta.env.VITE_API_BASE_URL}${game.picture}`}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              }
            >
              <Meta
                title={
                  // Display either an input field for editing or the game name
                  editedGames[game.id].isEditing ? (
                    <Input
                      value={editedGames[game.id].name}
                      onChange={(e) =>
                        handleEditChange(game.id, 'name', e.target.value)
                      }
                    />
                  ) : (
                    game.name
                  )
                }
                description={
                  // Display either a text area for editing or the game description
                  editedGames[game.id].isEditing ? (
                    <Input.TextArea
                      value={editedGames[game.id].description}
                      onChange={(e) =>
                        handleEditChange(game.id, 'description', e.target.value)
                      }
                    />
                  ) : (
                    game.description
                  )
                }
              />
              <p>
                Quantity:{' '}
                {/* Display either an input field for editing or the game quantity */}
                {editedGames[game.id].isEditing ? (
                  <Input
                    type="number"
                    value={editedGames[game.id].quantity}
                    onChange={(e) =>
                      handleEditChange(game.id, 'quantity', e.target.value)
                    }
                  />
                ) : (
                  `${game.quantity} units`
                )}
              </p>
              <p>
                Price:{' '}
                {/* Display either an input field for editing or the game price */}
                {editedGames[game.id].isEditing ? (
                  <Input
                    type="number"
                    value={editedGames[game.id].price}
                    onChange={(e) =>
                      handleEditChange(game.id, 'price', e.target.value)
                    }
                  />
                ) : (
                  `$${game.price}`
                )}
              </p>
              <p>
                Availability:{' '}
                {/* Display either a select dropdown for editing or the game availability */}
                {editedGames[game.id].isEditing ? (
                  <Select
                    value={
                      editedGames[game.id].is_active === IN_STOCK.YES
                        ? 'In Stock'
                        : 'Out of Stock'
                    }
                    onChange={(value) =>
                      handleEditChange(
                        game.id,
                        'is_active',
                        value === IN_STOCK.YES ? true : false
                      )
                    }
                  >
                    <Option value={IN_STOCK.YES}>In Stock</Option>
                    <Option value={IN_STOCK.NO}>Out of Stock</Option>
                  </Select>
                ) : String(game.is_active) === IN_STOCK.YES ? (
                  'In Stock'
                ) : (
                  'Out of Stock'
                )}
              </p>
              {/* Buttons for saving changes, editing, and deleting */}
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                {/* Edit button */}
                {loggedInUser?.token &&
                  loggedInUser?.role === 'admin' &&
                  !editedGames[game.id].isEditing && (
                    <Tooltip title="Edit game">
                      <Button
                        style={{ backgroundColor: 'white', color: 'black' }}
                        onClick={() => toggleEditMode(game.id)}
                      >
                        <EditOutlined />
                      </Button>
                    </Tooltip>
                  )}
                {/* Save button */}
                {editedGames[game.id].isEditing && (
                  <Tooltip title="Save changes">
                    <Button
                      style={{ backgroundColor: 'blue', color: 'white' }}
                      onClick={() => saveChanges(game.id)}
                    >
                      Save
                    </Button>
                  </Tooltip>
                )}
                {/* Delete button */}
                {loggedInUser?.token && loggedInUser?.role === 'admin' && (
                  <Tooltip title="Delete game">
                    <Button
                      style={{ backgroundColor: '#3655b3', color: 'white' }}
                      onClick={() => deleteGame(game.id)}
                    >
                      <DeleteOutlined />
                    </Button>
                  </Tooltip>
                )}
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}

// Export the GameCards component as the default export of this module
export default GameCards;
