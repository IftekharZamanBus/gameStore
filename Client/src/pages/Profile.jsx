import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCards from '../components/UserCards';

function Profile() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/users');
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div>
      <h1>Profiles</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <UserCards profiles={profiles} />
      </div>
    </div>
  );
}

export default Profile;
