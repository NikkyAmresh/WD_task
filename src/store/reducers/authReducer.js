const initState = {
  authError: null,
  user: null,
};

const authReducer = (state = initState, action) => {
  let error;
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log("login error");
      return {
        ...state,
        authError: action.err.response.data.message,
      };

    case "LOGIN_SUCCESS":
      console.log("login success");
      return {
        ...state,
        authError: null,
        user: action.user,
      };

    case "SIGNOUT_SUCCESS":
      console.log("signout success");
      return { ...state, user: null };

    case "SIGNUP_SUCCESS":
      console.log("signup success");
      return {
        ...state,
        authError: null,
        user: action.user,
      };

    case "SIGNUP_ERROR":
      console.log("signup error");
        error = action.err.response
        ? action.err.response.data.message
        : action.err.message;
      return {
        ...state,
        authError: error,
      };

    default:
      return state;
  }
};

export default authReducer;
