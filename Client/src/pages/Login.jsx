import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

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

  const onFinish = (values) => {
    // Assuming correct credentials for simplicity
    setUser(values);

    // Navigate to the user profile page
    navigate('/userprofile');
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={headerStyle}>Login</h2>
        <Form name="loginForm" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24, textAlign: 'center' }}>
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
