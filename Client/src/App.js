import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GameList from './pages/GameList';
import AddGame from './pages/AddGame';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { Button } from 'antd';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const buttonStyle = {
    background: '#ADFFC3', 
    color: 'black', 
    textDecoration: 'none',
    padding: '8px 20px',
    border: 'none',
    borderRadius: '5px',
    margin: '0 10px', 
  };

  return (
    <Router>
      <div className="App" style={{ textAlign: 'center' }}>
        <Navbar handleSearch={handleSearch} />
        <nav style={{ marginTop: '10px' }}>
          <ul style={{ display: 'flex', justifyContent: 'center', listStyle: 'none', padding: 0 }}>
            <li>
              <Button type="primary" style={buttonStyle}>
                <Link to="/" style={{ ...buttonStyle, color: 'black' }}>Home</Link>
              </Button>
            </li>
            <li>
              <Button type="primary" style={buttonStyle}>
                <Link to="/add" style={{ ...buttonStyle, color: 'black' }}>Add Game</Link>
              </Button>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<GameList searchTerm={searchTerm} />} />
          <Route path="/add" element={<AddGame />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
