import Header from "../components/Header/Header";
import Layout from "antd/es/layout/layout";
import OneProduct from "../components/OneProduct/OneProduct";
const OneProductPage = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <Layout className="min-h-screen">
          <OneProduct className="" />
        </Layout>
      </div>
    </>
  );
};

export default OneProductPage;
