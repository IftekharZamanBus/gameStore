// Import necessary modules and components from React and axios
import React, { useState, useEffect, useContext } from "react";
import UserCards from "../components/UserCards";
import { AuthContext } from "../context/auth";
import { getById } from "../api/services";
import { message } from "antd";
import UserProfile from "../components/UserProfile";

// Define the functional component named Profile
function Profile() {
  const context = useContext(AuthContext);
  // State hook to store the user profiles
  const [userProfile, setUserProfile] = useState(null);

  // useEffect hook to fetch user profiles when the component mounts
  useEffect(() => {
    let isMounted = true;
    const fetchProfiles = async () => {
      try {
        // Fetch user profiles from the specified API endpoint
        const response = await getById(`/api/users`, context?.user?.id);
        console.log("response", response);
        // Update the state with the fetched user profiles
        setUserProfile(response);
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching profile:", error);
          const errorMessage = `${error.response.status} - Unable to fetch profile due to: ${error.response.data.message}`;
          message.error(errorMessage);
        }
      }
    };

    // Call the fetchProfiles function when the component mounts
    fetchProfiles();

    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

  // JSX structure for the Profile component
  return userProfile === null ? (
    "Loading..."
  ) : (
    <>
      <UserProfile userProfile={userProfile} />
    </>
  );
}

// Export the Profile component as the default export of this module
export default Profile;
