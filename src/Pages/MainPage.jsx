import React from "react";
import TabContent from "../components/TabContent/TabContent";
import Header from "../components/Header/Header";
import TagCloud from "../components/TagCloud/TagCloud";
import Comments from "../components/Comments/Comments";
import { Layout } from "antd";
const MainPage = () => {
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
  return (
    <>
      <Header />
      <Layout>
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
