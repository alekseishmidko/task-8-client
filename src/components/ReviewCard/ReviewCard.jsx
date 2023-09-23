import { Rate, message, Tag } from "antd";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetAllReviews,
  fetchHandleReviewsRating,
} from "../../store/ReviewsSlice/ReviewsSlice";
import BadgeLike from "../BadgeLike/BadgeLike";
import { useNavigate, Link } from "react-router-dom";
import { groupColor } from "../OneProduct/oneProductProps";
import { fetchHandleLike } from "../../store/CommentsSlice/CommentsSlice";
import { StarOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
const ReviewCard = ({
  group,
  title,
  avgRatingFive,
  content,
  _id,
  tags,
  images,
  likes,
  rating,
}) => {
  const { data } = useSelector((state) => state.accountSlice) || 0;
  const { themeMode } = useSelector((state) => state.themeSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

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
    <div
      className=" w-92 h-116 rounded overflow-hidden shadow-lg my-4 mx-2"
      style={{ color: !themeMode ? "white" : "" }}
    >
      <div className="flex flex-col justify-between h-full cursor-pointer">
        <div
          className="cursor-pointer"
          onClick={() => navigate(`/reviews/${_id}`)}
        >
          <div className="flex justify-center p-2  relative">
            <img
              src={
                images[0] ||
                "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              }
              className="h-64 w-auto object-cover object-center"
              alt={title}
            />
            <span
              className={`absolute top-0 right-0  bordered  rounded-full ${groupColor[group]} px-2 py-1 text-sm font-semibold text-gray-700 `}
            >
              {group}
              <span className="text-sm font-bold text-red-700 ml-1">
                {rating}
              </span>
            </span>
          </div>

          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              <span className=" font-semibold text-2xl mb-2">
                {title.length > 30
                  ? title
                      .replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, "")
                      .slice(0, 30) + "..."
                  : title.replace(/[\*;{}=\_]/g, "")}
              </span>
            </div>
          </div>
          <div className="px-6 min-h-[24px]">
            <div className="">
              {tags.map((item, index) => (
                <span key={index}>
                  <Tag bordered={false} key={index} className=" mr-2">
                    {item}
                  </Tag>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="px-6 py-4">
          <span className="text-base font-semibold">
            <Rate
              defaultValue={
                filtered.find((item) => item.reviewId === _id)?.ratingFive || 0
              }
              disabled={data === null || data === 0}
              onChange={(value) => handleRatingFive(_id, value)}
            />
          </span>
        </div>
        <div className="px-6 py-4 flex justify-between mt-4">
          <span className="text-base font-bold">
            {t("averageRating")}:
            <span className="ml-1">
              {avgRatingFive === null ? 0 : avgRatingFive?.toFixed(1)}
            </span>
            <StarOutlined className=" p-2" />
          </span>
          <BadgeLike count={likes} _id={_id} />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
