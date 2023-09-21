import React from "react";
import axios from "axios";
import { Button } from "antd";
import { LoginSocialFacebook } from "reactjs-social-login";

import { AlertMessage } from "../AlertMessage/AlertMessage";
import { useDispatch } from "react-redux";
import { fetchSignFacebook } from "../../store/AccountSlice/AccountSlice";
import { useNavigate } from "react-router-dom";
const GitHubButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [provider, setProvider] = React.useState("");
  const [profile, setProfile] = React.useState(null);
  const onLoginStart = React.useCallback(async (tokenResponse) => {
    if (tokenResponse.accessToken) {
      try {
        const userInfoResponse = await axios.get(
          "https://graph.facebook.com/v12.0/me",
          {
            params: {
              fields: "id,name,email", // Укажите необходимые поля
            },
            headers: {
              Authorization: `Bearer ${tokenResponse.accessToken}`,
            },
          }
        );

        if (userInfoResponse.status === 200) {
          const userInfo = userInfoResponse.data;
          const res = await dispatch(fetchSignFacebook(userInfo));
          if (res.error) {
            return AlertMessage("error", res.payload.message);
          }
          setTimeout(() => {
            navigate(-1);
          }, 750);
        } else {
          console.error("Не удалось получить информацию о пользователе");
        }
      } catch (error) {
        console.error(
          "Произошла ошибка при запросе информации о пользователе",
          error
        );
      }
    }
  }, []);

  return (
    <>
      <LoginSocialFacebook
        appId={"1476472349804388" || ""}
        fieldsProfile={"id,first_name,last_name,middle_name,name,email"}
        onLoginStart={onLoginStart}
        redirect_uri={"https://18--task-8-netlify.netlify.app/login"}
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
          style={{
            backgroundColor: "#1877F2",
            color: "white",
            marginLeft: 2,
            paddingRight: 10,
            paddingLeft: 10,
          }}
        >
          Facebook
        </Button>
      </LoginSocialFacebook>
    </>
  );
};

export default GitHubButton;
