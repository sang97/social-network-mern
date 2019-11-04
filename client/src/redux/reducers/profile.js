import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from '../types/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PROFILE:
      return { ...state, profile: payload, loading: false };

    case PROFILE_ERROR:
      return { ...state, error: payload, loading: false };
    case CLEAR_PROFILE:
      return { ...state, profile: null, repos: null, loading: true };

    default:
      return state;
  }
};
