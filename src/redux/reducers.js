import types from "./types";

//TODO remove test values
const INITIAL_STATE = {
  authenticated: false,
  alert: { visible: false, message: "", color: "danger" },
  userprofile: undefined,
  causes: undefined,
  projects: undefined
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SIGNIN: {
      return {
        ...state,
        authenticated: true,
        userprofile: action.user
      };
    }
    case types.SIGNOUT: {
      return {
        ...state,
        authenticated: false,
        userprofile: undefined,
        causes: undefined
      };
    }
    case types.ALERT_GLOBAL: {
      return {
        ...state,
        alert: {
          visible: true,
          message: action.message,
          color: action.color
        }
      };
    }
    case types.DISABLE_ALERT_GLOBAL: {
      return {
        ...state,
        alert: {
          visible: false,
          message: ""
        }
      };
    }
    case types.SET_GLOBAL_CAUSES: {
      return {
        ...state,
        causes: action.causes
      };
    }
    case types.SET_GLOBAL_PROJECTS: {
      return {
        ...state,
        projects: action.projects
      };
    }
    default: {
      return state;
    }
  }
}
