import React, { useState } from 'react';
import { Button, Form, Input, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useAddGameMutation } from '../slices/gameSlice';

const { Option } = Select;

const AddGame = () => {
  const [game, setGame] = useState({
    name: '',
    description: '',
    quantity: '',
    price: '',
    availability: '',
    picture: null,
  });

  const [formLayout] = useState('vertical');
  const [addGame, { isLoading }] = useAddGameMutation();

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'left',
    minHeight: '80vh',
  };

  const formStyle = {
    margin: '0 20px',
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: 600,
    width: '100%',
  };

  const labelCol = {
    span: 24,
    style: {
      textAlign: 'left',
    },
  };

  const wrapperCol = {
    span: 24,
  };

  const buttonCol = {
    span: 24,
    textAlign: 'center',
  };

  const inputStyle = {
    textAlign: 'left',
  };

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name', game.name);
      formData.append('description', game.description);
      formData.append('quantity', game.quantity);
      formData.append('price', game.price);
      formData.append('availability', game.availability);
      if (game.picture) {
        formData.append('picture', game.picture.originFileObj);
      }
      await addGame(formData).unwrap();
      message.success('Game added successfully!');
    } catch (error) {
      console.error('Error adding game:', error);
      message.error('Error adding game. Please try again.');
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div style={containerStyle}>
      <Form
        name="addGameForm"
        layout={formLayout}
        style={formStyle}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        initialValues={{
          layout: formLayout,
        }}
        onFinish={onFinish}
        autoComplete="on"
      >
        <h2>Add Game</h2>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input the name of the game!',
            },
          ]}
        >
          <Input
            placeholder="Enter name"
            style={inputStyle}
            onChange={(e) => setGame({ ...game, name: e.target.value })}
          />
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
        >
          <Input.TextArea
            placeholder="Enter description"
            style={inputStyle}
            onChange={(e) => setGame({ ...game, description: e.target.value })}
          />
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
        >
          <Input
            placeholder="Enter quantity"
            style={inputStyle}
            onChange={(e) => setGame({ ...game, quantity: e.target.value })}
          />
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
        >
          <Input
            placeholder="Enter price"
            style={inputStyle}
            onChange={(e) => setGame({ ...game, price: e.target.value })}
          />
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
        >
          <Select
            placeholder="Select availability"
            style={inputStyle}
            onChange={(value) => setGame({ ...game, availability: value })}
          >
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
        >
          <Upload
            name="picture"
            listType="picture"
            beforeUpload={() => false}
            onChange={(info) => setGame({ ...game, picture: info.fileList[0] })}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={buttonCol}>
          <Button
            type="primary"
            htmlType="submit"
            title="Click Submit to add the game"
            loading={isLoading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddGame;
