import React from "react";

const Amenities = ({ amenities }) => {
  // console.log(amenities)
  const { amenitie, feature, googleMap } = amenities;
  return (
    <div className="amenities container my-4">
      <div className="row">
        {amenitie === "" ? (
          ""
        ) : (
          <div className="col-6">
            <h4>Amenities</h4>
            <div>{amenitie}</div>
          </div>
        )}

        {feature === "" ? (
          ""
        ) : (
          <div className="col-6">
            <h4>Futures</h4>
            <div>{feature}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Amenities;
