import { GET_PROFILE, PROFILE_ERROR } from '../types/types';

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
      return { ...state, ...payload };

    case PROFILE_ERROR:
      return state;
    default:
      return state;
  }
};
