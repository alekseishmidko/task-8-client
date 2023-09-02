import React from "react";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Layout } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { layout, validateMessages } from "../midwares/formMidwares";
import { fetchRegistration } from "../store/AccountSlice/AccountSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
const RegisterPage = () => {
  const { data, login } = useAuth();
  const { themeMode } = useSelector((state) => state.themeSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (formData) => {
    console.log("Received values of form: ", formData);
    try {
      // dispatch(fetchRegistration(formData));
      const response = await axios.post("api/users/signUp", formData);
      login(response.data.user);
      setTimeout(() => {
        navigate("/");
      }, 850);
    } catch (error) {
      console.error("error while fetchLogin:", error);
    }
  };
  return (
    <Layout>
      {" "}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Link to={-1}>
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              color: themeMode === false ? "#fff" : "",
            }}
          >
            <RollbackOutlined />
          </div>
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
              placeholder="Enter your email"
            />
          </Form.Item>
          <Form.Item
            name={["name"]}
            label="Name"
            rules={[{ type: "string", required: true }]}
          >
            <Input
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
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
              placeholder="Enter your password"
              allowClear
            />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full rounded bg-blue-500 hover:bg-blue-600 mt-4"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default RegisterPage;
