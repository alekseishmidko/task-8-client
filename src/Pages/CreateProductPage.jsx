import React from "react";
import { Layout } from "antd";
import Header from "../components/Header/Header";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner/Spinner";
import ProductForm from "../components/ProductForm/ProductForm";
import { RollbackOutlined } from "@ant-design/icons";
const CreateProductPage = () => {
  const { data, authLoading } = useSelector((state) => state.accountSlice);
  if (authLoading === "loading") {
    return <Spinner />;
  }
  return (
    <>
      <Header />
      <Layout>
        <ProductForm />
      </Layout>
    </>
  );
};

export default CreateProductPage;
