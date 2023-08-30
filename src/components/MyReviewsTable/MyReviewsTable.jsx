import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Space, Table, Tag, Typography, Modal } from "antd";
import {
  fetchDeleteReview,
  fetchGetMyReviews,
  fetchGetOneReview,
} from "../../store/ReviewsSlice/ReviewsSlice";
const { Text } = Typography;
const MyReviewsTable = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myReviews } = useSelector((state) => state.reviewsSlice);

  const onClickRev = (recordId) => {
    console.log(recordId);
    // dispatch(fetchGetOneReview(recordId));
    navigate(recordId);
  };
  // modal
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = (recordId) => {
    console.log(recordId, "rec Id");
    setConfirmLoading(true);
    dispatch(fetchDeleteReview(recordId));
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ["descend"],
    },
    {
      title: "Group",
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
      title: "Content",
      dataIndex: "content",
      key: "content",
      render: (text) => (
        <Text ellipsis={true} style={{ maxWidth: 300 }}>
          {text}
        </Text>
      ),
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag.length === 8) {
              color = "volcano";
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => onClickRev(record._id)}>
            <span className="text-blue-500 ">Open and Update </span>
          </a>
          <a>
            <span className="text-red-400" onClick={showModal}>
              Delete
            </span>
            <Modal
              title={record._id}
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
  React.useEffect(() => {
    dispatch(fetchGetMyReviews());
  }, [dispatch]);
  return (
    <div>
      <Table columns={columns} dataSource={myReviews} pagination={false} />
    </div>
  );
};

export default MyReviewsTable;

// {record.title}
