import React from "react";
import TabContent from "../components/TabContent/TabContent";
import Header from "../components/Header/Header";
import TagCloud from "../components/TagCloud/TagCloud";
import Comments from "../components/Comments/Comments";
import { Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAllReviews } from "../store/ReviewsSlice/ReviewsSlice";
const MainPage = () => {
  const { isLoading } = useSelector((state) => state.reviewsSlice);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchGetAllReviews());
  }, [dispatch]);
  const tags = [
    "#1",
    "#2",
    "#three",
    "#four",
    "#five",
    "#six",
    "#seven",
    "#12",
    "#13",
  ];

  if (isLoading === "loading") <h1>Loading...</h1>;
  return (
    <>
      <Header />
      <Layout className=" min-h-screen">
        <div className="flex justify-center items-center">
          <div className="w-1/2">
            <TabContent />
            <TagCloud tags={tags} />
          </div>
          {/* <div className="w-1/2"></div> */}
          {/* <div className="w-1/4">
          <Comments />
        </div> */}
        </div>
      </Layout>
    </>
  );
};

export default MainPage;
