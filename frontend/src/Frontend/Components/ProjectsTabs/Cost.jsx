import React from "react";

const Cost = ({ images, pdfs }) => {
  let imgs;
  let pdf;
  if (images.length > 0) {
    imgs = images.map((img, i) => (
      <div className="my-5 text-center zoomImg" key={i}>
        <img src={img.path} alt="" className="w-50" />
      </div>
    ));
  }

  if (images.length > 0) {
    pdf = pdfs.map((pdf, i) => (
      <div className="my-5 text-center zoomImg" key={i}>
        {pdf.path}
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
