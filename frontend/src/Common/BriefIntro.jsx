import React from "react";
import Title from "./Title";

const BriefIntro = ({ title, children }) => {
  return (
    <div className=" py-3 introGrayBg">
      <div className="col-md-8 offset-md-2 px-4 py-2 py-md-4">
        <Title
          title={title}
          cssClass="mb-2 fw-normal fs-2 text-center green-700"
        />
        <p className="text-center lh-md m-0">{children}</p>
      </div>
    </div>
  );
};

export default BriefIntro;
