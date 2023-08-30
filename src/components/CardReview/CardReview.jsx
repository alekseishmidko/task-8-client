import React from "react";
import ReactMarkdown from "react-markdown";
import truncate from "lodash.truncate";
import { Avatar, Card, Tag, List, Rate } from "antd";
const CardReview = ({ title, group, tags, rating, content }) => {
  const truncatedContent = truncate(content, { length: 50 });
  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 lg:p-10">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">
          {title}
        </h2>
        <p className="text-gray-600 mb-2">{group}</p>
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
        <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
          <ReactMarkdown className="prose">{truncatedContent}</ReactMarkdown>
        </p>

        <div className="flex flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              // className="bg-blue-200 text-blue-600 px-2 py-1 rounded-full text-xs md:text-sm lg:text-base mr-2 mb-2"
            >
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
      </div>
    </>
  );
};

export default CardReview;
