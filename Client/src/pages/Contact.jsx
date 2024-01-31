// Import necessary modules and components from React and ant-design library
import React from 'react';
import { Form, Input, Button, Tooltip } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';

// Define the functional component named Contact
function Contact() {
  // Styles for various sections of the component
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

  // Handler for form submission
  const onFinish = (values) => {
    console.log('Received values:', values);
    // Handle signup logic here
  };

  // JSX structure for the Contact component
  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={headerStyle}>Contact Us</h2>
        {/* Form for user contact */}
        <Form name="contactForm" onFinish={onFinish}>
          {/* Form item for Full Name */}
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
          {/* Form item for Email */}
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
          {/* Form item for Phone Number */}
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
          {/* Form item for Message */}
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
          {/* Tooltip-wrapped Submit button */}
          <Tooltip title="Submit">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Tooltip>
          {/* Contact information */}
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

// Export the Contact component as the default export of this module
export default Contact;
