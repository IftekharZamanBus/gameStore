// Import necessary modules and components from React and axios
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCards from '../components/UserCards';

// Define the functional component named Profile
function Profile() {
  // State hook to store the user profiles
  const [profiles, setProfiles] = useState([]);

  // useEffect hook to fetch user profiles when the component mounts
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        // Fetch user profiles from the specified API endpoint
        const response = await axios.get('http://localhost:5050/api/users');
        // Update the state with the fetched user profiles
        setProfiles(response.data);
      } catch (error) {
        // Handle errors that occur while fetching user profiles
        console.error('Error fetching profiles:', error);
      }
    };

    // Call the fetchProfiles function when the component mounts
    fetchProfiles();
  }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

  // JSX structure for the Profile component
  return (
    <div>
      {/* Heading for the profiles section */}
      <h1>Profiles</h1>

      {/* Display user profiles using the UserCards component */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <UserCards profiles={profiles} />
      </div>
    </div>
  );
}

// Export the Profile component as the default export of this module
export default Profile;
