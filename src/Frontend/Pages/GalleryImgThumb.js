import React from 'react'

const GalleryImgThumb = ({imgs, findThumbHandler}) => {
  return (
    <>
    {imgs.length > 0 ? 
        imgs.map(project => (
            <li key={project._id}>
                <img src={project.path} alt=" " onClick={() => findThumbHandler(project._id)}/>
            </li>
        ))
    : null }
    </>
  )
}

export default GalleryImgThumb