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
import UserList from './components/UserList/UserList';

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
  };

  useEffect(() => {
    if (user) setLoggedInUser(user);
    console.log(user);
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
                  <Button style={buttonStyle}>
                    <Link to="/" style={{ ...buttonStyle }}>
                      <HomeOutlined />
                    </Link>
                  </Button>
                </li>
              </Tooltip>

              {/* Not Logged In: Can only see the login and signup buttons */}
              {!loggedInUser?.token && (
                <>
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
                </>
              )}

              {/* Logged In but not an Admin: Can only see Logout button and profile button */}
              {loggedInUser?.token && loggedInUser?.role !== 'admin' && (
                <>
                  <Tooltip title="Profile">
                    <li>
                      <Button style={buttonStyle}>
                        <Link to="/profile" style={{ ...buttonStyle }}>
                          <UserOutlined />
                        </Link>
                      </Button>
                    </li>
                  </Tooltip>
                  <Tooltip title="Logout">
                    <li>
                      <Button style={buttonStyle} onClick={handleLogout}>
                        <Link to="#" style={{ ...buttonStyle }}>
                          <LogoutOutlined />
                        </Link>
                      </Button>
                    </li>
                  </Tooltip>
                </>
              )}

              {/* Logged in AND Admin: Can see every single button */}
              {loggedInUser?.token && loggedInUser?.role === 'admin' && (
                <>
                  <Tooltip title="Add Game">
                    <li>
                      <Button style={buttonStyle}>
                        <Link to="/add" style={{ ...buttonStyle }}>
                          <PlusOutlined />
                        </Link>
                      </Button>
                    </li>
                  </Tooltip>
                  <Tooltip title="Profile">
                    <li>
                      <Button style={buttonStyle}>
                        <Link to="/users" style={{ ...buttonStyle }}>
                          <UserOutlined />
                        </Link>
                      </Button>
                    </li>
                  </Tooltip>
                  <Tooltip title="Logout">
                    <li>
                      <Button style={buttonStyle} onClick={handleLogout}>
                        <Link to="#" style={{ ...buttonStyle }}>
                          <LogoutOutlined />
                        </Link>
                      </Button>
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
