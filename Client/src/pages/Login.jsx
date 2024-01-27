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

  const onFinish = (values) => {
    console.log('Received values:', values);
    // Handle login logic here
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={headerStyle}>Login</h2>
        <Form name="loginForm" onFinish={onFinish} labelCol={labelCol} wrapperCol={wrapperCol}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Email" style={{ textAlign: 'left' }} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" style={{ textAlign: 'center' }} />
          </Form.Item>
          <Form.Item>
            Forgot your password? Click <a href="/resetpassword">Here</a>.
          </Form.Item>
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

export default Login;
