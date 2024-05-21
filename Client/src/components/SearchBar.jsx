// Import necessary modules and components from React
import { useState } from 'react';

// Define the functional component named SearchBar and receive handleSearch as a prop
const SearchBar = ({ handleSearch }) => {
  // State variable to manage the search term
  const [searchTerm, setSearchTerm] = useState('');

  // Event handler for input change in the search bar
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    // Call the handleSearch prop to pass the updated search term to the parent component
    handleSearch(event.target.value);
  };

  // JSX structure for the SearchBar component
  return (
    <input
      type="text"
      placeholder="Search..." // Placeholder text for the search bar
      value={searchTerm} // Controlled component with value set to the search term
      onChange={handleInputChange} // Event handler for input change
      style={{ marginBottom: '10px' }} // Inline style to add some margin at the bottom
    />
  );
};

// Export the SearchBar component as the default export of this module
export default SearchBar;
