import React, { useEffect, useState } from "react";
import Button from "../../Common/Button";
import { useDispatch, useSelector } from "react-redux";
import "./Gallery.css";
import GalleryImgThumb from "./GalleryImgThumb";

import ModelBg from "../../Common/ModelBg";
import DynamicCarousel from "../Components/DynamicCarousel";
import { getClientProjects } from "../../features/project/clientProjectActions";

const Gallery = ({ projectImages, projTab }) => {
  // console.log("Gallery", projTab)
  const [all, setAll] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [future, setFuture] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [img, setImg] = useState(null);
  const [btnActiveWord, setBtnActiveWord] = useState("all");
  const { clientProjects, error } = useSelector(
    (state) => state.clientProjects,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    {
      projTab === "gallery" ? setAll(projectImages) : null;
    }
  }, [projectImages]);

  useEffect(() => {
    if (clientProjects?.projectList?.length > 0) {
      setAll(clientProjects.imageList);
      const projectList = formatData(clientProjects);
      setCompleted(projectList.completed[0].imgs);
      setFuture(projectList.future[0].imgs);
      setOngoing(projectList.ongoing[0].imgs);
    }
    if (projectImages?.length > 0) {
      setAll(projectImages);
    }
  }, [clientProjects]);

  useEffect(() => {
    if (clientProjects.length === 0) {
      dispatch(getClientProjects());
    }
  }, []);

  const formatData = (data) => {
    const project = data.projectList;
    const images = data.imageList;
    const projList = [];

    const list = project.reduce((acc, val, ind) => {
      const imgs = [];
      images.forEach((el, i) => {
        if (el.projectID === val._id) {
          imgs.push(el);
        }
      });
      return acc.concat({ ...val, imgs });
    }, []);

    list.map((proj) => {
      if (!projList[proj.projectCategoryValue]) {
        projList[proj.projectCategoryValue] = [];
      }
      projList[proj.projectCategoryValue].push(proj);
    });
    return projList;
  };

  const thumbHandler = (label) => {
    const splitLabel = label.split(" ");
    const word = splitLabel[0].toLowerCase();
    setBtnActiveWord(word);
    if (word === "all") setAll([...ongoing, ...completed, ...future]);
    if (word === "ongoing") setAll(ongoing);
    if (word === "completed") setAll(completed);
    if (word === "future") setAll(future);
    if (word === "selected") setAll(projectImages);
  };

  const findThumbHandler = (id) => {
    const findImg = all.find((allGallery) => allGallery._id === id);
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
        {projTab === "gallery" ? null : (
          <>
            <div className="text-center pb-2 mt-5">
              <Button
                type=""
                cssClass={`loadMore me-2 ${
                  btnActiveWord === "all" ? "active" : ""
                }`}
                label="All"
                handlerChange={thumbHandler}
              />
              <Button
                type=""
                cssClass={`loadMore me-2 ${
                  btnActiveWord === "ongoing" ? "active" : ""
                }`}
                label="Ongoing Projects"
                handlerChange={thumbHandler}
              />
              <Button
                type=""
                cssClass={`loadMore me-2 ${
                  btnActiveWord === "completed" ? "active" : ""
                }`}
                label="Completed Projects"
                handlerChange={thumbHandler}
              />
              <Button
                type=""
                cssClass={`loadMore me-2 ${
                  btnActiveWord === "future" ? "active" : ""
                }`}
                label="Future Projects"
                handlerChange={thumbHandler}
              />
            </div>
            <hr />
          </>
        )}
        <div>
          <ul className="list-unstyled gallery d-flex justify-content-center align-items-center flex-wrap">
            <GalleryImgThumb imgs={all} findThumbHandler={findThumbHandler} />
          </ul>
        </div>
      </div>

      {showModal && (
        <DynamicCarousel obj={img} all={all} closeCarousel={closeModel} />
      )}
      {showModal && <ModelBg closeModel={closeModel} />}
    </>
  );
};
export default Gallery;
