import React from "react";
import Header from "../components/Header/Header";
import { Layout, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import MenuBarReview from "../components/MenuBar/MenuBarReview";
import ReviewCard from "../components/ReviewCard/ReviewCard";
const ReviewPage = () => {
  const { allReviews } = useSelector((state) => state.reviewsSlice);
  console.log(allReviews);
  return (
    <div>
      <Header />
      <Layout>
        <MenuBarReview />
        <div className="flex flex-col  items-center min-h-screen">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4  w-4/5">
            {allReviews.map((item, index) => (
              <ReviewCard key={index} className="" {...item} />
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ReviewPage;
