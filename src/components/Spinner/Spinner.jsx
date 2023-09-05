import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Layout, Spin } from "antd";
import { useSelector } from "react-redux";
const Spinner = () => {
  const { themeMode } = useSelector((state) => state.themeSlice);
  const spinnerStyles = {
    position: "absolute",
    top: "8%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  const antIcon = (
    <LoadingOutlined
      style={{ fontSize: 64 }}
      spin
      className="flex justify-center"
    />
  );
  return (
    <div>
      <Layout
        className=" min-h-screen"
        style={{ background: themeMode ? "white" : "black" }}
      >
        <div style={spinnerStyles}>
          <Spin
            indicator={antIcon}
            style={{ color: !themeMode ? "white" : "black" }}
          />
        </div>
      </Layout>
    </div>
  );
};

export default Spinner;
