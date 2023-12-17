import React, { useState } from 'react';
import { Menu, Input } from 'antd';
import { HomeOutlined, InfoCircleOutlined, PhoneOutlined } from '@ant-design/icons';

const { Search } = Input;

const Navbar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const onSearch = (value) => {
    setSearchTerm(value.toLowerCase());
    handleSearch(value.toLowerCase()); 
  };

  return (
    <Menu
      mode="horizontal"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ADFFC3', 
        padding: '10px 20px', 
      }}
    >
      <Menu.Item key="home" icon={<HomeOutlined />} style={{ marginRight: 'auto' }}>
        Game Store
      </Menu.Item>
      <Menu.Item key="about" style={{ marginRight: '10px' }}>About</Menu.Item>
      <Menu.Item key="contact" style={{ marginRight: '20px' }}>Contact</Menu.Item>
      <Menu.Item key="search" style={{ marginRight: '10px' }}>
        <Search placeholder="Search..." style={{ width: 200 }} onSearch={onSearch} />
      </Menu.Item>
      <Menu.Item key="info" icon={<InfoCircleOutlined />} />
      <Menu.Item key="phone" icon={<PhoneOutlined />} />
    </Menu>
  );
};

export default Navbar;
