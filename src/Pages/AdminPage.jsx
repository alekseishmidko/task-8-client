import React from "react";
import { Layout, Table } from "antd";
import AdminTable from "../components/AdminTable/AdminTable";
import { Link } from "react-router-dom";
import { RollbackOutlined } from "@ant-design/icons";
import RollBackButton from "../components/RollBackButton/RollBackButton";
import Header from "../components/Header/Header";
const AdminPage = () => {
  return (
    <>
      <Header />
      <Layout>
        <Link to={-1} className="absolute top-14 left-1 z-50">
          <RollBackButton />
        </Link>

        <div className="flex justify-center items-center h-screen">
          <AdminTable />
        </div>
      </Layout>
    </>
  );
};

export default AdminPage;
