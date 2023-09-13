import React from "react";
import {
  Card,
  Button,
  Input,
  Form,
  Select,
  Slider,
  Rate,
  message,
  Image,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUpdateReview,
  fetchGetOneReview,
  fetchHandleReviewsRating,
} from "../../store/ReviewsSlice/ReviewsSlice";

import ReactMarkdown from "react-markdown";
import Spinner from "../Spinner/Spinner";
import { useTranslation } from "react-i18next";
import BadgeLike from "../BadgeLike/BadgeLike";
import { Link, useNavigate, useParams } from "react-router-dom";
import CommentBlock from "../CommentBlock/CommentBlock";
import { AlertMessage } from "../AlertMessage/AlertMessage";
const OneReview = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = React.useState(false);
  const { t } = useTranslation();
  const { Option } = Select;
  const { id } = useParams();
  const dispatch = useDispatch();

  const { oneReview, averageRatingFive, isOneReviewLoading, reviewsRatings } =
    useSelector((state) => state.reviewsSlice);

  const { data } = useSelector((state) => state.accountSlice);
  const filtered = reviewsRatings.filter((item) => {
    if (data === null) {
      return;
    } else return item.userId === data._id;
  });

  const handleRatingFive = (id, value) => {
    console.log(id, { ratingFive: value });
    const res = dispatch(fetchHandleReviewsRating({ id, value }));
    if (!res) {
      return message.error(res.payload.message);
    }
    setTimeout(() => {
      dispatch(fetchGetOneReview({ id }));
    }, 980);
  };

  const _id = oneReview._id;
  const arr = ["books", "music", "movies", "games"];
  const handleEditClick = () => {
    // if (isDis) {
    setIsEditing(true);
  };
  // else {
  // return AlertMessage(
  //   "error",
  //   "you don't have enough rights to make changes for this review"
  // );
  // }
  // };

  const handleSaveClick = () => {
    form.validateFields().then((values) => {
      console.log(values);
      dispatch(fetchUpdateReview({ id, values }));
      setIsEditing(false);
      dispatch(fetchGetOneReview({ id }));
    });
  };
  // console.log(id, oneReview, id === oneReview._id);
  // const isDis = oneReview.userId === data._id || data.role !== "user";
  // console.log(isDis);
  return (
    <>
      <div className="flex items-center justify-center w-full max-w-4xl p-4">
        <Card className="w-full border shadow-lg">
          <div className="mx-auto my-6 flex justify-center">
            <Image.PreviewGroup
              preview={{
                onChange: (current, prev) =>
                  console.log(`current index: ${current}, prev index: ${prev}`),
              }}
              items={
                oneReview.images ||
                "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              }
            >
              <Image
                className=" rounded-3xl"
                height={400}
                src={
                  oneReview.images[0] ||
                  "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                }
              />
            </Image.PreviewGroup>
          </div>
          <div className="ml-4 flex-grow">
            <Form
              form={form}
              initialValues={{
                title: oneReview.title,
                group: oneReview.group,
                content: oneReview.content,
                rating: oneReview.rating || 0,
              }}
              layout="vertical"
              disabled={!isEditing}
            >
              {isEditing ? (
                <Form.Item label="Title" name="title">
                  <Input defaultValue={oneReview.title} />
                </Form.Item>
              ) : (
                <div className="p-4 rounded-md border my-4 sm:p-2">
                  <h2>
                    {" "}
                    <ReactMarkdown className="prose">
                      {oneReview.title}
                    </ReactMarkdown>
                  </h2>
                </div>
              )}
              {isEditing ? (
                <Form.Item label="Group" name="group">
                  <Select defaultValue={oneReview.group}>
                    {arr.map((item, index) => (
                      <Option key={index} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              ) : (
                <div className="p-4 rounded-md  my-4 sm:p-2">
                  <p> {oneReview.group}</p>
                </div>
              )}

              {isEditing ? (
                <Form.Item label="Content" name="content">
                  <Input.TextArea defaultValue={oneReview.content} />
                </Form.Item>
              ) : (
                <div className="p-4 rounded-md border my-4 sm:p-2">
                  <ReactMarkdown className="prose">
                    {oneReview.content}
                  </ReactMarkdown>
                </div>
              )}

              <Form.Item
                label=" "
                name="rating"
                className="mt-4 px-1"
                defaultValue={oneReview.rating || 0}
              >
                {!isEditing ? (
                  <span>
                    {t("authorRating")}: {oneReview.rating}
                  </span>
                ) : (
                  <Slider
                    defaultValue={oneReview.rating}
                    min={0}
                    max={10}
                    marks={{
                      0: "0",
                      2: "2",
                      4: "4",
                      6: "6",
                      8: "8",
                      10: "10",
                    }}
                    step={1}
                  />
                )}
              </Form.Item>
            </Form>
            <div className="px-6 py-4">
              <span className=" text-base font-semibold">
                <Rate
                  defaultValue={
                    filtered.find((item) => item.reviewId === _id)
                      ?.ratingFive || 0
                  }
                  disabled={data === null || data === 0}
                  onChange={(value) => handleRatingFive(_id, value)}
                />
              </span>
            </div>
            <div className="px-6 py-4 flex justify-between">
              <span className=" text-base font-semibold">
                {t("averageRating")}:
                {averageRatingFive === null ? 0 : averageRatingFive}
              </span>
              <BadgeLike count={3} />
            </div>
            {data !== null && (
              <div className="mt-4">
                {isEditing ? (
                  <Button onClick={handleSaveClick}>{t("save")}</Button>
                ) : (
                  <Button
                    disabled={
                      (oneReview.userId === data._id ||
                        data.role !== "user") === false
                    }
                    onClick={handleEditClick}
                  >
                    {t("edit")}
                  </Button>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

export default OneReview;
