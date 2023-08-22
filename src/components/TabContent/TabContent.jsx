import React from "react";
import { Tabs } from "antd";
import CardReview from "../CardReview/CardReview";
const TabContent = () => {
  const optionsArr = ["Latest", "Popular"];
  const LatestArr = [{ key: 1, title: "first", description: "desc" }];
  return (
    <div className="flex justify-center items-center ">
      <div className="w-full max-w-3xl">Left</div>
      <div className="w-full max-w-3xl">
        <Tabs
          size={"large"}
          defaultActiveKey="1"
          centered
          items={optionsArr.map((item, i) => {
            return {
              label: item,
              key: i,
              children: <CardReview />,
            };
          })}
        />
      </div>
      <div className="w-full max-w-3xl">Right</div>
    </div>
  );
};

export default TabContent;
