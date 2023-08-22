import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Tag } from "antd";
const CardReview = () => {
  const { Meta } = Card;
  return (
    <div>
      {/* <Card
        style={{ width: 300 }}
        cover={
          <img
            alt="example"
            // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[<SettingOutlined key="setting" />]}
      >
        <Meta
          avatar={<Avatar />}
          title="Card title"
          description="This is the description"
        />
      </Card> */}
      <Card title={"title"} className="review-card">
        <p>
          <strong>Work Title:</strong> {"1234r2rw"}
        </p>
        <p>
          <strong>Group:</strong> {"group"}
        </p>
        <p>
          <>Tags:</>{" "}
          {new Array(6).map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </p>
        <p>
          <strong>Rating:</strong> {"rating"}/10
        </p>
      </Card>
    </div>
  );
};

export default CardReview;
