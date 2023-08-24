import React from "react";
import { Avatar, Layout, List } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  GoogleOutlined,
  FacebookOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const AccountPage = () => {
  const { themeMode } = useSelector((state) => state.themeSlice);
  const userInfo = {
    username: "JohnDoe",
    email: "johndoe@example.com",
    avatarUrl: "https://www.example.com/avatar.jpg",
  };
  const { data } = useSelector((state) => state.accountSlice);
  console.log(data, "acc data");

  const userReviews = [
    {
      title: "Review 1",
      date: "2023-08-01",
    },
    {
      title: "Review 2",
      date: "2023-08-05",
    },
  ];

  return (
    <Layout>
      <Link to={"/"}>
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            color: themeMode === false ? "#fff" : "",
          }}
        >
          <RollbackOutlined />
        </div>
      </Link>
      <div className="flex p-8 mt-12">
        <div className="w-1/3 pr-8">
          <Avatar size={64} src={data.avatarUrl} />
          <h2
            style={{ color: themeMode === false ? "#fff" : "" }}
            className="text-xl font-semibold mt-4"
          >
            {data.name}
          </h2>
          <p style={{ color: themeMode === false ? "#fff" : "" }}>
            {data.email}
          </p>
        </div>

        <div className="w-2/3">
          <h3 className="text-xl font-semibold mb-4">My Reviews</h3>
          <List
            dataSource={userReviews}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={<a href={`/reviews/${item.title}`}>{item.title}</a>}
                  description={`Published on ${item.date}`}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AccountPage;
