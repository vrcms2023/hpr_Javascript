import React, { useEffect, useState } from "react";
import "./Gallery.css";
import GalleryImgThumb from "./GalleryImgThumb";

import ModelBg from "../../Common/ModelBg";
import DynamicCarousel from "../Components/DynamicCarousel";

const Gallery = ({ projectImages }) => {
  const [showModal, setShowModal] = useState(false);
  const [img, setImg] = useState(null);
  const [selectedProject, setSelectedProject] = useState({});

  const findThumbHandler = (projectId, id) => {
    const project = projectImages.find((proj) => proj._id === projectId);
    const findImg = project.imgs.find((allGallery) => allGallery._id === id);
    setSelectedProject(project);
    setShowModal(!showModal);
    setImg(findImg);
  };

  const closeModel = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="py-5 mt-5">
        <div>
          <ul className="list-unstyled gallery d-flex justify-content-center align-items-center flex-wrap">
            {projectImages?.length > 0
              ? projectImages.map((project) => (
                  <div className="row p-0 pt-4 projectTabs" key={project._id}>
                    <div className="col-md-12">
                      <div>{project.projectTitle}</div>
                      <GalleryImgThumb
                        imgs={project.imgs}
                        imageDescription={project.imageDescription}
                        findThumbHandler={findThumbHandler}
                        projectID={project._id}
                      />
                    </div>
                  </div>
                ))
              : null}
          </ul>
        </div>
      </div>

      {showModal && (
        <DynamicCarousel
          obj={img}
          all={selectedProject.imgs}
          closeCarousel={closeModel}
        />
      )}
      {showModal && <ModelBg closeModel={closeModel} />}
    </>
  );
};
export default Gallery;
