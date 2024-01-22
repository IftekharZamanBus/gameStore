import React from 'react';
import { Form, Input, Button } from 'antd';

function ResetPassword() {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '75vh',
  };

  const formStyle = {
    margin: '0 20px',
    padding: '50px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '20px',
  };

  const onFinish = (values) => {
    console.log('Received values:', values);
    // Handle password reset logic here
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={headerStyle}>Reset Password</h2>
        <Form name="resetPasswordForm" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
            tooltip="Enter your email"
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: 'Please input your new password!' }]}
            tooltip="Enter your new password"
          >
            <Input.Password placeholder="New Password" />
          </Form.Item>

          <Form.Item
            label="Confirm New Password"
            name="confirmNewPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your new password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two new passwords do not match!');
                },
              }),
            ]}
            tooltip="Confirm New Password"
          >
            <Input.Password placeholder="Confirm New Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
