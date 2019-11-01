import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
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
    console.log(formData);
  };

  return (
    <div>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
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

export default Login;
