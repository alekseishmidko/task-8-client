import React from "react";
import { Button, Input, Avatar } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  BulbFilled,
  GlobalOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { handleTheme } from "../../store/ThemeSlice/themeSlice";

import { useSelector, useDispatch } from "react-redux";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../AuthContext";
import SearchComponent from "../SearchComponent/SearchComponent";
import LangComponent from "../LangComponent/LangComponent";
import ThemeTumbler from "../ThemeTumbler/ThemeTumbler";
const Header = () => {
  const { data } = useSelector((state) => state.accountSlice);
  const { t, i18n } = useTranslation();

  const { logOut } = useAuth();
  const navigate = useNavigate();

  const onClickUserLogo = () => {
    navigate("/account");
  };
  const onClickLogout = () => {
    logOut();
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex md:flex-row items-center justify-between mx-2 h-14">
        <div className="flex items-center justify-center">
          <div className="ml-2">
            <BurgerMenu />
          </div>
          <span
            className="text-lg font-semibold ml-2 cursor-pointer md:inline hidden"
            onClick={() => navigate("/")}
          >
            My Website
          </span>

          <div className="sm:inline hidden xs:inline hidden">
            <ThemeTumbler />{" "}
          </div>

          <div className="mx-2 ">
            <LangComponent />
          </div>
        </div>
        <div className="flex items-center justify-center ">
          <SearchComponent className="h-full w-full md:w-1/2 sm:w-full" />
        </div>

        <div className="">
          {data !== null ? (
            <div className="flex items-center cursor-pointer sm: flex justify-center items-center">
              <div onClick={() => onClickUserLogo()}>
                <UserOutlined className="text-white mr-2  sm:pl-3 xs: mr-2 xs:ml-1 sm:ml-1" />
                <span className="text-white sm:inline hidden">
                  {data.name || ""}
                </span>
              </div>
              <LogoutOutlined
                onClick={onClickLogout}
                className="text-white pl-5 sm:mr-2 xs: mr-2"
              />
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button className="text-white px-3 text-sm mx-2 mr-4 xs:w-13  sm:w-22 md:w-30 ">
                  {t("logIn")}
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-blue-500 text-white px-2 rounded-lg mx-2 md:inline hidden text-sm sm:w-22 md:w-30 lg:w-22">
                  {t("signUp")}
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
{
  /* <div className="flex items-center border-gray-600 rounded-lg">
            <Input
              type="text"
              placeholder={t("search")}
              className="px-3 py-2 rounded-lg border-none focus:outline-none"
            />
            <Button className="bg-blue-500 text-white px-4 ml-2 rounded-lg">
              {t("search")}
            </Button>
          </div> */
}
// mt-4 md:mb-4 md:flex-1 md:justify-center sm:flex-1 sm:justify-center w-full sm:w-1/2
//
// <div className="flex items-center cursor-pointer">
//   <div onClick={() => onClickUserLogo()}>
//     <UserOutlined className="text-white mr-2" />
//     <span className="text-white  sm:inline hidden">
//       {data.name || ""}
//     </span>
//   </div>
//   <LogoutOutlined
//     onClick={onClickLogout}
//     className="text-white pl-5 mr-2"
//   />
// </div>
