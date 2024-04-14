// Import necessary modules and components from React and Ant Design
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Input, Button, Tooltip } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons';

// Destructure Meta component from Card
const { Meta } = Card;

// Define the functional component named UserCards
function UserCards() {
  // State variables using the useState hook
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editedUsers, setEditedUsers] = useState({});

  // useEffect hook to fetch users from the API on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/users');
        // Set initial state for users and editedUsers using the API response
        setUsers(response.data);
        setEditedUsers(
          Object.fromEntries(
            response.data.map((user) => [
              user.id,
              { ...user, isEditing: false },
            ])
          )
        );
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures that this effect runs only once on mount

  // Event handler for input change in the search bar
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Event handler for editing user details
  const handleEditChange = (id, field, value) => {
    setEditedUsers({
      ...editedUsers,
      [id]: {
        ...editedUsers[id],
        [field]: value,
      },
    });
  };

  // Toggle between edit and view mode for a specific user
  const toggleEditMode = (id) => {
    setEditedUsers({
      ...editedUsers,
      [id]: {
        ...editedUsers[id],
        isEditing: !editedUsers[id].isEditing,
      },
    });
  };

  // Save changes to a user after editing
  const saveChanges = async (id) => {
    try {
      const updatedUser = editedUsers[id];
      await axios.put(`http://localhost:5050/api/users/${id}`, updatedUser);

      // Update users state with the edited user
      setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
      toggleEditMode(id);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Delete a user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/users/${id}`);
      // Update users state by filtering out the deleted user
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // JSX structure for the UserCards component
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

      {/* Display user cards */}
      <div
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {users
          .filter(
            (user) =>
              user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.phone_number
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              user.address.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((user) => (
            // Individual user card
            <Card
              key={user.id}
              style={{
                border: '4px solid black',
                padding: '10px',
                margin: '10px',
                width: '300px',
              }}
            >
              <Meta
                title={
                  // Display either an input field for editing or the user's full name
                  editedUsers[user.id].isEditing ? (
                    <Input
                      value={editedUsers[user.id].full_name}
                      onChange={(e) =>
                        handleEditChange(user.id, 'full_name', e.target.value)
                      }
                    />
                  ) : (
                    user.full_name
                  )
                }
              />
              <p>
                Username:{' '}
                {/* Display either an input field for editing or the user's username */}
                {editedUsers[user.id].isEditing ? (
                  <Input
                    value={editedUsers[user.id].username}
                    onChange={(e) =>
                      handleEditChange(user.id, 'username', e.target.value)
                    }
                  />
                ) : (
                  user.username
                )}
              </p>

              <p>
                Email:{' '}
                {/* Display either an input field for editing or the user's email */}
                {editedUsers[user.id].isEditing ? (
                  <Input
                    value={editedUsers[user.id].email}
                    onChange={(e) =>
                      handleEditChange(user.id, 'email', e.target.value)
                    }
                  />
                ) : (
                  user.email
                )}
              </p>

              <p>
                Phone:{' '}
                {/* Display either an input field for editing or the user's phone number */}
                {editedUsers[user.id].isEditing ? (
                  <Input
                    value={editedUsers[user.id].phone_number}
                    onChange={(e) =>
                      handleEditChange(user.id, 'phone_number', e.target.value)
                    }
                  />
                ) : (
                  user.phone_number
                )}
              </p>
              <p>
                Address:{' '}
                {/* Display either an input field for editing or the user's address */}
                {editedUsers[user.id].isEditing ? (
                  <Input
                    value={editedUsers[user.id].address}
                    onChange={(e) =>
                      handleEditChange(user.id, 'address', e.target.value)
                    }
                  />
                ) : (
                  user.address
                )}
              </p>

              {/* Buttons for saving changes, editing, and deleting */}
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                {editedUsers[user.id].isEditing ? (
                  <Tooltip title="Save changes">
                    <Button
                      style={{ backgroundColor: 'blue', color: 'white' }}
                      onClick={() => saveChanges(user.id)}
                    >
                      Save
                    </Button>
                  </Tooltip>
                ) : (
                  <Tooltip title="Edit user">
                    <Button
                      style={{ backgroundColor: 'white', color: 'black' }}
                      onClick={() => toggleEditMode(user.id)}
                    >
                      {<EditOutlined />}
                    </Button>
                  </Tooltip>
                )}
                <Tooltip title="Delete user">
                  <Button
                    style={{ backgroundColor: '#3655b3', color: 'white' }}
                    onClick={() => deleteUser(user.id)}
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

// Export the UserCards component as the default export of this module
export default UserCards;
