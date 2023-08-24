import React from "react";
import { Button, Input } from "antd";
import {
  FireOutlined,
  UserOutlined,
  LogoutOutlined,
  BulbOutlined,
  BulbFilled,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { handleTheme } from "../../store/ThemeSlice/themeSlice";
import { logout } from "../../store/AccountSlice/AccountSlice";
import { useSelector, useDispatch } from "react-redux";
const Header = () => {
  const { data } = useSelector((state) => state.accountSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <header className="bg-gray-800 text-white py-4 ">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between mx-2 ">
        <div className="flex items-center justify-center md:justify-start ">
          <span className="text-lg font-semibold ml-2">My Website</span>
          <BulbFilled
            className="ml-4 mr-2 cursor-pointer"
            onClick={() => dispatch(handleTheme())}
          />
        </div>
        <div className="flex items-center justify-center md:flex-1">
          <div className="flex items-center  border-gray-600 rounded-lg">
            <Input
              type="text"
              placeholder="Search..."
              className="px-3 py-2 rounded-lg border-none focus:outline-none"
            />
            <Button className="bg-blue-500 text-white px-4 ml-2 rounded-lg">
              Search
            </Button>
          </div>
        </div>
        <div className="mt-4 md:mt-0 md:ml-4 mr-3">
          {data !== null ? (
            <div
              className="flex items-center cursor-pointer"
              onClick={() => navigate("/account")}
            >
              <UserOutlined className="text-white mr-2" />

              <span className="text-white">{data.name || ""}</span>
              <LogoutOutlined
                onClick={() => dispatch(logout())}
                className="text-white mx-3"
              />
            </div>
          ) : (
            <>
              <Link to={"/login"}>
                <Button className="text-white">Log In</Button>
              </Link>
              <Link to={"/register"}>
                <Button className="bg-blue-500 text-white px-4 rounded-lg ml-2">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
