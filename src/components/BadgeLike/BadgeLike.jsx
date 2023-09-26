import React from "react";
import { Badge } from "antd";
import { HeartFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetAllLikes,
  fetchHandleLike,
} from "../../store/CommentsSlice/CommentsSlice";
import axios from "../../axios";
import { fetchGetAllReviews } from "../../store/ReviewsSlice/ReviewsSlice";
const BadgeLike = ({ count, _id }) => {
  const { data } = useSelector((state) => state.accountSlice);
  const { themeMode } = useSelector((state) => state.themeSlice);

  const [statusLike, setStatusLike] = React.useState(false);
  const userId = data?._id;
  const reviewId = _id;

  const dispatch = useDispatch();
  const handleLike = async () => {
    if (data !== null) {
      await dispatch(fetchHandleLike(_id));

      setTimeout(() => {
        const parameters = "";
        dispatch(fetchGetAllReviews({ parameters }));
        dispatch(fetchGetAllLikes());
      }, 600);
    }
  };
  React.useEffect(() => {
    const fetchStatusLike = async () => {
      try {
        const res = await axios.post("api/likes", {
          userId,
          reviewId,
        });
        setStatusLike(res.data);
      } catch (error) {
        console.error("Error fetching like status:", error);
      }
    };

    fetchStatusLike();
  }, []);

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
          color: statusLike == true ? "darkRed" : "",
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
