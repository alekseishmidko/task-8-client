import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Row, Col, Layout } from "antd";
import {
  GoogleOutlined,
  FacebookOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { layout, validateMessages } from "../midwares/formMidwares";
import { fetchLogin } from "../store/AccountSlice/AccountSlice";
import { useNavigate } from "react-router-dom";
import RollBackButton from "../components/RollBackButton/RollBackButton";
import { AlertMessage } from "../components/AlertMessage/AlertMessage";
import { useTranslation } from "react-i18next";
import GoogleButton from "../components/GoogleButton/GoogleButton";
import GitHubButton from "../components/GitHubButton/GitHubButton";

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (formData) => {
    try {
      const res = await dispatch(fetchLogin(formData));

      if (res.error) {
        return AlertMessage("error", res.payload?.message || res.payload);
      }
      setTimeout(() => {
        navigate(-1);
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
        <Link to={"/"}>
          <RollBackButton />
        </Link>

        <Form
          layout="vertical"
          name="nest-messages"
          onFinish={onFinish}
          className="w-5/6 max-w-md mx-auto p-4 border border-gray-300 rounded-lg"
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["email"]}
            label={t("Email")}
            rules={[{ type: "email", required: true }]}
            className="mb-4"
          >
            <Input
              className="w-full p-2 border rounded"
              placeholder={t("enterYourEmail")}
            />
          </Form.Item>
          <Form.Item
            name={["password"]}
            label={t("Password")}
            rules={[{ type: "string", required: true }]}
            className="mb-4"
          >
            <Input
              className="w-full p-2 border rounded"
              type="password"
              placeholder={t("enterYourPassword")}
              allowClear
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <h4 className="mb-2">
              {t("haventAcc")}
              <Link to={"/register"} className="ml-3 text-blue-500">
                {t("createAccount")}
              </Link>
            </h4>
            <Button
              type="primary"
              htmlType="submit"
              className="w-2/3 rounded bg-blue-500 hover:bg-blue-600 mt-4"
            >
              {t("submit")}
            </Button>
          </Form.Item>
          <div className="flex justify-center  gap-3 mt-6">
            <GoogleButton />

            <GitHubButton />
          </div>
        </Form>

        {/* <Form
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
            label={t("Email")}
            rules={[{ type: "email", required: true }]}
          >
            <Input
              className="w-full p-2 border rounded"
              placeholder={t("enterYourEmail")}
            />
          </Form.Item>
          <Form.Item
            name={["password"]}
            label={t("Password")}
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
            <h4 className="mb-2">
              {t("haventAcc")}
              <Link to={"/register"} className="ml-3 text-blue-500">
                {t("createAccount")}
              </Link>
            </h4>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full rounded bg-blue-500 hover:bg-blue-600 mt-4"
            >
              {t("submit")}
            </Button>
          </Form.Item>
          <Row gutter={[16, 16]} style={{ width: 400 }}>
            <Col span={11}>
              <GoogleButton />
            </Col>
            <Col span={11}>
              <GitHubButton />
            </Col>
          </Row>
        </Form> */}
      </div>
    </Layout>
  );
};

export default LoginPage;
