import React from "react";
import axios from "axios";
import { Button } from "antd";
import { LoginSocialFacebook, LoginSocialTwitter } from "reactjs-social-login";
import {
  FacebookLoginButton,
  TwitterLoginButton,
} from "react-social-login-buttons";
const GitHubButton = () => {
  const [provider, setProvider] = React.useState("");
  const [profile, setProfile] = React.useState(null);
  const onLoginStart = React.useCallback(() => {
    console.log(provider, profile);
  }, []);

  const onLogoutSuccess = React.useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);
  return (
    <>
      <LoginSocialFacebook
        appId={"1476472349804388" || ""}
        fieldsProfile={
          "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
        }
        onLoginStart={onLoginStart}
        onLogoutSuccess={onLogoutSuccess}
        redirect_uri={"https://17--task-8-netlify.netlify.app/login"}
        onResolve={({ provider, data }) => {
          setProvider(provider);
          setProfile(data);
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <FacebookLoginButton />
      </LoginSocialFacebook>

      <LoginSocialTwitter
        isOnlyGetToken
        client_id={"WWE3TjBJcGVRaUVvb0lKcUlvZ246MTpjaQ" || ""}
        redirect_uri={"https://17--task-8-netlify.netlify.app/login"}
        onLoginStart={onLoginStart}
        onResolve={({ provider, data }) => {
          setProvider(provider);
          setProfile(data);
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <TwitterLoginButton />
      </LoginSocialTwitter>
    </>
  );
};
// appId="1476472349804388"
// secret 8ea01b5b3d00d8b6e8fe4f0d0c3776b0
export default GitHubButton;
// import { FacebookProvider, LoginButton } from "react-facebook";
{
  /* <FacebookProvider appId="1476472349804388">
  <LoginButton
    scope="email"
    onError={handleError}
    onSuccess={handleSuccess}
  >
    <Button> FaceBook</Button>
  </LoginButton>
</FacebookProvider>
</>
); */
}
