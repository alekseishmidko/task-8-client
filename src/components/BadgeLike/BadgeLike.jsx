import React from "react";
import { Badge } from "antd";
import { HeartFilled, HeartOutlined, LikeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetAllLikes,
  fetchHandleLike,
} from "../../store/CommentsSlice/CommentsSlice";
import {
  fetchGetAllReviews,
  fetchGetOneReview,
} from "../../store/ReviewsSlice/ReviewsSlice";
const BadgeLike = ({ count, _id }) => {
  const { data } = useSelector((state) => state.accountSlice);
  const { themeMode } = useSelector((state) => state.themeSlice);
  const { allLikes } = useSelector((state) => state.commentsSlice);

  const userId = data?._id;
  const reviewId = _id;
  function findObjectInArray(array, userId, reviewId) {
    // Используем метод массива some() для поиска объекта, который соответствует условиям
    return array.some(
      (item) => item.userId === userId && item.reviewId === reviewId
    );
  }
  const isLiked = findObjectInArray(allLikes, userId, reviewId);
  // console.log(allLikes, userId, reviewId);
  const dispatch = useDispatch();
  const handleLike = async () => {
    if (data !== null) {
      await dispatch(fetchHandleLike(_id));
      console.log(_id);
      setTimeout(() => {
        const parameters = "";
        dispatch(fetchGetAllReviews({ parameters }));
        dispatch(fetchGetAllLikes());
      }, 600);
    }
  };

  return count > 0 ? (
    <Badge
      style={{ fontSize: 8 }}
      count={count}
      overflowCount={10}
      color={themeMode === false ? "#fff" : ""}
      className="cursor-pointer"
      onClick={handleLike}
    >
      <HeartFilled
        disabled={data === null}
        style={{
          fontSize: 21,
          color: isLiked === true ? "lightGold" : "",
          marginLeft: "4px",
          marginBottom: "4px",
        }}
      />
    </Badge>
  ) : (
    <HeartFilled
      disabled={data === null}
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
