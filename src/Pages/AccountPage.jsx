import React from "react";
import { Avatar, Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/AccountSlice/AccountSlice";
import {
  RollbackOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import MyReviewsTable from "../components/MyReviewsTable/MyReviewsTable";
const AccountPage = () => {
  const { themeMode } = useSelector((state) => state.themeSlice);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.accountSlice);
  const navigate = useNavigate();
  //

  return (
    <Layout className=" min-h-screen">
      <Link to={"/"}>
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            color: themeMode === false ? "#fff" : "",
          }}
        >
          <RollbackOutlined style={{ transform: "scale(1.2)" }} />
        </div>
      </Link>

      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          color: themeMode === false ? "#fff" : "",
        }}
      >
        {data.role === "admin" || data.role === "superadmin" ? (
          <Link to={"/admin"}>
            <UnorderedListOutlined
              style={{
                transform: "scale(1.2)",
                color: themeMode === false ? "#fff" : "black",
              }}
              className="text-white mx-3 "
            />
          </Link>
        ) : null}
        <Link to={"/"}>
          <LogoutOutlined
            style={{
              transform: "scale(1.2)",
              color: themeMode === false ? "#fff" : "black",
            }}
            onClick={() => dispatch(logout())}
            className="text-white mx-3 "
          />
        </Link>
      </div>

      <div className="flex p-8 mt-12">
        <div className="w-1/3 pr-8">
          <Avatar size={64} />
          <h2
            style={{ color: themeMode === false ? "#fff" : "" }}
            className="text-xl font-semibold mt-4"
          >
            {data.name}
          </h2>
          <p style={{ color: themeMode === false ? "#fff" : "", marginTop: 6 }}>
            {data.email}
          </p>
          <p style={{ color: themeMode === false ? "#fff" : "", marginTop: 4 }}>
            {data.role}
          </p>
        </div>

        <div className="w-1/2">
          <h3 className="text-xl font-semibold mb-4">My Reviews</h3>
        </div>
      </div>

      <div className="mx-2">
        <MyReviewsTable />
      </div>
    </Layout>
  );
};

export default AccountPage;
