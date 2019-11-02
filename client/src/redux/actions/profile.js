import { GET_PROFILE, PROFILE_ERROR } from '../types/types';

import axios from 'axios';
// import { setAlert } from '../actions/alert';
import setAuthToken from '../../utils/setAuthToken';

//get current user profile
export const getCurrentProfile = () => async dispatch => {
  //   if (localStorage.token) setAuthToken(localStorage.token);

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
