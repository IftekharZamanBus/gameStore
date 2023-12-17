import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const Home = () => (
  <div style={{ textAlign: 'center', marginTop: '20px' }}>
    <h1>Welcome to the Game Store</h1>
    <Button type="primary">
      <Link to="/">Home</Link>
    </Button>{' '}
    <Button type="primary">
      <Link to="/add">Add Game</Link>
    </Button>{' '}
  </div>
);

export default Home;
