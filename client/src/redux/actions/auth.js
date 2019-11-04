import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from '../types/types';

import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../../utils/setAuthToken';

// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

const CONFIG = {
  headers: {
    'Content-Type': 'application/json'
  }
};

//Login user
export const login = data => async dispatch => {
  const body = JSON.stringify(data);
  try {
    const res = await axios.post('/api/auth', body, CONFIG);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    dispatch({ type: LOGIN_FAIL });
  }
};

// Register user
export const register = data => async dispatch => {
  const body = JSON.stringify(data);
  try {
    const res = await axios.post('/api/users', body, CONFIG);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    dispatch({ type: REGISTER_FAIL });
  }
};

// Log out
export const logout = () => async dispatch => {
  dispatch({
    type: CLEAR_PROFILE
  });
  dispatch({
    type: LOGOUT
  });
};
