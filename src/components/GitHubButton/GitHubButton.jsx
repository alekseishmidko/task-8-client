import React from "react";
import axios from "axios";
import { Button } from "antd";
// import { LoginSocialFacebook, LoginSocialTwitter } from "reactjs-social-login";
// import {
//   FacebookLoginButton,
//   TwitterLoginButton,
// } from "react-social-login-buttons";
import FacebookLogin from "@greatsumini/react-facebook-login";
const GitHubButton = () => {
  return (
    <>
      <FacebookLogin
        appId="1476472349804388"
        initParams={{
          version: "v10.0",
          xfbml: true,
        }}
        dialogParams={{
          response_type: "token",
        }}
        loginOptions={{
          return_scopes: true,
        }}
        onSuccess={(response) => {
          console.log("Login Success!", response);
        }}
        onFail={(error) => {
          console.log("Login Failed!", error);
        }}
        onProfileSuccess={(response) => {
          console.log("Get Profile Success!", response);
        }}
        render={({ onClick, logout }) => <Button onClick={onClick} />}
      />
    </>
  );
};
// appId="1476472349804388"
// secret 8ea01b5b3d00d8b6e8fe4f0d0c3776b0
export default GitHubButton;

// const [provider, setProvider] = React.useState("");
// const [profile, setProfile] = React.useState(null);
// const onLoginStart = React.useCallback(() => {
//   console.log(provider, profile);
// }, []);

// const onLogoutSuccess = React.useCallback(() => {
//   setProfile(null);
//   setProvider("");
//   alert("logout success");
// }, []);
//       <LoginSocialTwitter
// isOnlyGetToken
// client_id={"WWE3TjBJcGVRaUVvb0lKcUlvZ246MTpjaQ" || ""}
// redirect_uri={"https://17--task-8-netlify.netlify.app/login"}
// onLoginStart={onLoginStart}
// onResolve={({ provider, data }) => {
//   setProvider(provider);
//   setProfile(data);
// }}
// onReject={(err) => {
//   console.log(err);
// }}
// >
// <TwitterLoginButton />
// </LoginSocialTwitter>

{
  /* <LoginSocialFacebook
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
    </> */
}
