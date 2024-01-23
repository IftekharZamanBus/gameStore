import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

function UserCards({ profiles }) {
  return (
    <div>
      {profiles.map((profile) => (
        <Card
          key={profile.id}
          style={{ width: 300, margin: '16px' }}
          actions={[
            <p>Email: {profile.full_name}</p>,
            <p>Username: {profile.email}</p>,
            <p>Phone: {profile.username}</p>,
            <p>Address: {profile.phone_number}</p>,
            <p>Address: {profile.address}</p>,
            <p>Address: {profile.is_active}</p>,
          ]}
        >
          <Meta title={profile.fullName} description={`Member since ${profile.createdAt}`} />
        </Card>
      ))}
    </div>
  );
}

export default UserCards;
