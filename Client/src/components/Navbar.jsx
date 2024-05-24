// Import necessary modules and components from React, Ant Design, and other libraries
import React, {useContext} from 'react';
import { Menu, Tooltip } from 'antd'; // Import Menu and Tooltip components from Ant Design
import { InfoCircleOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'; // Import icons from Ant Design
import { LuJoystick } from 'react-icons/lu'; // Import custom joystick icon from react-icons
import { Link } from 'react-router-dom'; // Import Link from react-router-dom to create navigation links
import { AuthContext } from '../context/auth'; // Import the AuthContext from the context/auth module
import { useSelector } from 'react-redux';

// Define the functional component named Navbar
const Navbar = () => {
  const {user} = useSelector((state) => state.auth);
  //const {user} = useContext(AuthContext);
  // Define styles for icons
  const iconStyle = {
    color: 'white', // Default icon color
  };

  const iconHoverStyle = {
    color: '#1890ff', // Blue color when hovered
  };

  // JSX structure for the Navbar component
  return (
    <Menu mode="horizontal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#4F7942', padding: '10px 20px', color: 'white' }}>

      {/* Navigation item for the home page with a custom joystick icon */}
      <Tooltip title="Home Page">
        <Menu.Item key="home" icon={<LuJoystick style={iconStyle} className="icon" />} style={{ marginRight: 'auto' }}>
          <Link to="/" style={iconStyle}>Game Store</Link> {/* Link to the home page */}
        </Menu.Item>
      </Tooltip>

      {user?.token && (<Tooltip title={user?.full_name}>
        <Menu.Item key="user" icon={<UserOutlined style={iconStyle} className="icon" />} style={{ marginRight: 'auto' }}>
          <Link to="/profile" style={iconStyle}>{user?.full_name}</Link> {/* Link to the home page */}
        </Menu.Item>
      </Tooltip>)}

      {/* Navigation item for the About page with an info circle icon */}
      <Tooltip title="About Page">
        <Menu.Item key="about" style={{ marginRight: '10px' }}>
          <Link to="/about"><InfoCircleOutlined style={iconStyle} className="icon" /></Link> {/* Link to the About page */}
        </Menu.Item>
      </Tooltip>

      {/* Navigation item for the Contact page with a phone icon */}
      <Tooltip title="Contact Page">
        <Menu.Item key="contact" style={{ marginRight: '20px' }}>
          <Link to="/contact"><PhoneOutlined style={iconStyle} className="icon" /></Link> {/* Link to the Contact page */}
        </Menu.Item>
      </Tooltip>
    </Menu>
  );
};

// Export the Navbar component as the default export of this module
export default Navbar;
