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
            <div className="py-3">
              {item === "latest" ? (
                <div className="grid grid-cols-1 gap-4">
                  <Carousel afterChange={onChange} effect="fade" dots={true}>
                    {last6Reviews.map((item, index) => (
                      <div key={index}>
                        <div className="w-full h-full flex items-center justify-center">
                          <ReviewCard {...item} />
                        </div>
                      </div>
                    ))}
                  </Carousel>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  <Carousel afterChange={onChange} effect="fade" dots={true}>
                    {pop6Reviews.map((item, index) => (
                      <div
                        key={index}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <ReviewCard {...item} />
                        <div style={contentStyle} key={index}></div>
                      </div>
                    ))}
                  </Carousel>
                </div>
              )}
            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default TabContent;
