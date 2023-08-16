import React, { useEffect } from "react";
import Title from "../../Common/Title";
import { axiosServiceApi } from "../../util/axiosUtil";

export const AmenitiesList = ({ project, amenities, setAmenities }) => {
  /**
   * get selected Specification for edit
   */
  useEffect(() => {
    const getSelectedAmenities = async () => {
      const response = await axiosServiceApi.get(
        `api/amenities/getAmenitiesById/${project?._id}`,
      );
      if (response?.status == 200) {
        setAmenities(response.data.amenitie);
      }
    };
    if (project?._id) {
      getSelectedAmenities();
    }
  }, []);

  return (
    <>
      <Amenities
        title="Add Features"
        value={amenities?.feature}
        amenities={amenities}
        setAmenities={setAmenities}
        name="feature"
      />
      <Amenities
        title="Add Amenities"
        value={amenities?.amenitie}
        amenities={amenities}
        setAmenities={setAmenities}
        name="amenitie"
      />
    </>
  );
};

export const Amenities = ({ title, value, amenities, setAmenities, name }) => {
  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const onchangeVal = { ...amenities };
    onchangeVal[name] = value;
    setAmenities(onchangeVal);
  };
  return (
    <>
      <Title title={title} cssClass="fs-5 fw-bold" />
      <div className="border border-3 mb-4 shadow-lg">
        {/* <label htmlFor="addImages" className="form-label  ">Add Image's</label> */}
        <textarea
          className="form-control"
          name={name}
          value={value}
          onChange={(e) => handleChange(e)}
          id="amenitiesDescription"
          rows="3"
        ></textarea>
      </div>
    </>
  );
};

export default Amenities;
