import React, { useState, useEffect } from "react";
import Title from "../../Common/Title";
import { Link } from "react-router-dom";

import leftArrow from "../../Images/left.png";
import rightArrow from "../../Images/right.png";
import testimonialUser from "../../Images/testimonial.jpg";

import "./Testimonials.css";

const Testimonials = ({ testimonis }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = testimonis.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }

    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  const test = testimonis.map((item, indexPeople) => {
    const { imageUrl, title, description } = item;
    let position = "nextSlide";
    if (indexPeople === index) {
      position = "activeSlide";
    }
    if (
      indexPeople === index - 1 ||
      (index === 0 && indexPeople === testimonis.length - 1)
    ) {
      position = "lastSlide";
    }
    return (
      <div className={`${position} article position-absolute `} key={item._id}>
        <Title
          title={title}
          cssClass="mb-2 fw-normal fs-2 text-uppercase text-white"
        />

        {!imageUrl ? (
          <i className="fa fa-user text-white" aria-hidden="true"></i>
        ) : (
          <img
            src={imageUrl}
            className="rounded-circle my-4 testimonialImg"
            alt="User"
          />
        )}
        <p className="text-white mt-3 px-0 px-md-5">{description}</p>
        <div className="text-center">
          <Link to="" onClick={() => setIndex(index + 1)}>
            {" "}
            <img src={leftArrow} alt="Previous" width="42" height="42" />
          </Link>
          <Link to="" onClick={() => setIndex(index - 1)}>
            {" "}
            <img src={rightArrow} alt="Next" width="42" height="42" />
          </Link>
        </div>
      </div>
    );
  });

  return (
    <div className="col-md-6 p-5 testimonials text-center position-relative">
      {test}
    </div>
  );
};

export default Testimonials;
