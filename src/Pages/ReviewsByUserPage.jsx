import React from "react";
import Header from "../components/Header/Header";
import { Layout, Table } from "antd";
import AdminTable from "../components/AdminTable/AdminTable";
import { Link } from "react-router-dom";
import { RollbackOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import UserPageTable from "../components/UserPageTable/UserPageTable";
import RollBackButton from "../components/RollBackButton/RollBackButton";
const ReviewsByUserPage = () => {
  const { themeMode } = useSelector((state) => state.themeSlice);
  return (
    <>
      <Header />
      <Layout>
        <Link to={-1} className="absolute top-16 left-2 z-50">
          <RollBackButton />
        </Link>
        <div className="flex justify-center items-center h-screen">
          <UserPageTable />
        </div>
      </Layout>
    </>
  );
};

export default ReviewsByUserPage;
