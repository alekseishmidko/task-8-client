import React from "react";
import { BulbFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { handleTheme } from "../../store/ThemeSlice/themeSlice";
const ThemeTumbler = () => {
  const dispatch = useDispatch();

  const onClickTheme = () => {
    dispatch(handleTheme());
  };

  return (
    <div>
      <BulbFilled className="ml-4 mr-2 cursor-pointer" onClick={onClickTheme} />
    </div>
  );
};

export default ThemeTumbler;
