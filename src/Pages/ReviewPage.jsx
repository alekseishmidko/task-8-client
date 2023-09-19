import React from "react";
import Header from "../components/Header/Header";
import { Layout, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import MenuBarReview from "../components/MenuBar/MenuBarReview";
import ReviewCard from "../components/ReviewCard/ReviewCard";
import { useTranslation } from "react-i18next";
const ReviewPage = () => {
  const { t } = useTranslation();
  const { allReviews } = useSelector((state) => state.reviewsSlice);
  const { themeMode } = useSelector((state) => state.themeSlice);
  console.log(allReviews);
  return (
    <div>
      <Header />
      <Layout>
        <MenuBarReview />
        <div className="flex justify-center mt-4">
          <h2
            style={{ color: !themeMode ? "white" : "" }}
            className="font-semibold text-lg"
          >
            {t("reviews")}
          </h2>
        </div>
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
