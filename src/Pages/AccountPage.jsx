import React from "react";
import { Avatar, Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetLikes, logout } from "../store/AccountSlice/AccountSlice";
import {
  RollbackOutlined,
  LogoutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import MyReviewsTable from "../components/MyReviewsTable/MyReviewsTable";
import { fetchCurrent } from "../store/AccountSlice/AccountSlice";
import BadgeLike from "../components/BadgeLike/BadgeLike";
import { HeartOutlined, LikeOutlined } from "@ant-design/icons";
// import { useAuth } from "../AuthContext";
const AccountPage = () => {
  const { Content } = Layout;
  const { themeMode } = useSelector((state) => state.themeSlice);
  const dispatch = useDispatch();
  // const { isLoading, data } = useSelector((state) => state.accountSlice);
  const { userLikes } = useSelector((state) => state.accountSlice);
  // const { data, logout } = useAuth();
  const data = JSON.parse(localStorage.getItem("data"));
  // console.log(data, isLoading);
  const onClickLogout = () => {
    // dispatch(logout());
    localStorage.removeItem("data");
    // logout();
  };
  React.useEffect(() => {
    dispatch(fetchGetLikes());
  }, []);
  return (
    <Layout className="min-h-screen">
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
        {data.role === "admin" ||
        data.role === "superadmin" ||
        data.role === "" ? (
          <Link to={"/admin"}>
            <TeamOutlined
              style={{
                transform: "scale(1.5)",
                color: themeMode === false ? "#fff" : "black",
              }}
              className="text-white mx-3"
            />
          </Link>
        ) : null}
        <Link to={"/"}>
          <LogoutOutlined
            style={{
              transform: "scale(1.4)",
              color: themeMode === false ? "#fff" : "black",
            }}
            onClick={onClickLogout}
            className="text-white mx-3 "
          />
        </Link>
      </div>

      <div className="flex p-8 mt-12">
        <div className="w-1/3 pr-8">
          <div style={{ position: "relative", display: "inline-block" }}>
            <Avatar size={64} />

            {userLikes > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  background: "black",
                  color: "white",
                  borderRadius: "46%",
                  padding: "1px 5px",
                }}
              >
                <LikeOutlined /> {userLikes}
              </span>
            )}
          </div>
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
