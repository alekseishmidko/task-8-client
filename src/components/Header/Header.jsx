import React from "react";
import { Button, Input, Avatar } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  BulbFilled,
  GlobalOutlined,
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
          <ThemeTumbler />
          <LangComponent />
        </div>
        <div className="flex items-center justify-center mt-4 md:mb-4 md:flex-1 md:justify-center sm:flex-1 sm:justify-center w-full sm:w-1/2">
          <SearchComponent className="h-full w-full md:w-1/2 sm:w-full" />
        </div>

        <div className="mt-4 md:mt-0 md:ml-4 md:mr-3">
          {data !== null ? (
            <div className="flex items-center cursor-pointer">
              <div onClick={() => onClickUserLogo()}>
                <UserOutlined className="text-white mr-2" />
                <span className="text-white">{data.name || ""}</span>
              </div>
              <LogoutOutlined
                onClick={onClickLogout}
                className="text-white pl-5"
              />
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button className="text-white">Log In</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-blue-500 text-white px-4 rounded-lg ml-2 md:inline hidden">
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
