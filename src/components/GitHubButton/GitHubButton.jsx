import React from "react";
import axios from "axios";
import { Button } from "antd";
import { FacebookProvider, LoginButton } from "react-facebook";
const GitHubButton = () => {
  function handleSuccess(response) {
    console.log(response.status);
  }

  function handleError(error) {
    console.log(error);
  }
  return (
    <>
      <FacebookProvider appId="1476472349804388">
        <LoginButton
          scope="email"
          onError={handleError}
          onSuccess={handleSuccess}
        >
          <Button> FaceBook</Button>
        </LoginButton>
      </FacebookProvider>
    </>
  );
};
// secret 8ea01b5b3d00d8b6e8fe4f0d0c3776b0
export default GitHubButton;
