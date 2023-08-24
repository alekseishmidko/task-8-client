import React from "react";
import { Card } from "antd";

const Comments = () => {
  const comments = [
    { name: "qwew", review: "rewiew", text: "text" },
    { name: "qwe22w", review: "rewiew2", text: "text22" },
    { name: "qwe33w", review: "rewiew3", text: "text333" },
    { name: "qwe22w", review: "rewiew2", text: "text22" },
    { name: "qwe33w", review: "rewiew3", text: "text333" },
  ];
  return (
    <div>
      <h2>Recent Comments</h2>
      {comments.map((item, index) => (
        <div key={index} className="border p-3 mb-4">
          <p>User: {item.name}</p>
          <p>Review: {item.review}</p>
          <p>Comment: {item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
