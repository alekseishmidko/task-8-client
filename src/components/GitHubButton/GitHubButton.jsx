import React from "react";
import { Button } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import axios from "axios";
import TwitterLogin from "react-twitter-login-button";
const GitHubButton = () => {
  const authHandler = (err, data) => {
    console.log(err, data);
  };
  return (
    <>
      <TwitterLogin
        authCallback={authHandler}
        consumerKey={"potU3YuI37rOobkkohTNjbPw0"}
        consumerSecret={"lasjxSutTVmSTVryzzvKRoVQ0gyDKxmPiTyS5QskWE1lhGvMo7"}
      >
        <Button> Twitter</Button>
      </TwitterLogin>
    </>
  );
};

export default GitHubButton;
// import { LoginSocialLinkedin } from "reactjs-social-login"
// const [provider, setProvider] = React.useState("");
// const [profile, setProfile] = React.useState(null);
// const clientID = "77cw33ntfxo8y9";
// const clientSecret = "tkGC1iqeMhloCger";
// const callbackURL = "http://localhost:5173/login";
// console.log(provider, profile, window.location.href);
// const onLoginStart = React.useCallback(() => {}, []);
{
  /* <LoginSocialLinkedin
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
</LoginSocialLinkedin> */
}
