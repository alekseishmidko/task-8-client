import { Rate, message, Tag } from "antd";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetAllReviews,
  fetchHandleReviewsRating,
} from "../../store/ReviewsSlice/ReviewsSlice";
import BadgeLike from "../BadgeLike/BadgeLike";

const ReviewCard = ({
  image,
  group,
  title,
  avgRatingFive,
  content,
  _id,
  tags,
  images,
}) => {
  const { data } = useSelector((state) => state.accountSlice) || 0;
  const dispatch = useDispatch();
  const { themeMode } = useSelector((state) => state.themeSlice);
  //
  const { reviewsRatings } = useSelector((state) => state.reviewsSlice);
  const filtered = reviewsRatings.filter((item) => {
    if (data === null) {
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
    <div>
      <div className="w-3/4 sm:w-full mt-4 ">
        <div
          className="max-w-sm rounded overflow-hidden border my-3 mr-2"
          style={{ color: !themeMode ? "white" : "" }}
        >
          <img
            className="w-full"
            style={{ height: "140px" }}
            src={
              images[1] ||
              "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            }
            alt={title}
          />
          <div className="px-6 py-4">
            <ReactMarkdown className="prose font-semibold text-xl mb-2">
              {title.length > 50 ? title.slice(0, 50) + "..." : title}
            </ReactMarkdown>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              {group}
            </span>
          </div>
          <div className="px-6 py-4" style={{ height: "140px" }}>
            <ReactMarkdown ellipsis={true} className="prose  text-xl mb-2">
              {content.length > 150 ? content.slice(0, 150) + "..." : content}
            </ReactMarkdown>
          </div>
          <div className="px-6 py-4" style={{ height: "40px" }}>
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

          <div className="px-6 py-4">
            <span className=" text-base font-semibold">
              <Rate
                defaultValue={
                  filtered.find((item) => item.reviewId === _id)?.ratingFive ||
                  0
                }
                disabled={data === null || data === 0}
                onChange={(value) => handleRatingFive(_id, value)}
              />
            </span>
          </div>
          <div className="px-6 py-4 flex justify-between">
            <span className=" text-base font-semibold">
              average rating: {avgRatingFive === null ? 0 : avgRatingFive}
            </span>
            <BadgeLike count={3} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
