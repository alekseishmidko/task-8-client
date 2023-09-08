import React from "react";
import { Button, Menu } from "antd";
import { PlusOutlined } from "@ant-design/icons";
// import { arr } from "./menuBarProps";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAllReviews } from "../../store/ReviewsSlice/ReviewsSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const MenuBarReview = () => {
  const { t } = useTranslation();
  const { data } = useSelector((state) => state.accountSlice);
  const dispatch = useDispatch();
  const [menuOptions, setMenuOptions] = React.useState({
    title: "All",
    value: "",
  });
  const arr = [
    { title: t("all"), value: "" },
    { title: t("books"), value: "books" },
    { title: t("games"), value: "games" },
    { title: t("movies"), value: "movies" },
    { title: t("music"), value: "music" },
  ];
  const navigate = useNavigate();
  React.useEffect(() => {
    const parameters = menuOptions.value;
    dispatch(fetchGetAllReviews({ parameters }));
  }, []);

  const handleMenuOptions = (parameters, item) => {
    setMenuOptions(item);
    dispatch(fetchGetAllReviews({ parameters }));
  };
  return (
    <div>
      <Menu mode="horizontal">
        {arr.map((item, index) => (
          <Menu.Item
            key={index}
            onClick={() => {
              handleMenuOptions(item.value, item);
            }}
            defaultValue={arr[0].title}
          >
            {item.title}
          </Menu.Item>
        ))}
        <>
          {data !== null && (
            <Button
              onClick={() => {
                navigate("/reviews/create");
              }}
              type="text"
              icon={<PlusOutlined />}
              className="absolute  right-0 mt-2 mr-1 pb-1"
            ></Button>
          )}
        </>
      </Menu>
    </div>
  );
};

export default MenuBarReview;
