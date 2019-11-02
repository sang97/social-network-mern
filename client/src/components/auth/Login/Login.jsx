import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../../redux/actions/auth';
import PropTypes from 'prop-types';

const Login = ({ isAuthenticated, login }) => {
  const initalFormData = {
    email: '',
    password: ''
  };
  const [formData, setFormData] = useState(initalFormData);

  const { email, password } = formData;

  const onChangeHandler = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = event => {
    event.preventDefault();
    login(formData);
  };

  //Redirect if authenticated
  if (isAuthenticated) return <Redirect to="/dashboard" />;

  return (
    <div>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-sign-in-alt"></i> Sign into Your Account
      </p>
      <form className="form" action="dashboard.html" onSubmit={onSubmitHandler}>
        <div className="form-group">
          <input
            value={email}
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <input
            value={password}
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChangeHandler}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
        <p className="my-1">
          Do not have an account? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
