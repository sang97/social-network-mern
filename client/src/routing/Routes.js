import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../components/auth/Login/Login';
import Register from '../components/auth/Register/Register';
import Alert from '../components/layout/Alert/Alert';
import DashBoard from '../components/dashboard/DashBoard/DashBoard';
import CreateProfile from '../components/profile-forms/CreateProfile/CreateProfile';
import EditProfile from '../components/profile-forms/EditProfile/EditProfile';
import AddExperience from '../components/profile-forms/AddExperience/AddExperience';
import AddEducation from '../components/profile-forms/AddEducation/AddEducation';
import Profiles from '../components/profiles/Profiles/Profiles';
import Profile from '../components/profile/Profile/Profile';
import Posts from '../components/posts/Posts/Posts';
import Post from '../components/posts/Post/Post';
import NotFound from '../components/layout/NotFound/NotFound';

import PrivateRoute from './PrivateRoute';

const Routes = () => (
  <section className="container">
    <Alert />

    <Switch>
      <Route exact path="/login" component={Login} />

      <Route exact path="/register" component={Register} />
      <Route eaxct path="/profiles" component={Profiles} />
      <Route eaxct path="/profile/:id" component={Profile} />

      <PrivateRoute exact path="/dashboard" component={DashBoard} />

      <PrivateRoute exact path="/create-profile" component={CreateProfile} />
      <PrivateRoute exact path="/edit-profile" component={EditProfile} />
      <PrivateRoute exact path="/add-experience" component={AddExperience} />
      <PrivateRoute exact path="/add-education" component={AddEducation} />
      <PrivateRoute exact path="/posts" component={Posts} />
      <PrivateRoute exact path="/post/:id" component={Post} />
      <Route component={NotFound} />
    </Switch>
  </section>
);

export default Routes;
