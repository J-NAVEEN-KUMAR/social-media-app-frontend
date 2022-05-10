import axios from "axios";
import { toast } from "react-toastify";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("auth/login", userCredentials);
    window.localStorage.setItem("user", JSON.stringify(res.data));
    toast.success("Login successful ...!", {
      icon: "🚀",
    });
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "LOGIN_Failure", payload: error });
    if (error.response.status === 400) toast.error(error.response.data);
    window.location.replace("/register");
  }
};
