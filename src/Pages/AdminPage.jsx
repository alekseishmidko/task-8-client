import React from "react";
import { Layout, Table } from "antd";
import AdminTable from "../components/AdminTable/AdminTable";

const AdminPage = () => {
  return (
    <Layout>
      <h1>Users</h1>
      <AdminTable/>
    </Layout>
  );
};

export default AdminPage;
