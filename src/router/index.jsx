import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Profile from "../view/Profile";

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path=":username/:userId" element={<Profile />} />
      </Routes>{" "}
    </BrowserRouter>
  );
};

export default RouterApp;
