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
      <FacebookProvider appId="123456789">
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

export default GitHubButton;
{
  /* <TwitterLogin
authCallback={authHandler}
consumerKey={"WWE3TjBJcGVRaUVvb0lKcUlvZ246MTpjaQ"}
consumerSecret={"OsLnOC8MH1HPqA-EznCEDVFKChwg1TJNnujMN4QGLlpQfBMA5g"}
>
<Button> Twitter</Button>
</TwitterLogin> */
}
// API Key
// pZDjiLJaqHHx2Vx7cgzjjXpLu
// API Key Secret
// n3mG7D6Fqv12yFtXEmUZotDDeBZrjkCRR1Tljb8eO

// // const authHandler = (err, data) => {
//   window.open("", "_blank").focus();
//   console.log(err, data);
// };
// const onClick = async () => {
//   const authHeader = {
//     oauth_callback: "https://17--task-8-netlify.netlify.app/login",
//     oauth_consumer_key: "pZDjiLJaqHHx2Vx7cgzjjXpLu",
//     oauth_nonce: "ea9ec8429b68d6b77cd5600adbbb0456",
//     oauth_signature: "F1Li3tvehgcraF8DMJ7OyxO4w9Y%3D",
//     oauth_signature_method: "HMAC-SHA1",
//     oauth_timestamp: Date.now(),
//     oauth_version: "1.0",
//   };
//   const header = Object.entries(authHeader)
//     .map(([key, value]) => `${key}= ${value}`)
//     .join(",");
//   const res = await axios.post(
//     "https://api.twitter.com/oauth/request_token",
//     {
//       headers: {
//         Authorization: `OAuth ${header}`,
//       },
//       responseType: "blob",
//     }
//   );
//   const _url = window.URL.createObjectURL(res.data);
//   window.open(_url, "_blank").focus(); // window.open + focus
// };
