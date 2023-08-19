import React, { useEffect, useState } from "react";
import Title from "../../Common/Title";
import { useDispatch, useSelector } from "react-redux";
import { getClientProjects } from "../../features/project/clientProjectActions";

import "./Projects.css";
import ProjectItem from "../Components/projectItem";

const Projects = () => {
  const [completed, setCompleted] = useState([]);
  const [future, setFuture] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const { clientProjects, error } = useSelector(
    (state) => state.clientProjects,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (clientProjects.length === 0) {
      dispatch(getClientProjects());
    }
  }, []);

  useEffect(() => {
    if (clientProjects?.projectList?.length > 0) {
      const projectList = formatData(clientProjects);
      setCompleted(projectList.completed);
      setFuture(projectList.future);
      setOngoing(projectList.ongoing);
    }
  }, [clientProjects]);

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="row p-0 pt-5">
        <div className="col-md-12 banner"></div>
      </div>

      <div className="row py-3 introGrayBg">
        <div className="col-md-8 offset-md-2 py-4">
          <Title
            title="Welcome To HPR Infra Projects"
            cssClass="mb-2 fw-normal fs-2 text-center green-700"
          />
          <p className="text-center lh-md">
            We believe that construction is a man made wonder. The thought of
            bringing imagination to real life structures excites us, each day
            the passion in us grows as we contribute to this industry.
          </p>
        </div>
      </div>

      {ongoing.length > 0 ? (
        <ProjectItem projectList={ongoing} projectType={ongoing} />
      ) : (
        ""
      )}

      {/* Completed Projects */}
      {completed.length > 0 ? (
        <ProjectItem projectList={completed} projectType={completed} />
      ) : (
        ""
      )}

      {/* future Projects */}
      {future.length > 0 ? (
        <ProjectItem projectList={future} projectType={future} />
      ) : (
        ""
      )}
    </>
  );
};

export default Projects;
