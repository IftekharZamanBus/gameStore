import React from 'react';
import { Button, Form, Input, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const AddGame = () => {
  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('quantity', values.quantity);
      formData.append('price', values.price);
      formData.append('availability', values.availability);

      // Append the image file to the form data
      if (values.picture && values.picture[0]) {
        formData.append('picture', values.picture[0].originFileObj);
      }

      await axios.post(`http://localhost:5050/api/games`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Error updating game:', error);
    }
    console.log(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
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
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: 'Please upload a picture of the game!',
            },
          ]}
          tooltip="Upload a picture of the game"
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
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
};

export default AddGame;
