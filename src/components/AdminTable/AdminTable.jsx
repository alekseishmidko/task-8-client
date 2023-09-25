import React from "react";
import { Table, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeleteUser,
  fetchGetAllUsers,
  fetchHandleRoleUser,
  fetchHandleStatusUser,
} from "../../store/AccountSlice/AccountSlice";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";
const AdminTable = () => {
  const dispatch = useDispatch();
  const { allUsers, data } = useSelector((state) => state.accountSlice);
  const { t } = useTranslation();
  React.useEffect(() => {
    dispatch(fetchGetAllUsers());
  }, [dispatch]);

  const deleteUser = (recordId) => {
    dispatch(fetchDeleteUser(recordId));
    setTimeout(() => {
      dispatch(fetchGetAllUsers());
    }, 1500);
  };

  const handleChangeRole = (recordId) => {
    dispatch(fetchHandleRoleUser(recordId));
    setTimeout(() => {
      dispatch(fetchGetAllUsers());
    }, 1000);
  };
  const handleChangeStatus = (recordId) => {
    dispatch(fetchHandleStatusUser(recordId));
    setTimeout(() => {
      dispatch(fetchGetAllUsers());
    }, 1000);
  };
  const columns = [
    {
      title: t("name"),
      dataIndex: "name",
      key: "name",

      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: t("email"),
      dataIndex: "email",
      key: "email",

      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ["descend"],
    },
    {
      title: t("role"),
      dataIndex: "role",
      key: "role",
      width: 140,
      filters: [
        {
          text: "user",
          value: "user",
        },
        {
          text: "admin",
          value: "admin",
        },
        {
          text: "superadmin",
          value: "superadmin",
        },
      ],
      onFilter: (value, record) => record.role.indexOf(value) === 0,
      render: (text) => (
        <span style={{ fontWeight: text === "superadmin" ? "bold" : "normal" }}>
          {text}
        </span>
      ),
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      width: 140,
      filters: [
        {
          text: "active",
          value: "active",
        },
        {
          text: "disabled",
          value: "disabled",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (text) => (
        <span style={{ fontWeight: text === "disabled" ? "normal" : "bold" }}>
          {text}
        </span>
      ),
    },

    {
      title: t("action"),
      key: "action",
      render: (_, record) =>
        record.role !== "superadmin" &&
        record.email !== data.email && (
          <Space size="middle">
            <Link to={record._id}>
              <span className=" text-blue-500">{t("openReviews")} </span>
            </Link>
            <a>
              <span
                className=" text-green-600 "
                onClick={() => handleChangeRole(record._id)}
              >
                {record.role === "user" ? t("assignAdmin") : t("assignUser")}
              </span>
            </a>
            <a>
              <span
                className=" text-orange-600 "
                onClick={() => handleChangeStatus(record._id)}
              >
                {record.status === "active" ? (
                  <span>{t("makeDisabled")}</span>
                ) : (
                  <span>{t("makeActive")}</span>
                )}
              </span>
            </a>
            <a>
              <span
                className="text-red-600"
                onClick={() => deleteUser(record._id)}
              >
                {t("delete")}
              </span>
            </a>
          </Space>
        ),
    },
  ];

  const rowClassName = (record) => {
    return record.role === "superadmin" ? " font-semibold" : "";
  };

  return (
    <div className="w-full">
      <h2 className="ml-4 mb-8 font-semibold">{t("adminPanel")}</h2>
      <Table
        columns={columns}
        dataSource={allUsers}
        pagination={false}
        rowClassName={rowClassName}
        scroll={{ x: "calc(700px + 10%)" }}
        size="middle"
      />
    </div>
  );
};

export default AdminTable;
