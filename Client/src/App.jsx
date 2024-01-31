// Import necessary modules and components from React, react-router-dom, antd, and your application files
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GameList from './pages/GameList';
import AddGame from './pages/AddGame';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import {
  HomeOutlined,
  PlusOutlined,
  LoginOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import About from './pages/About'; // Import the About page component
import Contact from './pages/Contact'; // Import the Contact page component
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';

// Define the functional component named App
function App() {
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');

  // Callback function to handle search term changes
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Style for navigation buttons
  const buttonStyle = {
    background: '#4F7942',
    color: 'white',
    textDecoration: 'none',
    border: 'none',
    borderRadius: '20px',
    margin: '0 10px',
  };

  // JSX structure for the App component
  return (
    <Router>
      <div className="App" style={{ textAlign: 'center' }}>
        {/* Navigation bar component */}
        <Navbar handleSearch={handleSearch} />

        {/* Navigation buttons */}
        <nav style={{ marginTop: '10px' }}>
          <ul style={{ display: 'flex', justifyContent: 'center', listStyle: 'none', padding: 0 }}>
            {/* Home Button */}
            <Tooltip title="Home">
              <li>
                <Button style={buttonStyle}>
                  <Link to="/" style={{ ...buttonStyle, }}><HomeOutlined /></Link>
                </Button>
              </li>
            </Tooltip>
            {/* Add Game Button */}
            <Tooltip title="Add Game">
              <li>
                <Button style={buttonStyle}>
                  <Link to="/add" style={{ ...buttonStyle, }}><PlusOutlined /></Link>
                </Button>
              </li>
            </Tooltip>
            {/* Login Button */}
            <Tooltip title="Login">
              <li>
                <Button style={buttonStyle}>
                  <Link to="/login" style={{ ...buttonStyle }}><LoginOutlined /></Link>
                </Button>
              </li>
            </Tooltip>
            {/* Signup Button */}
            <Tooltip title="Signup">
              <li>
                <Button style={buttonStyle}>
                  <Link to="/signup" style={{ ...buttonStyle }}><UserAddOutlined /></Link>
                </Button>
              </li>
            </Tooltip>
            {/* Profile Button */}
            <Tooltip title="Profile">
              <li>
                <Button style={buttonStyle}>
                  <Link to="/profile" style={{ ...buttonStyle }}><UserOutlined /></Link>
                </Button>
              </li>
            </Tooltip>
          </ul>
        </nav>

        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<GameList searchTerm={searchTerm} />} />
          <Route path="/add" element={<AddGame />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Routes>

        {/* Footer component */}
        <Footer />
      </div>
    </Router>
  );
}

// Export the App component as the default export of this module
export default App;
