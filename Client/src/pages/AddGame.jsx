import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const onFinish = async (values) => {
  try {
    await axios.post(`http://localhost:5050/api/games`, values);

  } catch (error) {
    console.error('Error updating game:', error);
  }
  console.log(values)
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const AddGame = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
    <Form
      name="addGameForm"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <style>
        {`
          /* Custom CSS for placeholder color */
          ::placeholder {
            color: rgba(0, 0, 0, 0.7); /* Darker color for the placeholder text */
          }
        `}
      </style>

      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input the name of the game!',
          },
        ]}
        tooltip="Enter the name of the game"
      >
        <Input.TextArea style={{ border: '1px solid black' }} placeholder="Enter name" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: 'Please input the description of the game!',
          },
        ]}
        tooltip="Enter a brief description of the game"
      >
        <Input.TextArea style={{ border: '1px solid black' }} placeholder="Enter description" />
      </Form.Item>

      <Form.Item
        label="Quantity"
        name="quantity"
        rules={[
          {
            required: true,
            message: 'Please input the quantity of the game!',
          },
        ]}
        tooltip="Enter the quantity of the game"
      >
        <Input.TextArea style={{ border: '1px solid black' }} placeholder="Enter quantity" />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[
          {
            required: true,
            message: 'Please input the price of the game!',
          },
        ]}
        tooltip="Enter the price of the game"
      >
        <Input.TextArea style={{ border: '1px solid black' }} placeholder="Enter price" />
      </Form.Item>

      <Form.Item
        label="Availability"
        name="availability"
        rules={[
          {
            required: true,
            message: 'Please select the availability of the game!',
          },
        ]}
        tooltip="Select the availability of the game"
      >
        <Select style={{ border: '1px solid black' }} placeholder="Select availability">
          <Option value="In Stock">In Stock</Option>
          <Option value="Out of Stock">Out of Stock</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Picture"
        name="picture"
        rules={[
          {
            required: true,
            message: 'Please upload a picture of the game!',
          },
        ]}
        tooltip="Upload a picture of the game"
      >
        <Input type="file" style={{ border: '1px solid black' }} />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" title="Click Submit to add the game">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>
);

export default AddGame;