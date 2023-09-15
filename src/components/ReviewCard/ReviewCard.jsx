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
      className="relative w-92 h-116 rounded overflow-hidden shadow-lg my-4 mx-2"
      style={{ color: !themeMode ? "white" : "" }}
    >
      <div className="flex flex-col justify-between h-full cursor-pointer">
        <div
          className="cursor-pointer"
          onClick={() => navigate(`/reviews/${_id}`)}
        >
          <span
            className={`absolute top-0 right-0  bordered  rounded-full ${groupColor[group]} px-2 py-1 text-sm font-semibold text-gray-700 `}
          >
            {group}{" "}
            <span className="text-sm font-bold text-red-700">{rating}</span>
          </span>
          <img
            src={
              images[0] ||
              "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            }
            className="h-48 w-full object-cover object-center"
            alt={title}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              <ReactMarkdown className="prose font-semibold text-2xl mb-2">
                {title.length > 15 ? title.slice(0, 17) + "..." : title}
              </ReactMarkdown>
            </div>
          </div>
          <div className="px-6">
            <span className="">
              {tags.map((item, index) => (
                <span key={index}>
                  <Tag bordered={false} key={index} className=" mr-2">
                    {item}
                  </Tag>
                </span>
              ))}
            </span>
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
          <span className="text-base font-semibold">
            average rating: {avgRatingFive}
          </span>
          <BadgeLike count={likes} _id={_id} />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

// <div>
//   <div className="w-3/4 sm:w-full mt-4 ">
//     <div
//       className="max-w-sm rounded overflow-hidden border my-3 mr-2"
//       style={{ color: !themeMode ? "white" : "" }}
//     >
//       <div
//         className="cursor-pointer"
//         onClick={() => navigate(`/reviews/${_id}`)}
//       >
//         <img
//           className="w-full"
//           style={{ height: "140px" }}
//           src={
//             images[0] ||
//             "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
//           }
//           alt={title}
//         />
//       </div>
//       <div
//         className="cursor-pointer"
//         onClick={() => navigate(`/reviews/${_id}`)}
//       >
//         <div className="px-6 py-4">
//           <ReactMarkdown className="prose font-semibold text-xl mb-2">
//             {title.length > 50 ? title.slice(0, 50) + "..." : title}
//           </ReactMarkdown>
//         </div>
//         <div className="px-6 pt-4 pb-2">
//           <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
//             {group}
//           </span>
//         </div>
//         <div className="px-6 py-4" style={{ height: "140px" }}>
//           <ReactMarkdown
//             ellipsis={true}
//             className="prose flex text-xl mb-2"
//           >
//             {content.length > 150 ? content.slice(0, 149) + "..." : content}
//           </ReactMarkdown>
//         </div>
//         <div className="px-6 py-4" style={{ height: "40px" }}>
//           {tags.map((item, index) => (
//             <span key={index}>
//               <Tag
//                 bordered={false}
//                 key={index}
//                 className="bg-blue-200 rounded-full px-2 py-1  text-red-500  "
//               >
//                 {item}
//               </Tag>
//             </span>
//           ))}
//         </div>
//       </div>
//       <div className="px-6 py-4">
//         <span className=" text-base font-semibold">
//           <Rate
//             defaultValue={
//               filtered.find((item) => item.reviewId === _id)?.ratingFive ||
//               0
//             }
//             disabled={data === null || data === 0}
//             onChange={(value) => handleRatingFive(_id, value)}
//           />
//         </span>
//       </div>
//       <div className="px-6 py-4 flex justify-between">
//         <span className=" text-base font-semibold">
//           average rating: {avgRatingFive === null ? 0 : avgRatingFive}
//         </span>
//         <BadgeLike count={3} />
//       </div>
//     </div>
//   </div>
// </div>
// <div>
//   <div className="w-3/4 sm:w-full">
//     <div
//       className="max-w-xl rounded overflow-hidden border my-2 ml-4 "
//       style={{ color: !themeMode ? "white" : "" }}
//     >
//       <div
//         className="cursor-pointer"
//         onClick={() => navigate(`/reviews/${_id}`)}
//       >
//         <img
//           className="w-full max-h-120 object-cover"
//           src={
//             images[0] ||
//             "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
//           }
//           alt={title}
//         />
//       </div>
//       <div
//         className="cursor-pointer"
//         onClick={() => navigate(`/reviews/${_id}`)}
//       >
//         <div className="px-6 py-4">
//           <ReactMarkdown className="prose font-semibold text-2xl mb-2">
//             {title.length > 50 ? title.slice(0, 50) + "..." : title}
//           </ReactMarkdown>
//         </div>
//         <div className="px-6 pt-4 pb-2">
//           <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
//             {group}
//           </span>
//         </div>
//         <div className="px-6 py-4" style={{ height: "200px" }}>
//           <ReactMarkdown ellipsis={true} className="prose text-xl mb-2">
//             {content.length > 150 ? content.slice(0, 149) + "..." : content}
//           </ReactMarkdown>
//         </div>
//         <div className="px-6 py-4" style={{ height: "40px" }}>
//           {tags.map((item, index) => (
//             <span key={index}>
//               <Tag
//                 bordered={false}
//                 key={index}
//                 className="bg-blue-200 rounded-full px-2 py-1 text-red-500 mr-2"
//               >
//                 {item}
//               </Tag>
//             </span>
//           ))}
//         </div>
//       </div>
//       <div className="px-6 py-4">
//         <span className="text-base font-semibold">
//           <Rate
//             defaultValue={
//               filtered.find((item) => item.reviewId === _id)?.ratingFive ||
//               0
//             }
//             disabled={data === null || data === 0}
//             onChange={(value) => handleRatingFive(_id, value)}
//           />
//         </span>
//       </div>
//       <div className="px-6 py-4 flex justify-between">
//         <span className="text-base font-semibold">
//           average rating: {avgRatingFive === null ? 0 : avgRatingFive}
//         </span>
//         <BadgeLike count={3} />
//       </div>
//     </div>
//   </div>
// </div>
//
// <div className="max-w-sm rounded overflow-hidden shadow-lg my-2 mx-1">
//   <img
//     src={
//       images[0] ||
//       "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
//     }
//     className="w-full "
//     alt="Product Image"
//   />
//   <div className="px-6 py-4">
//     <div className="font-bold text-xl mb-2">
//       <ReactMarkdown className="prose font-semibold text-2xl mb-2">
//         {title.length > 50 ? title.slice(0, 50) + "..." : title}
//       </ReactMarkdown>
//     </div>
//   </div>
//   <div className="px-6 py-4">
//     <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
//       {group}
//     </span>
//   </div>
//   <div className="px-6 ">
//     <span className="">
//       {tags.map((item, index) => (
//         <span key={index}>
//           <Tag bordered={false} key={index} className=" mr-2">
//             {item}
//           </Tag>
//         </span>
//       ))}
//     </span>
//   </div>
//   <div className="px-6 py-4 flex justify-between">
//     <span className="text-base font-semibold">
//       average rating: {avgRatingFive === null ? 0 : avgRatingFive}
//     </span>
//     <BadgeLike count={3} />
//   </div>
// </div>
//
