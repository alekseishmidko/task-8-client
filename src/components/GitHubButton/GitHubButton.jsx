import React from "react";
import { Button } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import axios from "axios";
import { LoginSocialLinkedin } from "reactjs-social-login";
const GitHubButton = () => {
  const [provider, setProvider] = React.useState("");
  const [profile, setProfile] = React.useState(null);
  const clientID = "77cw33ntfxo8y9";
  const clientSecret = "tkGC1iqeMhloCger";
  const callbackURL = "http://localhost:5173/login";
  console.log(provider, profile, window.location.href);
  const onLoginStart = React.useCallback(() => {}, []);
  return (
    <>
      <LoginSocialLinkedin
        isOnlyGetToken
        client_id={clientID || ""}
        client_secret={clientSecret || ""}
        redirect_uri={callbackURL}
        onLoginStart={onLoginStart}
        onResolve={({ provider, data }) => {
          setProvider(provider);
          setProfile(data);
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <Button> linkedIn</Button>
      </LoginSocialLinkedin>
    </>
  );
};

export default GitHubButton;
