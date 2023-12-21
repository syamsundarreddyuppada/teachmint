import React, { useEffect, useRef } from "react";
import "./postModal.scss";
import cross from "../assets/cross.png";
const PostModel = ({
  title = "Post Details",
  postObj,
  setModalObj,
  userDetails,
}) => {
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

  const userTitleData = [{}];

  return (
    <div className="postModal">
      <div className="model" ref={containerRef}>
        <div className="head">
          <h3>{title}</h3>
          <img
            src={cross}
            alt="cross"
            width={22}
            height={22}
            onClick={() => setModalObj()}
          />
        </div>
        {!userDetails ? (
          <>
            {" "}
            <div className="content">
              {" "}
              <p>Title</p>
              <span>{postObj?.title}</span>
            </div>
            <div className="content">
              {" "}
              <p>Content</p>
              <span>{postObj?.content}</span>
            </div>
          </>
        ) : (
          <section className="userDeatilSections">
            {" "}
            <div className="content">
              {" "}
              <p>Name</p>
              <span>{postObj?.name}</span>
            </div>
            <div className="content">
              {" "}
              <p>username</p>
              <span>{postObj?.username}</span>
            </div>
            <div className="content">
              {" "}
              <p>Company name</p>
              <span>{postObj?.company?.name}</span>
            </div>
            <div className="content">
              {" "}
              <p>Website</p>
              <span>{postObj?.website}</span>
            </div>
            <div className="content">
              {" "}
              <p>email</p>
              <span>{postObj?.email}</span>
            </div>{" "}
            <div className="content">
              {" "}
              <p>address</p>
              <span>
                {postObj?.address?.street} {postObj?.address?.city}
              </span>
            </div>{" "}
            <div className="content">
              {" "}
              <p>Phone</p>
              <span>{postObj?.phone}</span>
            </div>{" "}
            <div className="content">
              {" "}
              <p>Catch Phrase</p>
              <span>{postObj?.company?.catchPhrase}</span>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PostModel;
