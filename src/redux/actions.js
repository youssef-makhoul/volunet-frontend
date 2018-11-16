import types from "./types";

export default {
  SignIn: user => {
    return {
      type: types.SIGNIN,
      user: user
    };
  },
  SignOut: () => {
    return {
      type: types.SIGNOUT
    };
  },
  AlertGlobal: (message, color) => {
    return {
      type: types.ALERT_GLOBAL,
      message: message,
      color: color
    };
  },
  DisableAlertGlobal: () => {
    return {
      type: types.DISABLE_ALERT_GLOBAL
    };
  },
  SetGlobalCauses: causes => {
    return {
      type: types.SET_GLOBAL_CAUSES,
      causes: causes
    };
  },
  SetGlobalProjects: projects => {
    return {
      type: types.SET_GLOBAL_PROJECTS,
      projects: projects
    };
  }
};
