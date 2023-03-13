import React from "react";
import { PuffLoader } from "react-spinners";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="d-flex min-vh-100 justify-content-center loading">
      <PuffLoader color="#F8F988" size={100} />
    </div>
  );
};

export default Loading;
