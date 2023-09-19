import React from "react";
import Header from "../components/Header/Header";
import Layout from "antd/es/layout/layout";
import ReviewCard from "../components/ReviewCard/ReviewCard";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const SearchPage = () => {
  const { t } = useTranslation();
  const { searchedReviews, searchedComments } = useSelector(
    (state) => state.searchSlice
  );
  return (
    <div>
      <Header />
      <Layout>
        <div className="flex flex-col  items-center min-h-screen">
          {searchedReviews.length > 0 && (
            <h2 className="my-4 font-semibold text-lg ">
              {t("foundInAReviews")}:
            </h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4  w-4/5">
            {searchedReviews.map((item, index) => (
              <ReviewCard key={index} className="" {...item} />
            ))}
          </div>
          {searchedComments.length > 0 && (
            <h2 className="my-4 font-semibold text-lg ">
              {t("foundInAComments")}:
            </h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4  w-4/5">
            {searchedComments.map((item, index) => (
              <ReviewCard key={index} className="" {...item} />
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default SearchPage;
