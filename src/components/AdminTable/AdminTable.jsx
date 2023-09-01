import React from "react";
import { Table, Space, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeleteUser,
  fetchGetAllUsers,
  fetchHandleRoleUser,
} from "../../store/AccountSlice/AccountSlice";
import { Link } from "react-router-dom";

const AdminTable = () => {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.accountSlice);
  const data = JSON.parse(localStorage.getItem("data"));
  // console.log(allUsers, "data", data.email);
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
            <a>
              <span
                className=" text-green-600 "
                onClick={() => handleChangeRole(record._id)}
              >
                {record.role === "user" ? "Assign admin" : "Assign user"}
              </span>
            </a>
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
      <h2 className="ml-4 mb-8">Admin panel</h2>
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
