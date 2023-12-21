import React from "react";
import "./post.scss";
const PostCard = ({ title, content }) => {
  return (
    <div className="postCard">
      <span>{title}</span>
      <p>{content}</p>
    </div>
  );
};

export default PostCard;
