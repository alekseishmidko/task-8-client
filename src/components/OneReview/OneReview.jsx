import React from "react";
import {
  Card,
  Button,
  Input,
  Form,
  Select,
  Slider,
  Modal,
  Rate,
  message,
  Image,
  Tag,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUpdateReview,
  fetchGetOneReview,
  fetchHandleReviewsRating,
} from "../../store/ReviewsSlice/ReviewsSlice";
import { groupColor } from "./oneReviewProps";
import ReactMarkdown from "react-markdown";
import Spinner from "../Spinner/Spinner";
import { useTranslation } from "react-i18next";
import BadgeLike from "../BadgeLike/BadgeLike";
import { Link, useNavigate, useParams } from "react-router-dom";
import { StarOutlined } from "@ant-design/icons";

const OneReview = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const { t } = useTranslation();
  const { Option } = Select;
  const { id } = useParams();
  const dispatch = useDispatch();
  const { themeMode } = useSelector((state) => state.themeSlice);
  const { oneReview, averageRatingFive, isOneReviewLoading, reviewsRatings } =
    useSelector((state) => state.reviewsSlice);

  const { data } = useSelector((state) => state.accountSlice);
  if (isOneReviewLoading === "loading") {
    return <Spinner />;
  }

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

  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleOk = async () => {
    setConfirmLoading(true);
    form.validateFields().then((values) => {
      console.log(values);
      dispatch(fetchUpdateReview({ id, values }));
    });
    setTimeout(() => {
      dispatch(fetchGetOneReview({ id }));
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const isDis =
    (data !== null && data._id === oneReview.userId) ||
    (data !== null && data.role !== "user");
  const onClickLike = () => {
    setTimeout(() => {
      dispatch(fetchGetOneReview({ id }));
    }, 3350);
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto p-4 xs:max-w-lg sm:max-w-4xl md:max-w-4xl lg:max-w-4xl xl:max-w-4xl mx-auto p-4 mt-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden relative">
          <Card
            className="w-full  border shadow-lg "
            style={{ color: !themeMode ? "white" : "" }}
          >
            <Image.PreviewGroup
              preview={{
                onChange: (current, prev) =>
                  console.log(`current index: ${current}, prev index: ${prev}`),
              }}
              items={oneReview.images}
            >
              <div className="w-full flex justify-center">
                <Image
                  style={{ height: "45vh" }}
                  src={
                    oneReview?.images[0] ||
                    "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  }
                />
              </div>
            </Image.PreviewGroup>
            <div className="p-4 ">
              <h2 className="text-xl font-semibold  my-4">
                <ReactMarkdown className="prose">
                  {oneReview.title}
                </ReactMarkdown>
              </h2>
              <div className="">
                {oneReview.tags.map((item, index) => (
                  <span key={index}>
                    <Tag bordered={false} key={index} className=" mr-2">
                      {item}
                    </Tag>
                  </span>
                ))}
              </div>
              <span
                className={`absolute top-2 right-5 border mt-4 rounded-l-full ${
                  groupColor[oneReview.group]
                } px-3 py-1 text-sm font-semibold  mr-1`}
              >
                {oneReview.group}
                <span className="pl-2 text-lg font-bold text-red-700">
                  {oneReview.rating}
                </span>
              </span>

              <h2 className="text-xl font-semibold  my-4 ">
                <ReactMarkdown className="prose">
                  {oneReview.content}
                </ReactMarkdown>
              </h2>
              <div className="px-2 pt-8">
                <span className="text-base font-semibold">
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
              <div className="mt-4 flex items-center justify-between">
                <span className="font-semibold">
                  <span>
                    {t("averageRating")}: {averageRatingFive.toFixed(1)}{" "}
                    <StarOutlined />
                  </span>
                </span>
                <div className="p-4 rounded-md my-4 sm:p-2 flex justify-end">
                  <Button disabled={!isDis} onClick={showModal}>
                    Edit
                  </Button>
                  <Modal
                    okType="default"
                    title="Title"
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                  >
                    <Form
                      form={form}
                      initialValues={{
                        title: oneReview.title,
                        group: oneReview.group,
                        content: oneReview.content,
                        rating: oneReview.rating || 0,
                      }}
                      layout="vertical"
                    >
                      <Form.Item label="Title" name="title">
                        <Input defaultValue={oneReview.title} />
                      </Form.Item>
                      <Form.Item label="Group" name="group">
                        <Select defaultValue={oneReview.group}>
                          {arr.map((item, index) => (
                            <Option key={index} value={item}>
                              {item}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item label="Content" name="content">
                        <Input.TextArea defaultValue={oneReview.content} />
                      </Form.Item>
                      <Form.Item
                        label=" "
                        name="rating"
                        className="mt-4 px-1"
                        defaultValue={oneReview.rating || 0}
                      >
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
                      </Form.Item>
                    </Form>
                  </Modal>
                </div>
              </div>
              <div onClick={onClickLike}>
                <BadgeLike _id={oneReview._id} count={oneReview.likes} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default OneReview;
{
  /* <div className="flex items-center justify-center w-full max-w-4xl p-4">
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
              <BadgeLike count={oneReview.likes} _id={oneReview._id} />
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
      </div> */
}
