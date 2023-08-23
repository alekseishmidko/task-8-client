import React from "react";
import TabContent from "../components/TabContent/TabContent";
import Header from "../components/Header/Header";
import TagCloud from "../components/TagCloud/TagCloud";

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
      <div className="flex justify-center items-center">
        <div className="w-1/6">
          <TagCloud tags={tags} />
        </div>
        <div className="w-1/2">
          <TabContent />
        </div>
        <div className="w-1/4">Right</div>
      </div>
    </>
  );
};

export default MainPage;
