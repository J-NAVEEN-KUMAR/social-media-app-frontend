const AuthReducer = (state, action) => {
  console.log("AUTHREDUCER ===>", {
    ...state.user.userInfo,
    following: [...state.user.userInfo.following, action.payload],
  });
  console.log("STATE ===>", state);
  console.log("UNFOLLOW ===>", {
    ...state.user.userInfo,
    following: state.user.userInfo.following.filter(
      (following) => following !== action.payload
    ),
  });
  console.log("ACTION.PAYLOAD ===>", action);

  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
      };
    case "FOLLOW":
      return {
        ...state.user,
        user: {
          ...state.user,
          following: [...state.user.userInfo.following, action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state.user,
        user: {
          ...state.user,
          following: state.user.userInfo.following.filter(
            (following) => following !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};

export default AuthReducer;
