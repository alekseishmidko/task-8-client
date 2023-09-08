import React from "react";
import { Layout, Table } from "antd";
import AdminTable from "../components/AdminTable/AdminTable";
import { Link } from "react-router-dom";
import { RollbackOutlined } from "@ant-design/icons";
import RollBackButton from "../components/RollBackButton/RollBackButton";

const AdminPage = () => {
  return (
    <Layout>
      <Link to={-1}>
        <RollBackButton />
      </Link>

      <div className="flex justify-center items-center h-screen">
        <AdminTable />
      </div>
    </Layout>
  );
};

export default AdminPage;
