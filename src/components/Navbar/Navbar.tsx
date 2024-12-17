import { Link } from "react-router-dom";
import paths from "../../routes/paths";
import './Navbar.css';

// Navbar Component - Displays a basic navigation menu with routing links.
const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to={paths.home} className="home-link">Home</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
