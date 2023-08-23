import React from "react";

const Title = ({ title, subTitle = "", cssClass }) => {
  return (
    <>
      <h3 className={`${cssClass}`}>
        {title}{" "}
        {subTitle ? (
          <span className={"fa-6 text-black fw-normal"}> / {subTitle}</span>
        ) : (
          ""
        )}
      </h3>
    </>
  );
};

export default Title;
