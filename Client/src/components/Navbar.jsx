import React from 'react';
import { Menu, Tooltip } from 'antd';
import { InfoCircleOutlined, PhoneOutlined } from '@ant-design/icons';
import { LuJoystick } from 'react-icons/lu';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = () => {
  const iconStyle = {
    color: 'white', // Default icon color
  };

  const iconHoverStyle = {
    color: '#1890ff', // Blue color when hovered
  };

  return (
    <Menu mode="horizontal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#4F7942', padding: '10px 20px', color: 'white' }}>

      <Tooltip title="Home Page">
        <Menu.Item key="home" icon={<LuJoystick style={iconStyle} className="icon" />} style={{ marginRight: 'auto' }}>
          <Link to="/" style={iconStyle}>Game Store</Link> {/* Link to the home page */}
        </Menu.Item>
      </Tooltip>

      <Tooltip title="About Page">
        <Menu.Item key="about" style={{ marginRight: '10px' }}>
          <Link to="/about"><InfoCircleOutlined style={iconStyle} className="icon" /></Link> {/* Link to the About page */}
        </Menu.Item>
      </Tooltip>

      <Tooltip title="Contact Page">
        <Menu.Item key="contact" style={{ marginRight: '20px' }}>
          <Link to="/contact"><PhoneOutlined style={iconStyle} className="icon" /></Link> {/* Link to the Contact page */}
        </Menu.Item>
      </Tooltip>
    </Menu>
  );
};

export default Navbar;
