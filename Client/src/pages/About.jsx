import React from 'react';
import { FaGamepad, FaStore, FaGlobe, FaUsers } from 'react-icons/fa';

const About = () => {
  const containerStyle = {
    maxWidth: '900px',
    margin: 'auto',
    padding: '25px',
    fontFamily: 'Arial, sans-serif',
  };

  const headingStyle = {
    fontSize: '2.5em',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  };

  const paragraphStyle = {
    fontSize: '1.2em',
    lineHeight: '1.6',
    color: '#666',
    textAlign: 'center',
  };

  const iconContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '50px',
  };

  const iconStyle = {
    fontSize: '4em',
    margin: '0 20px',
  };

  const wordStyle = {
    fontSize: '1.2em',
    fontWeight: 'bold',
    marginBottom: '10px', // Increased padding between words and descriptions
  };

  const descriptionStyle = {
    fontSize: '1em',
    color: '#888',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>About Us</h2>
      <p style={paragraphStyle}>
        Welcome to our game store. We are passionate about delivering the best gaming experience to our customers. 
        Our store offers a wide range of games, from classics to the latest releases, ensuring there's something for 
        every gaming enthusiast. Our team is dedicated to providing exceptional service and helping you find the 
        perfect game. Explore our collection and dive into the world of gaming!
      </p>
      
      <br />

      <h2 style={headingStyle}>Values</h2>

      <div style={iconContainerStyle}>
        <div style={{ textAlign: 'center' }}>
          <FaGamepad style={iconStyle} />
          <p style={wordStyle}>Entertainment</p>
          <p style={descriptionStyle}>Our games provide thrilling entertainment and endless fun for players of all ages.</p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <FaStore style={iconStyle} />
          <p style={wordStyle}>Variety</p>
          <p style={descriptionStyle}>We offer a diverse selection of games, ensuring there's something for every gamer.</p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <FaGlobe style={iconStyle} />
          <p style={wordStyle}>Global</p>
          <p style={descriptionStyle}>Our store connects gamers worldwide, providing access to games from across the globe.</p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <FaUsers style={iconStyle} />
          <p style={wordStyle}>Community</p>
          <p style={descriptionStyle}>We foster a welcoming community where gamers can connect, share, and enjoy gaming together.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
