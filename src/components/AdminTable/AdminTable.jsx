import React from "react";
import { Table, Space, Modal, Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeleteUser,
  fetchGetAllUsers,
  fetchHandleRoleUser,
  fetchHandleStatusUser,
} from "../../store/AccountSlice/AccountSlice";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { useTranslation } from "react-i18next";
const AdminTable = () => {
  const dispatch = useDispatch();
  const { allUsers, data } = useSelector((state) => state.accountSlice);
  const { t } = useTranslation();
  React.useEffect(() => {
    dispatch(fetchGetAllUsers());
  }, [dispatch]);

  //   modal
  const [open, setOpen] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = (recordId) => {
    setConfirmLoading(true);
    dispatch(fetchDeleteUser(recordId));
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      dispatch(fetchGetAllUsers());
    }, 1000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  //
  const handleChangeRole = (recordId) => {
    dispatch(fetchHandleRoleUser(recordId));
    setTimeout(() => {
      dispatch(fetchGetAllUsers());
    }, 1000);
  };
  const handleChangeStatus = (recordId) => {
    console.log(recordId);
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
                {record.status === "active"
                  ? t("makeDisabled")
                  : t("makeActive")}
              </span>
            </a>
            <a>
              <span className="text-red-600" onClick={showModal}>
                {t("delete")}
              </span>
              <Modal
                okType="default"
                title={t("delete")}
                open={open}
                onOk={() => handleOk(record._id)}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
              >
                <p>{t("areYouSure")}</p>
              </Modal>
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
      {/* <div className="overflow-x-auto"> */}
      <Table
        columns={columns}
        dataSource={allUsers}
        pagination={false}
        rowClassName={rowClassName}
        scroll={{ x: "calc(700px + 10%)" }}
        size="middle"
      />
      {/* </div> */}
    </div>
  );
};

export default AdminTable;
