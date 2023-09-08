import React from "react";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Layout, message } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { layout, validateMessages } from "../midwares/formMidwares";
import { fetchRegistration } from "../store/AccountSlice/AccountSlice";
import { useNavigate } from "react-router-dom";
import { AlertMessage } from "../components/AlertMessage/AlertMessage";
import RollBackButton from "../components/RollBackButton/RollBackButton";
import { useTranslation } from "react-i18next";
const RegisterPage = () => {
  const { t } = useTranslation();
  const { themeMode } = useSelector((state) => state.themeSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (formData) => {
    try {
      const res = await dispatch(fetchRegistration(formData));
      if (res.error) {
        return AlertMessage("error", res.payload.message);
      }
      setTimeout(() => {
        navigate("/");
      }, 850);
    } catch (error) {
      console.error("error while fetchLogin:", error);
    }
  };
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Link to={-1}>
          <RollBackButton />
        </Link>

        <Form
          layout="vertical"
          name="nest-messages"
          onFinish={onFinish}
          style={{
            width: 400,
            padding: 20,
            border: "1px solid #ccc",
            borderRadius: 8,
          }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["email"]}
            label="Email"
            rules={[{ type: "email", required: true }]}
          >
            <Input
              className="w-full p-2 border rounded"
              placeholder={t("enterYourEmail")}
            />
          </Form.Item>
          <Form.Item
            name={["name"]}
            label="Name"
            rules={[{ type: "string", required: true }]}
          >
            <Input
              className="w-full p-2 border rounded"
              placeholder={t("enterYourName")}
            />
          </Form.Item>
          <Form.Item
            name={["password"]}
            label="Password"
            rules={[{ type: "string", required: true }]}
          >
            <Input
              className="w-full p-2 border rounded"
              type="password"
              placeholder={t("enterYourPassword")}
              allowClear
            />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full rounded bg-blue-500 hover:bg-blue-600 mt-4"
            >
              {t("submit")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default RegisterPage;
