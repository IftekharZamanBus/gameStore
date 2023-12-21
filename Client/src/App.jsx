import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GameList from './pages/GameList';
import AddGame from './pages/AddGame';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

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
        <Navbar handleSearch={handleSearch} /> {/* Pass handleSearch function as prop */}
        <nav style={{ marginTop: '10px' }}>
          <ul style={{ display: 'flex', justifyContent: 'center', listStyle: 'none', padding: 0 }}>
          <Tooltip title="Home">
            <li>
              <Button  style={buttonStyle}>
                <Link to="/" style={{ ...buttonStyle,}}><HomeOutlined /></Link>
              </Button>
            </li>
          </Tooltip>
          <Tooltip title="Add Game">
            <li>
              <Button  style={buttonStyle}>
                <Link to="/add" style={{ ...buttonStyle,}}><PlusOutlined /></Link>
              </Button>
            </li>
          </Tooltip>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<GameList searchTerm={searchTerm} />} /> {/* Pass searchTerm as a prop */}
          <Route path="/add" element={<AddGame />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
