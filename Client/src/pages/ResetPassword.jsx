// Import necessary modules and components from React and antd
import React from 'react';
import { Form, Input, Button } from 'antd';

// Define the functional component named ResetPassword
function ResetPassword() {
  // Styles for layout and elements
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

  // Col configurations for Form.Item
  const labelCol = {
    span: 24,
    style: {
      textAlign: 'center',
    },
  };

  const wrapperCol = {
    span: 24,
  };

  // Callback function when the form is submitted
  const onFinish = (values) => {
    console.log('Received values:', values);
    // Handle reset password logic here
  };

  // JSX structure for the ResetPassword component
  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        {/* Heading for the reset password section */}
        <h2 style={headerStyle}>Reset Password</h2>

        {/* Ant Design Form component */}
        <Form name="resetPasswordForm" onFinish={onFinish} labelCol={labelCol} wrapperCol={wrapperCol}>
          {/* Input for new password */}
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

          {/* Input for confirming new password */}
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

          {/* Button for submitting the form */}
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

// Export the ResetPassword component as the default export of this module
export default ResetPassword;
