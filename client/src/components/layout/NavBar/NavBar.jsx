import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      <ul>
        <li>
          <h4>
            <Link to="/profiles">Developers</Link>
          </h4>
        </li>
        <h4>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </h4>

        <h4>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </h4>
      </ul>
    </nav>
  );
};

export default NavBar;
