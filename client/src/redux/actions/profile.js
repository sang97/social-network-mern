import { GET_PROFILE, PROFILE_ERROR } from '../types/types';

import { setAlert } from './alert';

import axios from 'axios';
// import { setAlert } from '../actions/alert';
import setAuthToken from '../../utils/setAuthToken';

//get current user profile
export const getCurrentProfile = () => async dispatch => {
  if (localStorage.token) setAuthToken(localStorage.token);

  try {
    const res = await axios.get('/api/profile/me');
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    const { statusText: msg, status } = err.response;
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg, status }
    });
  }
};

const CONFIG = {
  headers: {
    'Content-Type': 'application/json'
  }
};

//create new profile
export const createProfile = (
  data,
  history,
  edit = false
) => async dispatch => {
  const body = JSON.stringify(data);
  try {
    const res = await axios.post('/api/profile', body, CONFIG);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile updated' : 'Profile Created', 'success'));
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    const { statusText: msg, status } = err.response;
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg, status }
    });
  }
};
