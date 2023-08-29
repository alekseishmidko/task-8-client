import React, { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const BurgerMenu = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const burgerArr = ["Home", "Info"];
  return (
    <div>
      <MenuOutlined onClick={showDrawer} className="text-2xl cursor-pointer" />

      <Drawer
        title="Menu"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <ul className="list-none">
          {burgerArr.map((item, index) => (
            <li
              className="mb-4 cursor-pointer"
              key={index}
              //   onClick={() => navigate(`/${item}`)}
            >
              <span className="text-lg ">{item}</span>
            </li>
          ))}
        </ul>
      </Drawer>
    </div>
  );
};

export default BurgerMenu;
