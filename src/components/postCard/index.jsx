import React from "react";
import "./post.scss";
const PostCard = ({ title, content, handlePost }) => {
  return (
    <div className="postCard" onClick={() => handlePost(title, content)}>
      <span>{title}</span>
      <p>{content}</p>
    </div>
  );
};

export default PostCard;
