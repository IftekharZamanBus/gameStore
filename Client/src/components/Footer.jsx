import React from 'react';

function Footer() {
  const footerStyle = {
    backgroundColor: '#ADFFC3',
    color: 'black',
    padding: '15px 0',
    position: 'fixed',
    width: '100%',
    bottom: 0,
    textAlign: 'center',
  };

  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} Game Store. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;
