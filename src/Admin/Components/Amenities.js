import React from 'react'
import Title from '../../Common/Title'

const Amenities = ({title}) => {
  return (
    <>
    <Title title={title} cssClass="fs-5 fw-bold"/>
    <div className="border border-3 p-5 mb-4 shadow-lg">
        {/* <label htmlFor="addImages" className="form-label  ">Add Image's</label> */}
        <textarea className="form-control" id="specificationDescription" rows="3"></textarea>
    </div>
</>
  )
}

export default Amenities