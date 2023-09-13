import { Rate, message } from "antd";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetAllProducts,
  fetchHandleProductsRating,
} from "../../store/ProductSlice/ProductSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const ProductCard = ({ image, group, title, avgRatingFive, _id, images }) => {
  const { t } = useTranslation();
  const { data } = useSelector((state) => state.accountSlice);
  const { themeMode } = useSelector((state) => state.themeSlice);
  //
  const navigate = useNavigate();
  const { productsRatings } = useSelector((state) => state.productsSlice);
  const filtered = productsRatings.filter((item) => {
    if (data === null) {
      return;
    } else return item.userId === data._id;
  });
  const dispatch = useDispatch();
  const handleRatingFive = (id, value) => {
    console.log(id, { ratingFive: value });
    const res = dispatch(fetchHandleProductsRating({ id, value }));
    if (!res) {
      return message.error(res.payload.message);
    }
    setTimeout(() => {
      const parameters = "";
      dispatch(fetchGetAllProducts({ parameters }));
    }, 980);
  };
  const groupColor = {
    books: "bg-red-200",
    games: "bg-blue-200",
    movies: "bg-green-200",
    music: "bg-yellow-200",
  };
  return (
    // <div
    //   className="w-3/4 sm:w-full mt-4 cursor-pointer"
    //   onClick={() => navigate(_id)}
    // >
    //   <div
    //     className="max-w-sm rounded overflow-hidden border my-3 mr-2"
    //     style={{ color: !themeMode ? "white" : "" }}
    //   >
    //     <img
    //       style={{ height: "140px" }}
    //       className="w-full"
    //       src={
    //         images[0] ||
    //         "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    //       }
    //       alt={title}
    //     />
    //     <div className="px-6 py-4">
    //       <ReactMarkdown className="prose font-bold text-xl mb-2">
    //         {title}
    //       </ReactMarkdown>
    //     </div>
    //     <div className="px-6 pt-4 pb-2">
    //       <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
    //         {group}
    //       </span>
    //     </div>
    //     <div className="px-6 py-4">
    //       <span className=" text-base font-semibold">
    //         <Rate
    //           defaultValue={
    //             filtered.find((item) => item.productId === _id)?.ratingFive || 0
    //           }
    //           disabled={data === null || data === 0}
    //           onChange={(value) => handleRatingFive(_id, value)}
    //         />
    //       </span>
    //     </div>
    //     <div className="px-6 py-4">
    //       <span className=" text-base font-semibold">
    //         {t("averageRating")}: {avgRatingFive === null ? 0 : avgRatingFive}
    //       </span>
    //     </div>
    //   </div>
    // </div>
    <div
      className="relative w-92 h-116 rounded overflow-hidden shadow-lg my-4 mx-2"
      style={{ color: !themeMode ? "white" : "" }}
    >
      <div className="flex flex-col justify-between h-full cursor-pointer">
        <div
          className=" cursor-pointer"
          onClick={() => navigate(`/products/${_id}`)}
        >
          <span
            className={`absolute top-0 right-0  border my-1 rounded-full ${groupColor[group]} px-3 py-1 text-sm font-semibold text-gray-700 mr-1`}
          >
            {group}
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
            <div className="font-bold text-xl mb-2 ">
              <ReactMarkdown className="prose font-semibold text-2xl mb-2">
                {title.length > 15 ? title.slice(0, 17) + "..." : title}
              </ReactMarkdown>
            </div>
          </div>

          <div className="px-6 py-4 flex justify-between mt-4">
            <span className="text-base font-semibold">
              average rating: {avgRatingFive === null ? 0 : avgRatingFive}
            </span>
          </div>
        </div>
        <div className="px-6 py-4">
          <span className=" text-base font-semibold">
            <Rate
              defaultValue={
                filtered.find((item) => item.productId === _id)?.ratingFive || 0
              }
              disabled={data === null || data === 0}
              onChange={(value) => handleRatingFive(_id, value)}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
