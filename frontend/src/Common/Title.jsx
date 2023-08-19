import React from "react";

const Title = ({ title, subTitle = "", cssClass }) => {
  return (
    <>
      <h3 className={`${cssClass}`}>{title}</h3>
      {subTitle ? <h5 className={"fa-7 text-dark"}>{subTitle}</h5> : ""}
    </>
  );
};

export default Title;
