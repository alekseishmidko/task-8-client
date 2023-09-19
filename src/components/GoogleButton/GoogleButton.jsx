import React from "react";
import { Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchSignGoogle } from "../../store/AccountSlice/AccountSlice";
import { useNavigate } from "react-router-dom";
import { AlertMessage } from "../AlertMessage/AlertMessage";
const GoogleButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse, "tokenresponce");
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
          const res = await dispatch(fetchSignGoogle(userInfo));
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
    },
  });
  return (
    <Button
      onClick={() => login()}
      type="default"
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

// id 113207383771076086984
// "ya29.a0AfB_byA_s9DuXpYC7Wb3JurmhPkEftChL-ADVBXV8-zFHD92MDfeUFeQseffNOj7jT8NgdnRuS2zlXmwZWWMh-_jonYlXoWTVO0oMNGyT4UyqgnI9BeqRa929ur39R5glFhd8sKsnXJ0q7ISjqpiVHV1g54tmLNy2q0aCgYKATgSARASFQGOcNnCBNDWXUdnxE1kIltuUbjuUw0170"
