import React from "react";
import { Carousel, Tabs } from "antd";
import CardReview from "../CardReview/CardReview";
import { PopularArr, LatestArr, contentStyle } from "./TabContentUtils";
const TabContent = () => {
  const optionsArr = ["Latest", "Popular"];

  const onChange = (currentSlide) => {};

  return (
    // <div className="w-full max-w-3xl">
    <Tabs
      size={"large"}
      defaultActiveKey="1"
      centered
      items={optionsArr.map((item, i) => {
        return {
          label: item,
          key: i,
          children:
            item === "Latest" ? (
              <Carousel autoplay afterChange={onChange}>
                {LatestArr.map((item) => (
                  <div key={item.key}>
                    <CardReview {...item} />

                    <div style={contentStyle} key={item.key}></div>
                  </div>
                ))}
              </Carousel>
            ) : (
              <Carousel autoplay>
                {PopularArr.map((item) => (
                  <div key={item.key}>
                    <CardReview {...item} />
                    <div style={contentStyle} key={item.key}></div>
                  </div>
                ))}
              </Carousel>
            ),
        };
      })}
    />
    // </div>
  );
};

export default TabContent;
