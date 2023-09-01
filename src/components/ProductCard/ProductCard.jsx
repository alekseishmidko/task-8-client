import React from "react";
import ReactMarkdown from "react-markdown";
const ProductCard = ({ image, group, title }) => {
  return (
    <div className="w-3/4 sm:w-full mt-4 ">
      <div className="max-w-sm rounded overflow-hidden border mr-2">
        <img
          className="w-full"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          alt={title}
        />
        <div className="px-6 py-4">
          <ReactMarkdown className="prose font-bold text-xl mb-2">
            {"title"}
          </ReactMarkdown>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {group}
          </span>
        </div>
        <div className="px-6 py-4">
          <span className="text-gray-700 text-base font-semibold">
            avg rating: ${"avgRatingFive"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
