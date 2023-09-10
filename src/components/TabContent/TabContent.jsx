import { Carousel, Tabs } from "antd";

import { contentStyle } from "./TabContentUtils";
import { useSelector } from "react-redux";
import ReviewCard from "../ReviewCard/ReviewCard";
import { useTranslation } from "react-i18next";
import Spinner from "../Spinner/Spinner";
import BadgeLike from "../BadgeLike/BadgeLike";
const TabContent = () => {
  const { TabPane } = Tabs;
  const { t } = useTranslation();
  const optionsArr = [t("latest"), t("popular")];
  const onChange = (currentSlide) => {};
  const { last6Reviews, pop6Reviews, isLoading } = useSelector(
    (state) => state.reviewsSlice
  );
  const contentStyle = {
    background: "gray",
    padding: "10px",
    borderRadius: "8px",
  };
  if (isLoading === "loading") <Spinner />;
  return (
    <div className="w-full">
      <Tabs defaultActiveKey="1" centered className="lg:w-4/5 xl:w-3/5 mx-auto">
        {optionsArr.map((item, i) => (
          <TabPane tab={item} key={i}>
            <div className="py-6">
              {item === "latest" ? (
                <Carousel afterChange={onChange} effect="fade" dots={false}>
                  {last6Reviews.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col justify-center items-center flex-grow"
                    >
                      <ReviewCard {...item} />
                      <div style={contentStyle} key={item.key}></div>
                    </div>
                  ))}
                </Carousel>
              ) : (
                <Carousel autoplay>
                  {pop6Reviews.map((item) => (
                    <div key={item.key}>
                      <ReviewCard {...item} />
                      <div style={contentStyle} key={item.key}></div>
                    </div>
                  ))}
                </Carousel>
              )}
            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default TabContent;
