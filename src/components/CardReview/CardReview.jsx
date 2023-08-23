import React from "react";

import { Avatar, Card, Tag } from "antd";
const CardReview = ({ title, group, tags, rating }) => {
  return (
    <>
      <Card
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
          Rating: <span className="pl-2">{rating}</span>
        </p>
      </Card>
    </>
  );
};

export default CardReview;
