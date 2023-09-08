import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { Space, Table, Tag, Typography, Modal } from "antd";
import { useTranslation } from "react-i18next";
const UserPageTable = () => {
  const { t } = useTranslation();
  const columns = [
    {
      title: "Title",
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
      title: "Tags",
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
          //   onClick={() => onClickRev(record._id)}
          >
            <span className="text-blue-500 ">Open and Update </span>
          </a>
          <a
          //   onClick={() => onClickRev(record._id)}
          >
            <span className="text-blue-500 ">Create new review </span>
          </a>
          <a>
            <span
              className="text-red-400"
              // onClick={showModal}
            >
              Delete
            </span>
            {/* <Modal
              title={record._id}
              open={open}
              onOk={() => handleOk(record._id)}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <p>Are you sure?</p>
            </Modal> */}
          </a>
        </Space>
      ),
    },
  ];
  return (
    <div className="w-3/4">
      <h2 className="ml-4 mb-8 text-xl">{t("reviewsOfUser")} :</h2>
      <Table columns={columns} dataSource={[]} pagination={false} />
    </div>
  );
};

export default UserPageTable;
