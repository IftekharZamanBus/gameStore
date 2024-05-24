import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Tag } from 'antd';

function UserProfile({ userProfile }) {
  return (
    <>
      <h2>User Profile</h2>
      <div>
        <p>Full Name: {userProfile?.full_name}</p>
        <p>Email: {userProfile?.email}</p>
        <p>Username: {userProfile?.username}</p>
        <p>Phone Number: {userProfile?.phone_number}</p>
        <p>Address: {userProfile?.address}</p>
        <p>
          Is Active:{' '}
          {userProfile?.is_active === 'Y' ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              Active
            </Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color="error">
              Inactive
            </Tag>
          )}
        </p>
      </div>
    </>
  );
}

export default UserProfile;
