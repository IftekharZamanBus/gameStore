// Import necessary modules and components from React, antd, react-router-dom, and axios
import React from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { post } from '../api/services';

// Define the functional component named Signup
function Signup() {
  // Styles for layout and elements
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '95vh',
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
      textAlign: 'left',
    },
  };

  const wrapperCol = {
    span: 24,
  };

  // React Router hook for navigation
  const navigate = useNavigate();

  // Callback function when the form is submitted
  const onFinish = async (values) => {
    try {
      // Send a POST request to the server for user registration
      const response = await post('/api/users/register', {
        full_name: values.fullName, // Make sure to include the full_name field
        email: values.email,
        password: values.password,
        username: values.username,
        phone_number: values['phone-number'],
        address: values.address,
      });

      // Handle successful signup
      console.log('Signup successful:', response.data);

      // Redirect to another page after successful signup (you might want to replace '/login' with the actual path)
      navigate('/login');
    } catch (error) {
      // Handle signup error
      console.error('Error signing up:', error);
    }
  };

  // JSX structure for the Signup component
  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        {/* Heading for the signup section */}
        <h2 style={headerStyle}>Sign Up</h2>

        {/* Ant Design Form component */}
        <Form
          name="signupForm"
          onFinish={onFinish}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
        >
          {/* Input for full name */}
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              { required: true, message: 'Please input your full name!' },
            ]}
          >
            <Input placeholder="Full Name" style={{ textAlign: 'left' }} />
          </Form.Item>

          {/* Input for email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Email" style={{ textAlign: 'left' }} />
          </Form.Item>

          {/* Input for password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              placeholder="Password"
              style={{ textAlign: 'left', width: '100%' }}
            />
          </Form.Item>

          {/* Input for confirming password */}
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords do not match!');
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm Password"
              style={{ textAlign: 'left', width: '100%' }}
            />
          </Form.Item>

          {/* Input for username */}
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" style={{ textAlign: 'left' }} />
          </Form.Item>

          {/* Input for phone number */}
          <Form.Item
            label="Phone #"
            name="phone-number"
            rules={[
              { required: true, message: 'Please input your phone-number!' },
            ]}
          >
            <Input placeholder="Phone-Number" style={{ textAlign: 'left' }} />
          </Form.Item>

          {/* Input for address */}
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input your address' }]}
          >
            <Input placeholder="Address" style={{ textAlign: 'left' }} />
          </Form.Item>

          {/* Button for submitting the form */}
          <Form.Item wrapperCol={{ span: 24, textAlign: 'left' }}>
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

// Export the Signup component as the default export of this module
export default Signup;
