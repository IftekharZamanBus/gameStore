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
    margin: '0 15px',
    padding: '40px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: 600,
    width: '100%',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '20px',
  };

  const labelCol = {
    span: 24,
    style: {
      textAlign: 'center',
    },
  };

  const wrapperCol = {
    span: 24,
  };

  const onFinish = (values) => {
    console.log('Received values:', values);
    // Handle reset password logic here
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={headerStyle}>Reset Password</h2>
        <Form name="resetPasswordForm" onFinish={onFinish} labelCol={labelCol} wrapperCol={wrapperCol}>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: 'Please input your new password!' }]}
          >
            <Input.Password
              placeholder="New Password"
              style={{ textAlign: 'center', width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords do not match!');
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm Password"
              style={{ textAlign: 'center', width: '100%' }}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24, textAlign: 'center' }}>
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
