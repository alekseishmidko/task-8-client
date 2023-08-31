import React from "react";
import { Layout, Table } from "antd";
import AdminTable from "../components/AdminTable/AdminTable";
import { Link } from "react-router-dom";
import { RollbackOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
const AdminPage = () => {
  const { themeMode } = useSelector((state) => state.themeSlice);
  return (
    <Layout>
      <Link to={-1}>
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            color: themeMode === false ? "#fff" : "",
          }}
        >
          <RollbackOutlined style={{ transform: "scale(1.2)" }} />
        </div>
      </Link>
      <div className="flex justify-center items-center h-screen">
        <AdminTable />
      </div>
    </Layout>
  );
};

export default AdminPage;
