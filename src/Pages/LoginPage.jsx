import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Row, Col, Layout } from "antd";
import {
  GoogleOutlined,
  FacebookOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { layout, validateMessages } from "../midwares/formMidwares";
import { fetchLogin } from "../store/AccountSlice/AccountSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { themeMode } = useSelector((state) => state.themeSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (formData) => {
    console.log("Received values of form: ", formData);
    try {
      dispatch(fetchLogin(formData));
      setTimeout(() => {
        navigate("/");
      }, 650);
    } catch (error) {
      console.error("error while fetchLogin:", error);
    }
  };

  return (
    <Layout>
      {" "}
      <div
        style={{
          // background: "grey",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Link to={"/"}>
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
            <h4 className="mb-2">
              Haven't Acc?
              <Link to={"/register"} className="ml-3 text-blue-500">
                Create account
              </Link>
            </h4>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full rounded bg-blue-500 hover:bg-blue-600 mt-4"
            >
              Submit
            </Button>
          </Form.Item>
          <Row gutter={[16, 16]} style={{ width: 400 }}>
            <Col span={11}>
              <Button
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
            </Col>
            <Col span={11}>
              <Button
                type="default"
                block
                icon={<FacebookOutlined style={{ marginBottom: 2 }} />}
                style={{ backgroundColor: "#1877F2", color: "white" }}
              >
                Facebook
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Layout>
  );
};

export default LoginPage;

{
  /* <Form
        name="login"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{
          width: 400,
          padding: 20,
          border: "1px solid #ccc",
          borderRadius: 8,
        }}
      >
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            onClick={onFinish}
            type="default"
            htmlType="button"
            style={{ width: "100%", background: "#1877F2" }}
          >
            Log in
          </Button>
        </Form.Item>
        <Row gutter={[16, 16]} style={{ width: 400 }}>
          <Col span={11}>
            <Button
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
          </Col>
          <Col span={11}>
            <Button
              type="default"
              block
              icon={<FacebookOutlined style={{ marginBottom: 2 }} />}
              style={{ backgroundColor: "#1877F2", color: "white" }}
            >
              Facebook
            </Button>
          </Col>
        </Row>
      </Form> */
}
