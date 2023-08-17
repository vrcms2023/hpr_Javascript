import React from "react";

const Cost = ({ data }) => {
  const imgs = data.map((img, i) => (
    <div className="my-5 text-center zoomImg" key={i}>
      <img src={img.path} alt="" className="w-50" />
    </div>
  ));
  return <div>{data.length > 0 ? imgs : null}</div>;
};

export default Cost;
