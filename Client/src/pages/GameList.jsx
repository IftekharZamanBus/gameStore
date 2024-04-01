// Import necessary modules and components from React and ant-design library
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from 'antd';
import GameCards from '../components/GameCards';

// Define the functional component named GameList
function GameList() {
  // State variables for managing games and search term
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch games from the API when the component mounts
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/games');
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  // Handler for input change in the search bar
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // JSX structure for the GameList component
  return (
    <div>

      {/* List of game cards section */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* GameCards component to display the list of games */}
        <GameCards games={games} searchTerm={searchTerm} />
      </div>
    </div>
  );
}

// Export the GameList component as the default export of this module
export default GameList;