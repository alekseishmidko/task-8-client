import { Button, Form, Input } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { AlertMessage } from "../AlertMessage/AlertMessage";
import {
  fetchCreateComment,
  fetchGetReviewComments,
} from "../../store/CommentsSlice/CommentsSlice";
import socketIO from "socket.io-client";
import instance from "../../axios";
const CommentBlock = () => {
  const baseURL = instance.defaults.baseURL;
  // socket logics
  const socket = socketIO.connect(baseURL);
  //
  const { reviewComments, commentsLoading } = useSelector(
    (state) => state.commentsSlice
  );
  const dispatch = useDispatch();
  const data = useSelector((state) => state.accountSlice.data);
  const reviewId = useParams().id;
  const onFinish = async (formData) => {
    try {
      formData.reviewId = reviewId;

      const res = await dispatch(fetchCreateComment(formData));
      socket.emit("comment", { formData });
      if (res.error.message === "Rejected") {
        return AlertMessage("error", res.payload.message);
      }
      dispatch(fetchGetReviewComments(reviewId));
    } catch (error) {
      console.error("error while fetchCreateComment:", error);
    }
  };

  React.useEffect(() => {
    socket.on("responce", (data) => {
      console.log(data);
      dispatch(fetchGetReviewComments(reviewId));
    });
    dispatch(fetchGetReviewComments(reviewId));
  }, []);
  if (commentsLoading === "loading") {
    return <Spinner />;
  }
  return (
    <div className="flex items-center justify-center w-full max-w-4xl p-4 ">
      <div className="bg-white rounded-lg shadow-lg p-4 mt-4 w-full">
        <h2 className="text-lg font-semibold mb-2">Commentaries: </h2>
        <div className="mb-4">
          <Form onFinish={onFinish}>
            <Form.Item
              name={["comment"]}
              rules={[{ type: "string", required: true }]}
            >
              <Input.TextArea
                allowClear
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                rows="3"
                placeholder="Leave your comment"
              />
            </Form.Item>
            <Form.Item>
              <Button
                disabled={data === null}
                type="primary"
                htmlType="submit"
                className="bg-blue-500 text-white  px-4 mt-2 rounded-md hover:bg-blue-600 focus:outline-none"
                // onClick={onFinish}
              >
                {"Submit"}
              </Button>
            </Form.Item>
          </Form>
          {reviewComments.map((item, index) => (
            <div key={index} className="bg-gray-100 rounded-md p-2 my-4">
              <p className="text-gray-800 font-bold">
                {item.userId.name} <span className="font-semibold">write:</span>
              </p>
              <p className="text-gray-600">{item.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentBlock;
