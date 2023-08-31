import React from "react";
import { Table, Space, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAllUsers } from "../../store/AccountSlice/AccountSlice";
import { Link } from "react-router-dom";
const AdminTable = () => {
  const dispatch = useDispatch();
  const { allUsers, data } = useSelector((state) => state.accountSlice);
  console.log(allUsers, data);
  React.useEffect(() => {
    dispatch(fetchGetAllUsers());
  }, []);
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
      render: (_, record) => (
        <Space size="middle">
          <Link to={record._id}>
            <span className=" ">Open and Update </span>
          </Link>
          <Link to={record._id}>
            <span className=" ">
              {record.role === "user"
                ? "change role to admin"
                : "change role to user"}
            </span>
          </Link>
          <a>
            <span
              className="text-red-400"
              //   onClick={showModal}
            >
              Delete
            </span>
            <Modal
              title={record._id}
              // open={open}
              // onOk={() => handleOk(record._id)}
              // confirmLoading={confirmLoading}
              // onCancel={handleCancel}
            >
              <p>Are you sure?</p>
            </Modal>
          </a>
        </Space>
      ),
    },
  ];

  const rowClassName = (record) => {
    return record.role === "superadmin" ? "text-green-400 font-semibold" : "";
  };
  return (
    <div>
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
