import React from 'react'
import Title from './Title'

const CatageoryImgC = ({title, catategoryImgs, cssClass, thumbDelete }) => {
  return (
    <div className=''>
        <Title title={title} cssClass="fs-5"/>
                <div className='d-flex justify-content-start align-items-center flex-wrap'>
                {
                    catategoryImgs.length > 0 ? 
                    catategoryImgs.map((item) => (
                        <div className='categoryContainer' key={item.id} onClick={() => thumbDelete(item.id)}>
                            <img className={cssClass} src={item.imgsrc} alt=" " />
                        </div>
                    ))
                    : <p className='text-warning fs-4 text-center my-5'>Gallery is empty!, please add images.</p>
                }
                </div>
    </div>
  )
}

export default CatageoryImgC