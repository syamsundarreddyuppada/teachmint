import React, { useEffect, useState } from "react";
import "./home.scss";
import { Link } from "react-router-dom";
import { debounce } from "../../helper/common";
const Home = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const postResponse = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const postBody = await postResponse.json();

    const userBody = await response.json();
    const result = userBody.map((item) => {
      // Filter posts for the current user
      const posts = postBody.filter(
        (postItem) => postItem?.userId === item?.id
      );

      return {
        ...item,
        posts: posts,
      };
    });
    setUsers(result);
    localStorage.setItem("users", JSON.stringify(result));
  };

  const debounceUser = debounce(() => {
    const localStore = localStorage.getItem("users") ?? null;
    if (localStore) {
      setUsers(JSON.parse(localStore));
    } else {
      getUsers();
    }
  }, 5);
  useEffect(() => {
    debounceUser();
  }, []);

  return (
    <div className="container home">
      <h1>Peoples Directory</h1>
      <ul>
        {users?.map((item, index) => {
          return (
            <Link
              to={{
                pathname: `/${(item?.name).trim().replace(/\s/g, "")}/${
                  item?.id
                }`,
              }}
              key={index}
            >
              <li key={index}>
                <p>Name : {item?.name}</p>
                <p>Posts : {item?.posts?.length} </p>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
