import { Rate, message } from "antd";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetAllProducts,
  fetchHandleProductsRating,
} from "../../store/ProductSlice/ProductSlice";

const ProductCard = ({ image, group, title, avgRatingFive, _id }) => {
  const data = JSON.parse(localStorage.getItem("data")) || 0;

  console.log(data, ">>datas");
  //
  const { productsRatings } = useSelector((state) => state.productsSlice);
  const filtered = productsRatings.filter((item) => {
    if (data._id === null) {
      return;
    } else return item.userId === data._id;
  });
  console.log(productsRatings, filtered);
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

  return (
    <div className="w-3/4 sm:w-full mt-4 ">
      <div className="max-w-sm rounded overflow-hidden border my-3 mr-2">
        <img
          className="w-full"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          alt={title}
        />
        <div className="px-6 py-4">
          <ReactMarkdown className="prose font-bold text-xl mb-2">
            {title}
          </ReactMarkdown>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {group}
          </span>
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
        <div className="px-6 py-4">
          <span className=" text-base font-semibold">
            average rating: {avgRatingFive === null ? 0 : avgRatingFive}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
