import React from "react";
import Header from "../components/Header/Header";
import { Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard/ProductCard";
const ProductPage = () => {
  return (
    <div>
      <Header />
      <Layout className="flex flex-col justify-center items-center min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-2 w-4/5">
          <ProductCard className="mt-2 mb-2" />
          <ProductCard className="mt-2 mb-2" />
          <ProductCard className="mt-2 mb-2" />
          <ProductCard className="mt-2 mb-2" />
          <ProductCard className="mt-2 mb-2" />
          <ProductCard className="mt-2 mb-2" />
          <ProductCard className="mt-2 mb-2" />
        </div>
      </Layout>
    </div>
  );
};

export default ProductPage;
