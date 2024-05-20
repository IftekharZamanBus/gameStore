// Import necessary modules and components from React and ant-design library
import React, { useState } from "react";
import GameCards from "../components/GameCards";
import { useGetGamesQuery } from "../slices/gameSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

// Define the functional component named GameList
function GameList() {
  const { data: games, isLoading, error } = useGetGamesQuery();
  // State variables for managing games and search term
  //const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch games from the API when the component mounts

  // Handler for input change in the search bar
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // JSX structure for the GameList component
  return (
    <>
      {isLoading ? (
        <Loader loading={isLoading} />
      ) : error ? (
        <Message
          type="error"
          message="Games Error"
          description={error.error || error?.data?.message}
        />
      ) : (
        <>
          {/* List of game cards section */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {/* GameCards component to display the list of games */}
            <GameCards games={games} searchTerm={searchTerm} />
          </div>
        </>
      )}
    </>
  );
}

// Export the GameList component as the default export of this module
export default GameList;
