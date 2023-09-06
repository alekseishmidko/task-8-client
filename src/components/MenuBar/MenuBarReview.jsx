import React from "react";
import { Button, Menu } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { arr } from "./menuBarProps";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAllReviews } from "../../store/ReviewsSlice/ReviewsSlice";
import { useNavigate } from "react-router-dom";
const MenuBarReview = () => {
  const { data } = useSelector((state) => state.accountSlice);
  const dispatch = useDispatch();
  const [menuOptions, setMenuOptions] = React.useState({
    title: "All",
    value: "",
  });
  const navigate = useNavigate();
  React.useEffect(() => {
    const parameters = menuOptions.value;
    dispatch(fetchGetAllReviews({ parameters }));
  }, []);

  const handleMenuOptions = (parameters, item) => {
    setMenuOptions(item);
    console.log(parameters, item);
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
