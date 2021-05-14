import { Button } from "@material-ui/core";
import React from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import { auth, provider } from "../firebase";

function Login({ loader }) {
  const handleGoogleLogin = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((err) => {
      alert("error", err?.message);
    });
  };

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img src="https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png" />
        {loader ? (
          <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
        ) : (
          <>
            <h1>Sign in to Slack</h1>
            <p style={{ opacity: 0.6, fontWeight: 600, marginTop: 5 }}>
              Sign in and start chatting!
            </p>
            <Button onClick={handleGoogleLogin}>Sign in with Google</Button>
          </>
        )}
      </LoginInnerContainer>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
  background-color: #f6f6f6;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const LoginInnerContainer = styled.div`
  text-align: center;
  padding: 100px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  > img {
    object-fit: contained;
    height: 200px;
    margin-bottom: 20px;
  }
  > button {
    margin-top: 30px;
    background-color: #17ad6e;
    text-transform: inherit;
    color: white;

    :hover {
      background-color: #086d43;
    }
  }
`;
