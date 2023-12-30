import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GameList from './pages/GameList';
import AddGame from './pages/AddGame';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { HomeOutlined, PlusOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import About from './pages/About'; // Import the About page component
import Contact from './pages/Contact'; // Import the Contact page component

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
                  <Link to="/" style={{ ...buttonStyle, }}><HomeOutlined /></Link>
                </Button>
              </li>
            </Tooltip>
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
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<GameList searchTerm={searchTerm} />} />
          <Route path="/add" element={<AddGame />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Route to About page */}
          <Route path="/about" element={<About />} />
          {/* Route to Contact page */}
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
