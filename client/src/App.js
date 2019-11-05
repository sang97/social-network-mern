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
import EditProfile from './components/profile-forms/EditProfile/EditProfile';
import AddExperience from './components/profile-forms/AddExperience/AddExperience';
import AddEducation from './components/profile-forms/AddEducation/AddEducation';
import Profiles from './components/profiles/Profiles/Profiles';
import Profile from './components/profile/Profile/Profile';

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

            <Route exact path="/register" component={Register} />
            <Route eaxct path="/profiles" component={Profiles} />
            <Route eaxct path="/profile/:id" component={Profile} />

            <PrivateRoute exact path="/dashboard" component={DashBoard} />

            <PrivateRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute
              exact
              path="/add-experience"
              component={AddExperience}
            />
            <PrivateRoute
              exact
              path="/add-education"
              component={AddEducation}
            />
          </Switch>
        </section>
      </Router>
    </Provider>
  );
};

export default App;
