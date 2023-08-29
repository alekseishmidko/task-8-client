import React from "react";
import truncate from "lodash.truncate";
import { Avatar, Card, Tag, List, Rate } from "antd";
const CardReview = ({ title, group, tags, rating, content }) => {
  const truncatedContent = truncate(content, { length: 50 });
  return (
    <>
      {/* <Card
        // title={title}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
      >
        <p className="my-2 ">
          Title:<span className="pl-2">{title}</span>
        </p>
        <p className="my-2 ">
          Group:<span className="pl-2">{group}</span>
        </p>
        <p className="my-2 pr-2">
          <span className="pr-2">Tags:</span>
          {tags.map((item, index) => (
            <Tag key={index}>{item}</Tag>
          ))}
        </p>
        <p className="my-2">
          Rating: <span className="pl-2">{rating}/10</span>
        </p>
      </Card> */}

      {/* <Card title={title}>
        <p>
          Group: <span className="font-semibold">{group}</span>
        </p>
        <p>
          Tags:{" "}
          {tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </p>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Card> */}

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
          {truncatedContent}
        </p>

        <div className="flex flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs md:text-sm lg:text-base mr-2 mb-2"
            >
              <Tag key={index}>{tag}</Tag>
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default CardReview;
