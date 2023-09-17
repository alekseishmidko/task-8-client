import React from "react";
import TabContent from "../components/TabContent/TabContent";
import Header from "../components/Header/Header";
import TagCloud from "../components/TagCloud/TagCloud";
import { Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAllReviews } from "../store/ReviewsSlice/ReviewsSlice";
import Spinner from "../components/Spinner/Spinner";
import { fetchGetLikes } from "../store/AccountSlice/AccountSlice";
import { fetchGetAllLikes } from "../store/CommentsSlice/CommentsSlice";

const MainPage = () => {
  const { isLoading, allUnicTags } = useSelector((state) => state.reviewsSlice);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const parameters = "";
    dispatch(fetchGetAllReviews({ parameters }));
    dispatch(fetchGetAllLikes());
  }, [dispatch]);

  if (isLoading === "loading") <Spinner />;
  return (
    <>
      <Header />
      <Layout className=" min-h-screen">
        <div className="flex justify-center items-center">
          <div className="w-2/3">
            <TabContent />

            <div className="m-auto flex justify-center">
              <TagCloud tags={allUnicTags} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default MainPage;
