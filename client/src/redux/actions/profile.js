import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  CLEAR_PROFILE
} from '../types/types';

import { setAlert } from './alert';

import axios from 'axios';

//get current user profile
export const getCurrentProfile = () => async dispatch => {
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

// add experience
export const addExperience = (data, history) => async dispatch => {
  const body = JSON.stringify(data);
  try {
    const res = await axios.put('/api/profile/experience', body, CONFIG);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience udpated', 'success'));
    history.push('/dashboard');
  } catch (err) {
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

// add education
export const addEducation = (data, history) => async dispatch => {
  const body = JSON.stringify(data);
  try {
    const res = await axios.put('/api/profile/education', body, CONFIG);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education udpated', 'success'));
    history.push('/dashboard');
  } catch (err) {
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

// remove experience
export const removeExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience removed', 'success'));
  } catch (error) {
    const { statusText: msg, status } = error.response;
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg, status }
    });
  }
};

// remove education
export const removeEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education removed', 'success'));
  } catch (error) {
    const { statusText: msg, status } = error.response;
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg, status }
    });
  }
};

//delete account & profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This can not be undone!')) {
    try {
      await axios.delete('/api/profile');

      dispatch({
        type: CLEAR_PROFILE
      });
      dispatch({
        type: ACCOUNT_DELETED
      });

      dispatch(
        setAlert('Your account has been permanantly deleted', 'success')
      );
    } catch (error) {
      const { statusText: msg, status } = error.response;
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg, status }
      });
    }
  }
};
