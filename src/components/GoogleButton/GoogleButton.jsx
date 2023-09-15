import React from "react";
import { Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
const GoogleButton = () => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      try {
        const userInfoResponse = await axios.get(
          "https://www.googleapis.com/oauth2/v2/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        if (userInfoResponse.status === 200) {
          const userInfo = userInfoResponse.data;
          console.log(userInfo);
        } else {
          console.error("Не удалось получить информацию о пользователе");
        }
      } catch (error) {
        console.error(
          "Произошла ошибка при запросе информации о пользователе",
          error
        );
      }
      // хешировать токен и использовать вместо пароля
    },
  });
  return (
    <Button
      onClick={() => login()}
      type="default"
      block
      icon={<GoogleOutlined />}
      style={{
        backgroundColor: "#DB4437",
        color: "white",
        marginLeft: 3,
      }}
    >
      Google
    </Button>
  );
};

export default GoogleButton;
// {
/* <GoogleLogin
onSuccess={(credentialResponse) => {
  console.log(credentialResponse);
}}
onError={() => {
  console.log("Login Failed");
}}
/> */
// }
