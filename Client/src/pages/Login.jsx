// Import necessary modules and components from React and ant-design library
import React from 'react';
import { Form, Input, Button } from 'antd';

// Define the functional component named Login
function Login() {
  // Style definitions for layout and appearance
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '65vh',
  };

  const formStyle = {
    margin: '0 20px',
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: 400,
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

  const buttonCol = {
    span: 24,
    textAlign: 'center', // Center the button
  };

  // Handler for form submission
  const onFinish = (values) => {
    console.log('Received values:', values);
    // Handle login logic here
  };

  // JSX structure for the Login component
  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        {/* Form component for user login */}
        <h2 style={headerStyle}>Login</h2>
        <Form name="loginForm" onFinish={onFinish} labelCol={labelCol} wrapperCol={wrapperCol}>
          {/* Input field for email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Email" style={{ textAlign: 'left' }} />
          </Form.Item>

          {/* Input field for password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" style={{ textAlign: 'center' }} />
          </Form.Item>

          {/* Link for password reset */}
          <Form.Item>
            Forgot your password? Click <a href="/resetpassword">Here</a>.
          </Form.Item>

          {/* Submit button */}
          <Form.Item wrapperCol={buttonCol}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

// Export the Login component as the default export of this module
export default Login;
