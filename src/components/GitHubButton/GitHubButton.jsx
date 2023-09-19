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
        consumerKey={"WWE3TjBJcGVRaUVvb0lKcUlvZ246MTpjaQ"}
        consumerSecret={"OsLnOC8MH1HPqA-EznCEDVFKChwg1TJNnujMN4QGLlpQfBMA5g"}
      >
        <Button> Twitter</Button>
      </TwitterLogin>
    </>
  );
};

// WWE3TjBJcGVRaUVvb0lKcUlvZ246MTpjaQ id
// OsLnOC8MH1HPqA-EznCEDVFKChwg1TJNnujMN4QGLlpQfBMA5g secret
export default GitHubButton;
