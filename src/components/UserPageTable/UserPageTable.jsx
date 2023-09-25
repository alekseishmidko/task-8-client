import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { Space, Table, Tag, Button } from "antd";
import { useTranslation } from "react-i18next";
import {
  fetchDeleteReview,
  fetchGetOneUserReviews,
} from "../../store/ReviewsSlice/ReviewsSlice";
const UserPageTable = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { oneUserReviews, findUserName, findUserRole } = useSelector(
    (state) => state.reviewsSlice
  );
  const { data } = useSelector((state) => state.accountSlice);
  console.log(oneUserReviews);
  const { t } = useTranslation();

  const deleteUser = (recordId) => {
    dispatch(fetchDeleteReview(recordId)).then(() => {
      dispatch(fetchGetOneUserReviews(id));
    });
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
          style={{ maxWidth: 300 }}
        >
          {text.length > 500 ? text.slice(0, 449) + "..." : text}
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
            <span
              className="text-red-400"
              onClick={() => deleteUser(record._id)}
            >
              {t("delete")}
            </span>
          </a>
        </Space>
      ),
    },
  ];

  const isReq =
    data.role === "superadmin" ||
    (data.role === "admin" && findUserRole === "user");

  React.useEffect(() => {
    dispatch(fetchGetOneUserReviews(id));
  }, [dispatch]);
  return (
    <div className="w-full mt-20 pt-2">
      {isReq && (
        <div className="">
          <Button
            type="text"
            className="pb-2 ml-2 mb-3 font-semibold"
            onClick={() => navigate("create")}
          >
            {t("CreateReviewBy")} {findUserName}
          </Button>
        </div>
      )}
      <Table
        title={() => (
          <span className="pb-2 mb-3 font-semibold">
            {" "}
            {t("reviewsOfUser")} {findUserName}
          </span>
        )}
        columns={columns}
        dataSource={oneUserReviews}
        pagination={false}
        scroll={{ y: "calc(500px)", x: "calc(700px)" }}
        size="middle"
      />
    </div>
  );
};

export default UserPageTable;
