import React from "react";
import { Button, Menu } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { arr } from "./menuBarProps";
import { useDispatch } from "react-redux";
import { fetchGetAllReviews } from "../../store/ReviewsSlice/ReviewsSlice";
const MenuBarReview = () => {
  const dispatch = useDispatch();
  const [menuOptions, setMenuOptions] = React.useState({
    title: "All",
    value: "",
  });

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
          <Button
            onClick={() => {}}
            type="text"
            icon={<PlusOutlined />}
            className="absolute  right-0 mt-2 mr-1 pb-1"
          ></Button>
        </>
      </Menu>
    </div>
  );
};

export default MenuBarReview;
