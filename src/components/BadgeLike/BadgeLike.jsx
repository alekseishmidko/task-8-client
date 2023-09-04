import React from "react";
import { Badge } from "antd";
import { HeartOutlined, LikeOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const BadgeLike = ({ count }) => {
  const { themeMode } = useSelector((state) => state.themeSlice);
  return count > 0 ? (
    <Badge
      style={{ fontSize: 8 }}
      count={count}
      overflowCount={10}
      color={themeMode === false ? "#fff" : "black"}
    >
      <HeartOutlined
        style={{
          fontSize: 21,
          color: themeMode === false ? "#fff" : "",
          marginLeft: "4px",
          marginBottom: "4px",
        }}
      />
    </Badge>
  ) : (
    <HeartOutlined
      style={{
        fontSize: 21,
        color: themeMode === false ? "#fff" : "",
        marginLeft: "4px",
        marginBottom: "4px",
      }}
    />
  );
};

export default BadgeLike;
