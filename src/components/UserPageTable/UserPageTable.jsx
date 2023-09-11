import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { Space, Table, Tag, Typography, Modal, Button } from "antd";
import { useTranslation } from "react-i18next";
import {
  fetchDeleteReview,
  fetchGetOneUserReviews,
} from "../../store/ReviewsSlice/ReviewsSlice";
const UserPageTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { oneUserReviews } = useSelector((state) => state.reviewsSlice);
  console.log(oneUserReviews);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleOk = (recordId) => {
    setConfirmLoading(true);
    console.log(recordId);
    dispatch(fetchDeleteReview(recordId));
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      dispatch(fetchGetOneUserReviews(id));
    }, 1000);
  };
  const columns = [
    {
      title: t("title"),
      dataIndex: "title",
      key: "title",
      render: (text) => (
        <ReactMarkdown
          style={{ maxWidth: 100 }}
          ellipsis={true}
          className="prose"
        >
          {text}
        </ReactMarkdown>
      ),
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ["descend"],
    },
    {
      title: t("group"),
      dataIndex: "group",
      key: "group",
      filters: [
        {
          text: t("movies"),
          value: "movies",
        },
        {
          text: t("books"),
          value: "books",
        },
        {
          text: t("music"),
          value: "music",
        },
        {
          text: t("games"),
          value: "games",
        },
      ],
      onFilter: (value, record) => record.group.indexOf(value) === 0,
    },
    {
      title: t("content"),
      dataIndex: "content",
      key: "content",
      render: (text) => (
        <ReactMarkdown
          className="prose"
          ellipsis={true}
          style={{ maxWidth: 200 }}
        >
          {text}
        </ReactMarkdown>
      ),
    },
    {
      title: t("tags"),
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 4 ? "geekblue" : "green";
            if (tag.length >= 7) {
              color = "volcano";
            }
            if (tag.length >= 10) {
              color = "orange";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: t("action"),
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate(`record/${record._id}`)}>
            <span className="text-blue-500 ">Open and Update </span>
          </a>

          <a>
            <span className="text-red-400" onClick={showModal}>
              Delete
            </span>
            <Modal
              okType="default"
              title={record.title}
              open={open}
              onOk={() => handleOk(record._id)}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <p>Are you sure?</p>
            </Modal>
          </a>
        </Space>
      ),
    },
  ];
  const id = useParams().id;

  React.useEffect(() => {
    dispatch(fetchGetOneUserReviews(id));
  }, [dispatch]);
  return (
    <div className="w-3/4">
      <h2 className="ml-4 mb-8 text-xl">{t("reviewsOfUser")} :</h2>
      <Button className="pb-2 mb-3" onClick={() => navigate("create")}>
        `Create a review using the selected user name (${id})`
      </Button>
      <Table columns={columns} dataSource={oneUserReviews} pagination={false} />
    </div>
  );
};

export default UserPageTable;
