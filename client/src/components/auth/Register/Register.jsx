import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../../redux/actions/alert';
import { register } from '../../../redux/actions/auth';

import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const initalFormData = {
    name: '',
    email: '',
    password: '',
    password2: ''
  };
  const [formData, setFormData] = useState(initalFormData);

  const { name, email, password, password2 } = formData;

  const onChangeHandler = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = event => {
    event.preventDefault();
    if (password !== password2) {
      //check if passwords match
      setAlert('Passwords do not match', 'danger');
    } else {
      register(formData);
    }
  };

  //redirect if authenticated
  if (isAuthenticated) return <Redirect to="/dashboard" />;

  return (
    <div>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form
        className="form"
        action="create-profile.html"
        onSubmit={onSubmitHandler}
      >
        <div className="form-group">
          <input
            value={name}
            type="text"
            placeholder="Name"
            name="name"
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <input
            value={email}
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={onChangeHandler}
            required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            value={password}
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <input
            value={password2}
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            onChange={onChangeHandler}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
