import React from "react";
import { Tag } from "antd";

const TagCloud = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <Tag key={index} color={getRandomColor()} className="text-xs py-1 px-2">
          {tag}
        </Tag>
      ))}
    </div>
  );
};

const getRandomColor = () => {
  const colors = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default TagCloud;
