import React from 'react'
import Title from '../../Common/Title'

const FileUpload = ({title}) => {
  return (
    <>
        <Title title={title} cssClass="fs-5 fw-bold"/>
        <div className="border border-3  p-5 mb-4 shadow-lg">
            {/* <label htmlFor="addImages" className="form-label  ">Add Image's</label> */}
            <input className="form-control" type="file" id="addImages" multiple /> 
        </div>
    </>
  )
}

export default FileUpload