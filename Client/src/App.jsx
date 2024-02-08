// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
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
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
import UserProfile from './components/UserProfile';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const buttonStyle = {
    background: '#4F7942',
    color: 'white',
    textDecoration: 'none',
    border: 'none',
    borderRadius: '20px',
    margin: '0 10px',
  };

  return (
    <Router>
      <div className="App" style={{ textAlign: 'center' }}>
        <Navbar handleSearch={handleSearch} />

        <nav style={{ marginTop: '10px' }}>
          <ul style={{ display: 'flex', justifyContent: 'center', listStyle: 'none', padding: 0 }}>
            <Tooltip title="Home">
              <li>
                <Button style={buttonStyle}>
                  <Link to="/" style={{ ...buttonStyle, }}>
                    <HomeOutlined />
                  </Link>
                </Button>
              </li>
            </Tooltip>
            <Tooltip title="Add Game">
              <li>
                <Button style={buttonStyle}>
                  <Link to="/add" style={{ ...buttonStyle, }}>
                    <PlusOutlined />
                  </Link>
                </Button>
              </li>
            </Tooltip>
            <Tooltip title="Login">
              <li>
                <Button style={buttonStyle}>
                  <Link to="/login" style={{ ...buttonStyle }}>
                    <LoginOutlined />
                  </Link>
                </Button>
              </li>
            </Tooltip>
            <Tooltip title="Signup">
              <li>
                <Button style={buttonStyle}>
                  <Link to="/signup" style={{ ...buttonStyle }}>
                    <UserAddOutlined />
                  </Link>
                </Button>
              </li>
            </Tooltip>
            <Tooltip title="Profile">
              <li>
                <Button style={buttonStyle}>
                  <Link to="/profile" style={{ ...buttonStyle }}>
                    <UserOutlined />
                  </Link>
                </Button>
              </li>
            </Tooltip>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<GameList searchTerm={searchTerm} />} />
          <Route path="/add" element={<AddGame />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route
            path="/userprofile"
            element={<UserProfile/>}
          />

        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
