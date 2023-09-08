import React from "react";
import { message } from "antd";
export const AlertMessage = (type, content) => {
  message[type](content);
};
