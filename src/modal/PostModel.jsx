import React, { useEffect, useRef, useState } from "react";
import "./postModal.scss";
import cross from "../assets/cross.png";
const PostModel = ({ title, Content, setModalObj }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    let count = 0;

    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        count > 0
      ) {
        count++;
        setModalObj();
      }
    };
    setTimeout(() => {
      count++;
    }, 10);


    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="postModal">
      <div className="model" ref={containerRef}>
        <div className="head">
          {" "}
          <h3>Post Details</h3>
          <img
            src={cross}
            alt="cross"
            width={22}
            height={22}
            onClick={() => setModalObj()}
          />
        </div>
        <div className="content">
          {" "}
          <p>Title</p>
          <span>{title}</span>
        </div>
        <div className="content">
          {" "}
          <p>Content</p>
          <span>{Content}</span>
        </div>
      </div>
    </div>
  );
};

export default PostModel;
