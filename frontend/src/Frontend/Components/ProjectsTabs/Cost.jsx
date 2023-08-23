import React from "react";

const Cost = ({ images, pdfs }) => {
  let imgs;
  let pdf;
  if (images.length > 0) {
    imgs = images.map((item, i) => (
      <div className="my-5 text-center zoomImg" key={i}>
        <img src={item.path} alt="" className="w-50" />
      </div>
    ));
  }

  if (pdfs.length > 0) {
    pdf = pdfs.map((item, i) => (
      <div className="my-5 text-center zoomImg" key={i}>
        {item.path}
      </div>
    ));
  }

  return (
    <div>
      {images.length > 0 ? imgs : null}
      {pdfs.length > 0 ? pdf : null}
    </div>
  );
};

export default Cost;
