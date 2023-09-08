import React from "react";
import { RollbackOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
const RollBackButton = () => {
  const { themeMode } = useSelector((state) => state.themeSlice);
  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        color: themeMode === false ? "#fff" : "",
      }}
    >
      <RollbackOutlined style={{ transform: "scale(1.2)" }} />
    </div>
  );
};

export default RollBackButton;
