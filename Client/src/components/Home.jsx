// Import necessary modules and components from React and Ant Design
import { Link } from 'react-router-dom'; // Import Link from react-router-dom to create navigation links
import { Button } from 'antd'; // Import Button component from Ant Design

// Define the functional component named Home
const Home = () => (
  // JSX structure for the Home component
  <div style={{ textAlign: 'center', marginTop: '20px' }}>
    <h1>Welcome to the Game Store</h1>
    {/* Navigation button to the Home page using Link from react-router-dom */}
    <Button type="primary">
      <Link to="/">Home</Link>
    </Button>{' '}
    {/* Navigation button to the Add Game page using Link from react-router-dom */}
    <Button type="primary">
      <Link to="/add">Add Game</Link>
    </Button>{' '}
  </div>
);

// Export the Home component as the default export of this module
export default Home;
