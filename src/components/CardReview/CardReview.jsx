import React from "react";
import ReactMarkdown from "react-markdown";
import truncate from "lodash.truncate";
import { Avatar, Card, Tag, List, Rate, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchHandleReviewsRating,
  fetchGetAllReviews,
} from "../../store/ReviewsSlice/ReviewsSlice";
import BadgeLike from "../BadgeLike/BadgeLike";
const CardReview = ({
  images,
  title,
  group,
  tags,
  rating,
  content,
  avgRatingFive,
  _id,
}) => {
  //
  const data = JSON.parse(localStorage.getItem("data")) || 0;
  //
  const dispatch = useDispatch();
  const truncatedContent = truncate(content, { length: 150 });
  const { reviewsRatings } = useSelector((state) => state.reviewsSlice);
  const filtered = reviewsRatings.filter((item) => {
    if (data._id === null) {
      return;
    } else return item.userId === data._id;
  });
  const handleRatingFive = (id, value) => {
    console.log(id, { ratingFive: value });
    const res = dispatch(fetchHandleReviewsRating({ id, value }));
    if (!res) {
      return message.error(res.payload.message);
    }
    setTimeout(() => {
      const parameters = "";
      dispatch(fetchGetAllReviews({ parameters }));
    }, 980);
  };
  return (
    <>
      <div className=" bg-gray-100 rounded-lg shadow-lg p-6 md:p-8 lg:p-10">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">
          <ReactMarkdown className="prose">{` ${title}`}</ReactMarkdown>
        </h2>
        <p className="text-gray-600 mb-2">{group}</p>
        <img
          alt="example"
          src={
            images[0] ||
            "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          }
        />
        <p
          className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed my-4"
          style={{ height: "80px" }}
        >
          <ReactMarkdown className="prose">{truncatedContent}</ReactMarkdown>
        </p>

        <div className="flex flex-wrap">
          {tags.map((tag, index) => (
            <span key={index}>
              <Tag
                bordered={false}
                key={index}
                className="bg-blue-200 rounded-full px-2 py-1  text-red-500  "
              >
                {tag}
              </Tag>
            </span>
          ))}
        </div>
        <div className="pt-6 pt-4 flex justify-between mb-2">
          {data !== null && data !== 0 && (
            <span className=" text-base font-bold">
              <Rate
                defaultValue={
                  filtered.find((item) => item.reviewId === _id)?.ratingFive ||
                  0
                }
                disabled={data === null || data === 0}
                onChange={(value) => handleRatingFive(_id, value)}
              />
            </span>
          )}

          <BadgeLike count={33} />
        </div>
        <span className=" text-base font-semibold mt-6 pl-2 pt-4">
          average rating: {avgRatingFive === null ? 0 : avgRatingFive}
        </span>
      </div>
    </>
  );
};

export default CardReview;
