import React from 'react';

function UserProfile({ user }) {
  return (
    <div>
      <h2>User Profile</h2>
      {user && (
        <div>
            <p>Full Name: {user.full_name}</p>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>
            <p>Username: {user.username}</p>
            <p>Phone Number: {user.phone_number}</p>
            <p>Address: {user.address}</p>
            <p>Is Active?: {user.is_active}</p>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
