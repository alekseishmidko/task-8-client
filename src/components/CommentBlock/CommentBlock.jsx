import { Button, Form, Input, Layout, Space } from "antd";
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
import { useTranslation } from "react-i18next";
const CommentBlock = () => {
  const { t } = useTranslation();
  const baseURL = instance.defaults.baseURL;
  // socket logics
  const socket = socketIO.connect(baseURL);
  const { reviewComments, commentsLoading } = useSelector(
    (state) => state.commentsSlice
  );
  const dispatch = useDispatch();
  const data = useSelector((state) => state.accountSlice.data);
  const { themeMode } = useSelector((state) => state.themeSlice);
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
    <>
      <div
        className="flex items-center justify-center w-full max-w-4xl px-5 border-red-500 rounded-lg shadow-lg"
        style={{
          color: themeMode ? "" : "white",
          background: !themeMode ? "" : "white",
        }}
      >
        <div className=" rounded-lg mt-4 w-full  ">
          <h2 className="text-lg font-semibold mb-2">{t("commentaries")}: </h2>
          <div className="mb-4">
            <Form onFinish={onFinish}>
              <Form.Item
                name={["comment"]}
                rules={[{ type: "string", required: true }]}
              >
                <Input.TextArea
                  allowClear
                  className="w-full px-3 py-2  focus:outline-none focus:border-blue-500"
                  rows="3"
                  placeholder={t("leaveYourComment")}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  disabled={data === null}
                  type="primary"
                  htmlType="submit"
                  className="bg-blue-500 text-white  px-4 mt-2 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  {t("submit")}
                </Button>
              </Form.Item>
            </Form>
            {reviewComments.map((item, index) => (
              <div
                key={index}
                className=" rounded-md p-2 my-4  border border-gray-300"
                style={{
                  color: !themeMode ? "white" : "",
                  background: !themeMode ? "" : "",
                }}
              >
                <p className=" font-bold">
                  {item.userId.name}
                  <span className="pl-2 font-semibold">{t("write")}:</span>
                </p>
                <p className="font-semibold">{item.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentBlock;
