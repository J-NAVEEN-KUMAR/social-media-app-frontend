import { useContext, useRef } from "react";
import styled from "styled-components";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../components/context/AuthContext";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoginWrapper = styled.div`
  width: 70%;
  height: 70%;
  display: flex;
`;
const LoginLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const LoginLogo = styled.h3`
  font-size: 50px;
  font-weight: 800;
  color: #128c7e;
  margin-bottom: 10px;
`;
const LoginDesc = styled.div`
  font-size: 24px;
`;
const LoginRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const LoginBox = styled.form`
  height: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const LoginInput = styled.input`
  height: 50px;
  border-radius: 10px;
  border: 1px solid gray;
  font-size: 18px;
  padding-left: 20px;

  &: focus {
    outline: none;
  }
`;
const LoginButton = styled.button`
  height: 50px;
  border-radius: 10px;
  border: none;
  background-color: #34b7f1;
  color: white;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
`;
// const LoginForgot = styled.span`
//   text-align: center;
//   color: #34b7f1;
//   cursor: pointer;
// `;
const LoginRegister = styled.button`
  width: 60%;
  align-self: center;
  height: 50px;
  border-radius: 10px;
  border: none;
  background-color: #25d366;
  color: black;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
`;

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  // console.log(isFetching);
  // console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  // console.log(user);
  return (
    <LoginContainer>
      <LoginWrapper>
        <LoginLeft>
          <LoginLogo>NJ Connect</LoginLogo>
          <LoginDesc>
            Connect with your friends and the world around you on{" "}
            <b style={{ color: "#128c7e" }}>NJ Connect</b>
          </LoginDesc>
        </LoginLeft>
        <LoginRight>
          <LoginBox onSubmit={handleSubmit}>
            <LoginInput
              placeholder="Email"
              type="email"
              ref={email}
              required
            ></LoginInput>
            <LoginInput
              placeholder="Password"
              type="password"
              ref={password}
              minLength="6"
              required
            ></LoginInput>
            <LoginButton type="submit" disabled={isFetching}>
              {isFetching ? <CircularProgress color="success" /> : "Log In"}
            </LoginButton>
            {/* <LoginForgot>Forgot Password?</LoginForgot> */}
            <LoginRegister disabled={isFetching}>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "white" }}
              >
                Create a New Account
              </Link>
            </LoginRegister>
          </LoginBox>
        </LoginRight>
      </LoginWrapper>
    </LoginContainer>
  );
};

export default Login;
