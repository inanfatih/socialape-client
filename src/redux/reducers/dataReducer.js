import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
} from '../types';

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

export default function(state = initialState, actions) {
  let index;
  switch (actions.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: actions.payload,
        loading: false,
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      index = state.screams.findIndex(
        scream => scream.screamId === actions.payload.screamId,
      );
      state.screams[index] = actions.payload;
      return {
        ...state,
      };
    case DELETE_SCREAM:
      index = state.screams.findIndex(
        scream => scream.screamId === actions.payload,
      );
      state.screams.splice(index, 1);
      return {
        ...state,
      };
    default:
      return state;
  }
}
