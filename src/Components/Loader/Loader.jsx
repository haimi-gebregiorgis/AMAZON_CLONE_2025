import React from "react";
import MoonLoader from "react-spinners/MoonLoader";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <MoonLoader color="#36d7b7" />
    </div>
  );
}

export default Loader;
