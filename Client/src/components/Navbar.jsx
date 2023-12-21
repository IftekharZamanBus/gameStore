import React from 'react';
import { Menu } from 'antd';
import { InfoCircleOutlined, PhoneOutlined,LaptopOutlined } from '@ant-design/icons';

const Navbar = () => {
  return (
    <Menu mode="horizontal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#4F7942', padding: '10px 20px', color: 'white' }}>
      <Menu.Item key="home" icon={<LaptopOutlined />} style={{ marginRight: 'auto' }}>
        Game Store
      </Menu.Item>
      <Menu.Item key="about" style={{ marginRight: '10px' }}>About</Menu.Item>
      <Menu.Item key="contact" style={{ marginRight: '20px' }}>Contact</Menu.Item>
      <Menu.Item key="info" icon={<InfoCircleOutlined />} />
      <Menu.Item key="phone" icon={<PhoneOutlined />} />
    </Menu>
  );
};

export default Navbar;
