import Header from "../components/Header/Header";
import Layout from "antd/es/layout/layout";
import OneProduct from "../components/OneProduct/OneProduct";
import { Link } from "react-router-dom";
import RollBackButton from "../components/RollBackButton/RollBackButton";
const OneProductPage = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <Layout className="flex justify-center items-center min-h-screen">
          <Link to={-1} className="absolute top-16 left-2 z-50">
            <RollBackButton />
          </Link>
          <OneProduct />
        </Layout>
      </div>
    </>
  );
};

export default OneProductPage;
