// Import necessary modules and components from React, antd, react-router-dom, and axios
import React, {useContext} from 'react';
import { Form, Input, Button, message } from 'antd';
import { post } from '../api/services';
import { AuthContext } from '../context/auth';
import { useNavigate } from 'react-router-dom';

// Define the functional component named Login
function Login() {
  console.log("Fixed Login Issue, due to seeders data import");
  const [form] = Form.useForm();
  const context = useContext(AuthContext);
  const navigate = useNavigate();
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
      textAlign: 'left',
    },
  };

  const wrapperCol = {
    span: 24,
  };

  const onFinish = async (values) => {
    console.log('Success:', values);
    try {
      const response = await post(`/api/users/login`, values);
      if(response?.token) {
        form.resetFields();
        message.success('Logged in successfully');
        localStorage.setItem('user', JSON.stringify(response));
        context.login(response);
        window.location.href = '/';
      }
    } catch (error) {
      console.error(error);
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }


  // JSX structure for the Login component
  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        {/* Heading for the Login section */}
        <h2 style={headerStyle}>Login</h2>

        {/* Ant Design Form component */}
        <Form form={form} name="loginForm" labelCol={labelCol} wrapperCol={wrapperCol} onFinish={onFinish} onFinishFailed={onFinishFailed}>

          {/* Input for email */}
          <Form.Item
            label="Email: "
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Email" style={{ textAlign: 'left' }} />
          </Form.Item>

          {/* Input for password */}
          <Form.Item
            label="Password: "
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" style={{ textAlign: 'left', width: '100%' }} />
          </Form.Item>

          {/* Button for submitting the form */}
          <Form.Item wrapperCol={{ span: 24, textAlign: 'left' }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

// Export the Signup component as the default export of this module
export default Login;
