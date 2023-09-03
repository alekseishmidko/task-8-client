import React from "react";
import Header from "../components/Header/Header";
import { Layout, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard/ProductCard";
import { fetchGetAllProducts } from "../store/ProductSlice/ProductSlice";
import MenuBar from "../components/MenuBar/MenuBar";
const ProductPage = () => {
  // const data = JSON.parse(localStorage.getItem("data"));

  const { allProducts } = useSelector((state) => state.productsSlice);

  return (
    <div>
      <Header />
      <Layout>
        <MenuBar />
        <div className="flex flex-col  items-center min-h-screen">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4  w-4/5">
            {allProducts.map((item, index) => (
              <ProductCard key={index} className="" {...item} />
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ProductPage;
