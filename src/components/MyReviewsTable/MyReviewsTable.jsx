import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { Space, Table, Tag, Typography, Modal, Rate } from "antd";
import {
  fetchDeleteReview,
  fetchGetMyReviews,
  fetchGetOneReview,
} from "../../store/ReviewsSlice/ReviewsSlice";
import { useTranslation } from "react-i18next";
const { Text } = Typography;
const MyReviewsTable = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myReviews, allUnicTags } = useSelector((state) => state.reviewsSlice);
  const { t } = useTranslation();
  // console.log(myReviews);
  const onClickRev = (recordId) => {
    // dispatch(fetchGetOneReview({ recordId }));
    navigate(recordId);
  };
  // modal
  // const showModal = () => {
  //   setOpen(true);
  // };
  const deleteReview = (recordId) => {
    console.log(recordId, "rec Id");
    dispatch(fetchDeleteReview(recordId));
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      dispatch(fetchGetMyReviews());
    }, 1500);
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
      title: t("avRating"),
      dataIndex: "averageRatingFive",
      key: "averageRatingFive",
      render: (text) => (
        <Rate
          allowHalf
          disabled
          value={text}
          style={{ width: 120, fontSize: 16 }}
        />
      ),
      sorter: (a, b) => a.averageRatingFive - b.averageRatingFive,
    },
    {
      title: t("group"),
      dataIndex: "group",
      key: "group",
      filters: [
        {
          text: "movie",
          value: "movie",
        },
        {
          text: "books",
          value: "books",
        },
        {
          text: "music",
          value: "music",
        },
        {
          text: "games",
          value: "games",
        },
      ],
      onFilter: (value, record) => record.group.indexOf(value) === 0,
    },
    {
      title: t("product"),
      dataIndex: "productTitle",
      key: "productTitle",
    },
    {
      title: t("content"),
      dataIndex: "content",
      key: "content",
      render: (text) => (
        <ReactMarkdown
          className="prose"
          ellipsis={true}
          style={{ maxWidth: 150 }}
        >
          {text.length > 300 ? text.slice(0, 297) + "..." : { text }}
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
        <Space size="small">
          <a onClick={() => onClickRev(record._id)}>
            <span className="text-blue-500 ">{t("openAndUpdate")} </span>
          </a>
          <a>
            <span
              className="text-red-400"
              onClick={() => deleteReview(record._id)}
            >
              {t("delete")}
            </span>
          </a>
        </Space>
      ),
    },
  ];
  React.useEffect(() => {
    dispatch(fetchGetMyReviews());
  }, [dispatch]);
  return (
    <div>
      <Table
        columns={columns}
        dataSource={myReviews}
        pagination={false}
        scroll={{ x: "calc(700px + 10%)" }}
        size="middle"
      />
    </div>
  );
};

export default MyReviewsTable;
