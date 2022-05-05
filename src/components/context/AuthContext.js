import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
const INITIAL_STATE = {
  user: {
    _id: "61fbd32461150c41ec015c7a",
    profilePicture: "",
    coverPicture: "",
    followers: [],
    following: [],
    isAdmin: false,
    username: "Rudhra",
    email: "shambho@gmail.com",
    desc: "Hey there, we all gonna die",
    city: "Bangalore",
    from: "India",
    relationship: 2,
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
