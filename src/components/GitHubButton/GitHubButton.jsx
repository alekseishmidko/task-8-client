import React from "react";
import axios from "axios";
import { Button } from "antd";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
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
        redirect_uri={"http://localhost:5173/login"}
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
