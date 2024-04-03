import React, { useState, useContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
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
  LogoutOutlined,
} from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
import UserProfile from './components/UserProfile';
import { AuthProvider, AuthContext } from './context/auth';
import UserList from './components/UserList';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const { user, logout } = useContext(AuthContext);

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
    width: '5em',
  };

  useEffect(() => {
    if (user) setLoggedInUser(user);
  }, [user]);

  const handleLogout = () => {
    logout();
    setLoggedInUser(null);
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <Router>
      <AuthProvider>
        <div className="App" style={{ textAlign: 'center' }}>
          <Navbar handleSearch={handleSearch} />

          <nav style={{ marginTop: '10px' }}>
            <ul
              style={{
                display: 'flex',
                justifyContent: 'center',
                listStyle: 'none',
                padding: 0,
              }}
            >
              <Tooltip title="Home">
                <li>
                  <Link to="/">
                    <Button
                      onClick={() => console.log('clicked')}
                      style={buttonStyle}
                    >
                      <HomeOutlined />
                    </Button>
                  </Link>
                </li>
              </Tooltip>

              {/* Not Logged In: Can only see the login and signup buttons */}
              {!loggedInUser?.token && (
                <>
                  <Tooltip title="Login">
                    <li>
                      <Link to="/login">
                        <Button
                          onClick={() => console.log('clicked')}
                          style={buttonStyle}
                        >
                          <LoginOutlined />
                        </Button>
                      </Link>
                    </li>
                  </Tooltip>
                  <Tooltip title="Signup">
                    <li>
                      <Link to="/signup">
                        <Button
                          onClick={() => console.log('clicked')}
                          style={buttonStyle}
                        >
                          <UserAddOutlined />
                        </Button>
                      </Link>
                    </li>
                  </Tooltip>
                </>
              )}

              {/* Logged In but not an Admin: Can only see Logout button and profile button */}
              {loggedInUser?.token && loggedInUser?.role !== 'admin' && (
                <>
                  <Tooltip title="Profile">
                    <li>
                      <Link to="/profile">
                        <Button style={buttonStyle}>
                          <UserOutlined />
                        </Button>
                      </Link>
                    </li>
                  </Tooltip>
                  <Tooltip title="Logout">
                    <li>
                      <Link to="#">
                        <Button style={buttonStyle} onClick={handleLogout}>
                          <LogoutOutlined />
                        </Button>
                      </Link>
                    </li>
                  </Tooltip>
                </>
              )}

              {/* Logged in AND Admin: Can see every single button */}
              {loggedInUser?.token && loggedInUser?.role === 'admin' && (
                <>
                  <Tooltip title="Add Game">
                    <li>
                      <Link to="/add">
                        <Button style={buttonStyle}>
                          <PlusOutlined />
                        </Button>
                      </Link>
                    </li>
                  </Tooltip>
                  <Tooltip title="Profile">
                    <li>
                      <Link to="/users">
                        <Button style={buttonStyle}>
                          <UserOutlined />
                        </Button>
                      </Link>
                    </li>
                  </Tooltip>
                  <Tooltip title="Logout">
                    <li>
                      <Link to="#">
                        <Button style={buttonStyle} onClick={handleLogout}>
                          <LogoutOutlined />
                        </Button>
                      </Link>
                    </li>
                  </Tooltip>
                </>
              )}
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
            <Route path="/users" element={<UserList />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/userprofile" element={<UserProfile />} />
          </Routes>

          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
