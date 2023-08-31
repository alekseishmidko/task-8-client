import React from "react";
import { Table, Space, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeleteUser,
  fetchGetAllUsers,
} from "../../store/AccountSlice/AccountSlice";
import { Link } from "react-router-dom";

const AdminTable = () => {
  const dispatch = useDispatch();
  const { allUsers, data } = useSelector((state) => state.accountSlice);
  console.log(allUsers, "data", data.email);
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
    console.log(recordId, "rec Id");
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
  const columns = [
    {
      title: "name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",

      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ["descend"],
    },
    {
      title: "role",
      dataIndex: "role",
      key: "role",
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
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.role !== "superadmin" &&
        record.email !== data.email && (
          <Space size="middle">
            <Link to={record._id}>
              <span className=" text-blue-500">Open reviews </span>
            </Link>
            <Link to={record._id}>
              <span className=" text-green-600 ">
                {record.role === "user" ? "Assign admin" : "Assign user"}
              </span>
            </Link>
            <a>
              <span className="text-red-600" onClick={showModal}>
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

  const rowClassName = (record) => {
    return record.role === "superadmin" ? " font-semibold" : "";
  };

  return (
    <div className="w-3/4">
      <Table
        columns={columns}
        dataSource={allUsers}
        pagination={false}
        rowClassName={rowClassName}
      />
    </div>
  );
};

export default AdminTable;
