// Import the React library
import React from 'react';

// Create a functional component named Footer
function Footer() {
  // Define the style object for the footer
  const footerStyle = {
    backgroundColor: '#979797', // Set background color
    color: 'white', // Set text color
    padding: '15px 0', // Set padding (top and bottom: 15px, left and right: 0)
    position: 'fixed', // Set position as fixed
    width: '100%', // Set width to 100% of the container
    bottom: 0, // Align the footer to the bottom of the viewport
    textAlign: 'center', // Center-align text
  };

  // Render the footer component
  return (
    // Render a footer element with the defined style
    <footer style={footerStyle}>
      {/* Display the copyright notice with the current year dynamically */}
      <p>&copy; {new Date().getFullYear()} Game Store. All Rights Reserved.</p>
    </footer>
  );
}

// Export the Footer component as the default export of this module
export default Footer;
