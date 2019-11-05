import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../redux/actions/auth';

const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <h4>
          <Link to="/profiles">Developers</Link>
        </h4>
      </li>
      <li>
        <h4>
          <Link to="/dashboard">
            <i className="fas fa-user" />{' '}
            <span className="hide-sm">Dashboard</span>
          </Link>
        </h4>
      </li>
      <li>
        <h4>
          <Link onClick={logout} to="/">
            <i className="fas fa-sign-out-alt" />{' '}
            <span className="hide-sm">Logout</span>
          </Link>
        </h4>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <h4>
          <Link to="/profiles">Developers</Link>
        </h4>
      </li>
      <li>
        <h4>
          <Link to="/register">Register</Link>
        </h4>
      </li>

      <li>
        <h4>
          <Link to="/login">
            <i className="fas fa-sign-in-alt" /> Login
          </Link>
        </h4>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!loading && (isAuthenticated ? authLinks : guestLinks)}
    </nav>
  );
};

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(NavBar);
