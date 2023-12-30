// Navbar.jsx
import React from 'react';
import { Menu } from 'antd';
import { InfoCircleOutlined, PhoneOutlined, LaptopOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = () => {
  return (
    <Menu mode="horizontal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#4F7942', padding: '10px 20px', color: 'white' }}>
      <Menu.Item key="home" icon={<LaptopOutlined />} style={{ marginRight: 'auto' }}>
        <Link to="/">Game Store</Link> {/* Link to the home page */}
      </Menu.Item>
      <Menu.Item key="about" style={{ marginRight: '10px' }}>
        <Link to="/about">About</Link> {/* Link to the About page */}
      </Menu.Item>
      <Menu.Item key="contact" style={{ marginRight: '20px' }}>
        <Link to="/contact">Contact</Link> {/* Link to the Contact page */}
      </Menu.Item>
      <Menu.Item key="info" icon={<InfoCircleOutlined />} />
      <Menu.Item key="phone" icon={<PhoneOutlined />} />
    </Menu>
  );
};

export default Navbar;
