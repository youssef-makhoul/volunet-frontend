import types from "./types";

const INITIAL_STATE = {
  authenticated: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SIGNIN: {
      return {
        ...state,
        authenticated: true
      };
    }
    case types.SIGNOUT: {
      return {
        ...state,
        authenticated: false
      };
    }
    default: {
      return state;
    }
  }
}
