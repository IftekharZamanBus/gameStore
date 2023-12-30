import React from 'react';
import { Form, Input, Button } from 'antd';

function Login() {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '65vh',
  };

  const formStyle = {
    margin: '0 20px',
    padding: '20px',
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
    // Handle login logic here
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={headerStyle}>Login</h2>
        <Form name="loginForm" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]} tooltip="Enter your email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]} tooltip="Enter your password">
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item> 
            Forgot your password? Click <a href='/'>Here</a>.
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
