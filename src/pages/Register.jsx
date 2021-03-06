import axios from "axios";
import { useRef, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
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
  height: 400px;
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

const LoginRegister = styled.button`
  width: 90%;
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
const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    // console.log(password.current.value, passwordAgain.current.value);
    e.preventDefault();
    setLoading(true);
    if (passwordAgain.current.value !== password.current.value) {
      // passwordAgain.current.setCustomValidity("Passwords don't match");
      toast.error("Passwords don't match");
      setLoading(false);
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post(`${process.env.REACT_APP_API}/auth/register`, user);
        toast.success("Registration successful ...! Please Login.", {
          icon: "????",
        });
        setLoading(false);
        history.push("/login");
        // console.log(history);
      } catch (error) {
        if (error.response.status === 400) toast.error(error.response.data);
        setLoading(false);
        console.log(error);
      }
    }
  };

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
              placeholder="Username"
              ref={username}
              required
            ></LoginInput>
            <LoginInput
              placeholder="Email"
              ref={email}
              type="email"
              required
            ></LoginInput>
            <LoginInput
              placeholder="Password"
              minLength="6"
              ref={password}
              type="password"
              required
            ></LoginInput>
            <LoginInput
              placeholder="Confirm Password"
              ref={passwordAgain}
              minLength="6"
              type="password"
              required
            ></LoginInput>
            <LoginButton type="submit">
              {loading ? <CircularProgress color="success" /> : "Sign Up"}
            </LoginButton>
            <LoginRegister>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "white" }}
              >
                Already have an account? Login-In
              </Link>
            </LoginRegister>
          </LoginBox>
        </LoginRight>
      </LoginWrapper>
    </LoginContainer>
  );
};

export default Register;
