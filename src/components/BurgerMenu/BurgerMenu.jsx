import React, { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const BurgerMenu = () => {
  const { t } = useTranslation();
  const { themeMode } = useSelector((state) => state.themeSlice);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const burgerArr = [
    { title: t("home"), path: "/" },
    { title: t("products"), path: "/products" },
    { title: t("reviews"), path: "/reviews" },
    { title: "Info", path: "/" },
  ];
  return (
    <div>
      <MenuOutlined onClick={showDrawer} className="text-2xl cursor-pointer" />

      <Drawer
        title={t("menu")}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <ul className="list-none">
          {burgerArr.map((item, index) => (
            <li className="mb-4 cursor-pointer" key={index}>
              <span
                style={{
                  color: themeMode === false ? "#fff" : "",
                }}
                className="text-lg "
                onClick={() => navigate(`${item.path}`)}
              >
                {item.title}
              </span>
            </li>
          ))}
        </ul>
      </Drawer>
    </div>
  );
};

export default BurgerMenu;
