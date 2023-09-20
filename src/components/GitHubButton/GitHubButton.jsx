import React from "react";
import axios from "axios";
import { Button } from "antd";
import { LoginSocialFacebook } from "reactjs-social-login";
import FacebookOutlined from "@ant-design/icons";
import { AlertMessage } from "../AlertMessage/AlertMessage";
const GitHubButton = () => {
  const [provider, setProvider] = React.useState("");
  const [profile, setProfile] = React.useState(null);
  const onLoginStart = React.useCallback(async () => {
    console.log(provider, profile);

    try {
      const userInfoResponse = await axios.get(
        "https://graph.facebook.com/v12.0/me",
        {
          params: {
            fields: "id,name,email", // Укажите необходимые поля
          },
          headers: {
            // Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );

      if (userInfoResponse.status === 200) {
        const userInfo = userInfoResponse.data;
        console.log(userInfo);

        // const res = await dispatch(fetchSignFacebook(userInfo));
        // if (res.error) {
        //   return AlertMessage("error", res.payload.message);
        // }
      } else {
        console.error("Не удалось получить информацию о пользователе");
      }
    } catch (error) {
      console.error(
        "Произошла ошибка при запросе информации о пользователе",
        error
      );
    }
  }, []);

  const onLogoutSuccess = React.useCallback(() => {
    setProfile(null);
    setProvider("");
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
        <Button
          type="default"
          icon={<FacebookOutlined color="red" />}
          style={{
            backgroundColor: "#1877F2",
            color: "white",
            marginLeft: 3,
          }}
        >
          Facebook
        </Button>
      </LoginSocialFacebook>
    </>
  );
};

export default GitHubButton;
// appId="1476472349804388"
// secret 8ea01b5b3d00d8b6e8fe4f0d0c3776b0
