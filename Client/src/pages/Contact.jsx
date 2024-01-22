import React from 'react';
import { Form, Input, Button, Tooltip } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';

function Contact() {
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

  const labelCol = {
    flex: '0 0 120px', // Adjust the label width as needed
  };

  const wrapperCol = {
    flex: '1', // Allow the input box to take the remaining width
  };

  const onFinish = (values) => {
    console.log('Received values:', values);
    // Handle signup logic here
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={headerStyle}>Contact Us</h2>
        <Form name="contactForm" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="fullName"
            rules={[{ required: true, message: 'Please input your full name!' }]}
            tooltip="Enter your Full Name"
            labelCol={labelCol}
            wrapperCol={wrapperCol}
          >
            <Input placeholder="Full Name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
            tooltip="Enter your email"
            labelCol={labelCol}
            wrapperCol={wrapperCol}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Phone #"
            name="phone-number"
            rules={[{ required: false, message: 'Please input your phone-number!' }]}
            tooltip="Enter your phone number"
            labelCol={labelCol}
            wrapperCol={wrapperCol}
          >
            <Input placeholder="Phone-Number" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: 'Please send us your message' }]}
            tooltip="Send us a message!"
            labelCol={labelCol}
            wrapperCol={wrapperCol}
          >
            <Input.TextArea placeholder="Message" autoSize={{ minRows: 3 }} />
          </Form.Item>
          <Tooltip title="Submit">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Tooltip>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MailOutlined style={{ fontSize: '20px', marginRight: '10px' }} />
            <p>game@store.com</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PhoneOutlined style={{ fontSize: '20px', marginRight: '10px' }} />
            <p>+1 123-456-7890</p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Contact;
