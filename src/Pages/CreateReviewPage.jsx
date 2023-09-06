import React from "react";
import ReviewForm from "../components/ReviewForm/ReviewForm";
import { Layout } from "antd";
import Header from "../components/Header/Header";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner/Spinner";
const CreateReviewPage = () => {
  const { data, authLoading } = useSelector((state) => state.accountSlice);
  if (authLoading === "loading") {
    return <Spinner />;
  }
  //   if (data === null) {
  //     return <h1>222</h1>;
  //   }
  return (
    <>
      <Header />
      <Layout>
        <ReviewForm />
      </Layout>
    </>
  );
};

export default CreateReviewPage;
