import React from "react";
import Loader from "react-js-loader";
import "./Loader.css";

const FetchLoader = () => {
  return (
    <div className="loader-container">
      <Loader
        type="spinner-default"
        bgColor={"#d3d3d3"}
        title={"Please Wait..."}
        color={"#808080"}
        size={100}
      />
    </div>
  );
};

export default FetchLoader;
