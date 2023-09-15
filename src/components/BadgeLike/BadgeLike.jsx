import React from "react";
import { Badge } from "antd";
import { HeartOutlined, LikeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchHandleLike } from "../../store/CommentsSlice/CommentsSlice";
const BadgeLike = ({ count, _id }) => {
  const { themeMode } = useSelector((state) => state.themeSlice);
  const dispatch = useDispatch();
  const handleLike = () => {
    dispatch(fetchHandleLike(_id));
    console.log(count, "count");
  };
  return count > 0 ? (
    <Badge
      style={{ fontSize: 8 }}
      count={count}
      overflowCount={10}
      color={themeMode === false ? "#fff" : "black"}
      className="cursor-pointer"
      onClick={handleLike}
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
      className="cursor-pointer"
      onClick={handleLike}
    />
  );
};

export default BadgeLike;
