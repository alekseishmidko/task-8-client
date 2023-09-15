import React from "react";
import { Button } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import axios from "axios";
import { LoginSocialGithub } from "reactjs-social-login";
const GitHubButton = () => {
  const [provider, setProvider] = React.useState("");
  const [profile, setProfile] = React.useState(null);
  const clientID = "Iv1.4b9ddc9580f72838";
  const clientSecret = "4639938eeac58cb7c4c998830eef87bea3712969";
  const callbackURL = window.location.href;
  console.log(provider, profile);
  const onLoginStart = React.useCallback(() => {
    console.log(provider, profile);

    axios
      .get("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${profile.access_token}`,
        },
        params: {
          scope: "user:email",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //   const onLogoutSuccess = React.useCallback(() => {
  //     setProfile(null);
  //     setProvider("");
  //     alert("logout success");
  //   }, []);
  return (
    <LoginSocialGithub
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
      <Button
        type="default"
        block
        icon={<GithubOutlined style={{ marginBottom: 2 }} />}
        style={{ backgroundColor: "#1877F2", color: "white" }}
      >
        GitHub
      </Button>
    </LoginSocialGithub>
  );
};

export default GitHubButton;
// const githubConfig = {
//   clientID: "ac99e8446355ba05f5ae",
//   clientSecret: "b15cfbcc84cf740db46afac7bfa16e19ff655ee2",
//   callbackURL: "YOUR_CALLBACK_URL",
// };

// React.useEffect(() => {
//     // http://localhost:3000/?code=a0f666a8e58381c999b2
//     const queryString = window.location.search;
//   }, []);
//   const loginWithGitHub = async () => {
//     const clientID = "ac99e8446355ba05f5ae";
//     window.location.assign(
//       "https://github.com/login/oauth/authorize?client_id=" + clientID
//     );
//   };
// <Button
//   onClick={}
//   type="default"
//   block
//   icon={<GithubOutlined style={{ marginBottom: 2 }} />}
//   style={{ backgroundColor: "#1877F2", color: "white" }}
// >
//   GitHub
// </Button>
// Private key
// SHA256:G2lcy+W3C2a5C23Jrt9LOsOVTCjwwNlmnijq00krYEE=
// Iv1.4b9ddc9580f72838
// 4639938eeac58cb7c4c998830eef87bea3712969
