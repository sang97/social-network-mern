import React, { useEffect } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './components/layout/NavBar/NavBar';
import Landing from './components/layout/Landing/Landing';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import Alert from './components/layout/Alert/Alert';
import DashBoard from './components/dashboard/DashBoard/DashBoard';
import CreateProfile from './components/profile-forms/CreateProfile/CreateProfile';

import PrivateRoute from './routing/PrivateRoute';

import { Provider } from 'react-redux';
import store from './store';

import { loadUser } from './redux/actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />

          <Switch>
            <Route exact path="/login" component={Login} />
            <Route eaxct path="/register" component={Register} />
            <Route exact path="/create-profile" component={CreateProfile} />
            <PrivateRoute exact path="/dashboard" component={DashBoard} />
          </Switch>
        </section>
      </Router>
    </Provider>
  );
};

export default App;
