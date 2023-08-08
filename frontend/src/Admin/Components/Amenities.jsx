import React, { useEffect } from "react";
import Title from "../../Common/Title";
import { useCookies } from "react-cookie";

export const AmenitiesList = ({  
  project,
  amenities,
  setAmenities,
}) => {
  const [cookies] = useCookies(["token"]);

  /**
   * get selected Specification for edit
   */
  useEffect(() => {
    const getSelectedAmenities = () => {
      fetch(`/getAmenitiesById/${project?._id}`, {
        headers: { "x-access-token": cookies.token },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.amenitie !== undefined) {
            setAmenities(data.amenitie);
          }
        })
        .catch((err) => console.log(err));
    };
    if(project?._id) {
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

export const Amenities = ({
  title,
  value,
  amenities,
  setAmenities,
  name,
}) => {
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
