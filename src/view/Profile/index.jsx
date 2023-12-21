import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./profile.scss";
import PostCard from "../../components/postCard";
import { debounce } from "../../helper/common";
import NavSelector from "../../components/navSelector";
import PostModel from "../../modal/PostModel";
const Profile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalObj, setModalObj] = useState({
    title: null,
    content: null,
  });
  const getProfile = async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const postResponse = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );

    const postBody = await postResponse.json();
    const userBody = await response.json();

    const result = { ...userBody, postList: postBody };

    setUserData(result);
    setLoading(false);
  };

  const debouncePosts = debounce(() => getProfile(), 5);

  const handlePost = (title, post) => {
    setModalObj({ title: title, content: post });
  };

  useEffect(() => {
    debouncePosts();
  }, []);

  return (
    <div className="container profile">
      <NavSelector />
      <h1>Profile Page</h1>
      {loading ? (
        <h2> Loading...</h2>
      ) : (
        <>
          {" "}
          <section className="userSection">
            <div>
              <p>
                Name :<span> {userData?.name}</span>
              </p>
              <span>
                {" "}
                {userData?.username} | {userData?.company?.catchPhrase}
              </span>
            </div>

            <div>
              <p>
                Address :
                <span>
                  {" "}
                  {userData?.address?.street}, {userData?.address?.city}.
                </span>
              </p>
              <span>
                {userData?.email} | {userData?.phone}
              </span>
            </div>
          </section>
          <section className="postSection">
            {userData?.postList?.slice(0, 3).map((item, index) => (
              <PostCard
                title={item?.title}
                content={item?.body}
                key={index}
                handlePost={handlePost}
              />
            ))}
          </section>
        </>
      )}
      {modalObj?.title ? (
        <PostModel
          title={modalObj?.title}
          Content={modalObj?.content}
          setModalObj={setModalObj}
        />
      ) : (
        ""
      )}{" "}
    </div>
  );
};

export default Profile;
