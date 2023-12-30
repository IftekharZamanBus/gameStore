import React from 'react';
import { Form, Input, Button } from 'antd';

function Signup() {
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
    // Handle signup logic here
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={headerStyle}>Sign Up</h2>
        <Form name="signupForm" onFinish={onFinish}>
          <Form.Item label = "Full Name" name="fullName" rules={[{ required: true, message: 'Please input your full name!' }]} tooltip="Enter your Full Name">
            <Input placeholder="Full Name" />
          </Form.Item>
          <Form.Item label = "Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]} tooltip="Enter your email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label = "Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]} tooltip="Enter your password">
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item label = "Confirm Password" name="confirmPassword" dependencies={['password']} rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords do not match!');
              },
            }),
          ]} tooltip="Confirm Password">
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item label = "Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]} tooltip="Enter your username">
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item label = "Phone Number" name="phone-number" rules={[{ required: true, message: 'Please input your phone-number!' }]} tooltip="Enter your phone number">
            <Input placeholder="Phone-Number" />
          </Form.Item>

          <Form.Item label = "Address" name="address" rules={[{ required: true, message: 'Please input your address' }]} tooltip="Enter your address">
            <Input placeholder="Address" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
