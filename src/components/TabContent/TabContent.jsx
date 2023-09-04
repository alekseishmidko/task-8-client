import React from "react";
import { Carousel, Tabs } from "antd";
import CardReview from "../CardReview/CardReview";
import { PopularArr, LatestArr, contentStyle } from "./TabContentUtils";
import { useSelector } from "react-redux";
import ReviewCard from "../ReviewCard/ReviewCard";

const TabContent = () => {
  const optionsArr = ["Latest", "Popular"];

  const onChange = (currentSlide) => {};
  const { last6Reviews, pop6Reviews, isLoading } = useSelector(
    (state) => state.reviewsSlice
  );
  if (isLoading === "loading") <h1>Loading...</h1>;
  return (
    // <div className="w-full max-w-3xl">
    <Tabs
      size={"large"}
      defaultActiveKey="1"
      centered
      className="flex flex-col justify-center "
      items={optionsArr.map((item, i) => {
        return {
          label: item,
          key: i,
          children:
            item === "Latest" ? (
              <Carousel autoplay afterChange={onChange}>
                {last6Reviews.map((item, index) => (
                  <div
                    key={item.key}
                    className="flex flex-col justify-center items-center flex-grow"
                  >
                    <CardReview {...item} />
                    {/* <ReviewCard {...item} /> */}

                    <div style={contentStyle} key={index}></div>
                  </div>
                ))}
              </Carousel>
            ) : (
              <Carousel autoplay>
                {pop6Reviews.map((item) => (
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
