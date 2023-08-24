import React, { useEffect, useState } from "react";
import Title from "../../Common/Title";
import BriefIntro from "../../Common/BriefIntro";
import { useDispatch, useSelector } from "react-redux";
import { getClientProjects } from "../../features/project/clientProjectActions";

import "./Projects.css";
import ProjectItem from "../Components/projectItem";
import { dataFormatedByCatergoryName } from "../../util/dataFormatUtil";

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
      dataFormatedByCatergoryName;
      const projectList = dataFormatedByCatergoryName(clientProjects);
      setCompleted(projectList.completed);
      setFuture(projectList.future);
      setOngoing(projectList.ongoing);
    }
  }, [clientProjects]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="headerBottomMargin">
        <div className=" banner projectBanner"></div>
      </div>

      {/* Introduction */}
      <BriefIntro title="Welcome To HPR Infra Projects">
        We believe that construction is a man made wonder. The thought of
        bringing imagination to real life structures excites us, each day the
        passion in us grows as we contribute to this industry.
      </BriefIntro>

      {ongoing?.length > 0 ? (
        <ProjectItem projectList={ongoing} projectType={ongoing} />
      ) : (
        ""
      )}

      {/* Completed Projects */}
      {completed?.length > 0 ? (
        <ProjectItem projectList={completed} projectType={completed} />
      ) : (
        ""
      )}

      {/* future Projects */}
      {future?.length > 0 ? (
        <ProjectItem projectList={future} projectType={future} />
      ) : (
        ""
      )}
    </>
  );
};

export default Projects;
