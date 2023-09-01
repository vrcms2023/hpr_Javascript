import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../../Common/Title";
import Button from "../../../Common/Button";
import DeleteDialog from "../../../Common/DeleteDialog";
import Projects from "../../Components/Projects";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { axiosServiceApi } from "../../../util/axiosUtil";
import { getDashBoardProjects } from "../../../features/project/projectActions";

const Dashboard = () => {
  const navigate = useNavigate();
  const { projects, error } = useSelector((state) => state.dashBoardProjects);
  const [liveProjects, setLiveProject] = useState([]);
  const [archiveProject, setArchiveProject] = useState([]);
  const [pubishProject, setpubishProject] = useState([]);
  const [publishProjecstStatus, setPublishProjectsStatus] = useState(false);
  const [liveProjectsStatus, setliveProjectsStatus] = useState(false);
  const [archiveProjectsStatus, setArchiveProjectStatus] = useState(false);
  const dispatch = useDispatch();

  console.log("liveProjects", liveProjects, liveProjects.length);
  // console.log("archiveProject", archiveProject)
  /**
   * Get Dash borad projects
   */
  useEffect(() => {
    dispatch(getDashBoardProjects());
  }, []);

  useEffect(() => {
    if (projects && projects?.projectList?.length > 0) {
      updateProjects(projects.projectList);
    }
  }, [projects]);

  const updateProjects = (projects) => {
    const finalObj = formatData(projects);
    setLiveProject(finalObj.liveProject);
    setArchiveProject(finalObj.archiveProject);
    setpubishProject(finalObj.publishedProject);
    GetProjectsListStatus(finalObj.liveProject, setliveProjectsStatus);
    GetProjectsListStatus(finalObj.liveProject, setPublishProjectsStatus);
    GetProjectsListStatus(finalObj.liveProject, setArchiveProjectStatus);
  };

  const GetProjectsListStatus = (list, setObjectState) => {
    setObjectState(
      list.completed.length > 0 &&
        list.future.length > 0 &&
        list.ongoing.length > 0
        ? true
        : false,
    );
  };

  /**
   * Format dashboard data
   */
  const formatData = (data) => {
    let publishedProject = data.filter((res) => res.publish);
    let notPublished = data.filter((res) => !res.publish);
    let liveProject = notPublished.filter((res) => res.isActive);
    let archiveProject = notPublished.filter((res) => !res.isActive);

    liveProject = getCategoryPorjectList(liveProject);
    publishedProject = getCategoryPorjectList(publishedProject);
    archiveProject = getCategoryPorjectList(archiveProject);

    return {
      liveProject,
      archiveProject,
      publishedProject,
    };
  };

  const getCategoryPorjectList = (data) => {
    const projList = [];

    data.map((proj) => {
      if (!projList[proj.projectCategoryValue]) {
        projList[proj.projectCategoryValue] = [];
      }
      projList[proj.projectCategoryValue].push(proj);
    });

    return projList;
  };

  /**
   * Delete project form Dashboard
   * @param {project id} id
   */

  const handleProjectDelete = (project, id) => {
    const deleteDashBoardProject = async () => {
      const response = await axiosServiceApi.get(
        `/api/project/deleteDashboardProject/${id}`,
      );
      if (response.data?.projectList?.length > 0) {
        toast.success(`${project.projectTitle} project Deleted`);
        updateProjects(response.data.projectList);
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteDashBoardProject}
            projectName={project.projectTitle}
          />
        );
      },
    });
  };

  /**
   * Delete project form Dashboard
   * @param {project id} id
   */

  const reStoreProject = (project, id) => {
    const reStoreDashBoardProject = async () => {
      const response = await axiosServiceApi.get(
        `/api/project/reStoreDashboardProject/${id}`,
      );
      if (response.data?.projectList?.length > 0) {
        toast.success(`${project.projectTitle} project restore successfully`);
        updateProjects(response.data.projectList);
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={reStoreDashBoardProject}
            projectName={project.projectTitle}
            label={"restore"}
          />
        );
      },
    });
  };

  return (
    <div className="container-fluid" style={{ marginTop: "150px" }}>
      {/* <div className='text-end'>
            <badge className="bg-light text-dark shadow rounded p-1">{userName ? (`You are logged as - ${userName}`):""}</badge>
        </div> */}
      <div className="row px-5 mb-3">
        <div className="text-end d-flex justify-content-between align-items-center">
          <Title title="Dashboard" cssClass="text-center blue-500 fs-4" />
          <div>
            <Button
              type=""
              cssClass="btn btn-success me-3"
              label="Add New Project"
              handlerChange={() => navigate("/addproject")}
            />
            {/* <Button type="" cssClass="btn btn-success" label="User Admin" handlerChange={() => navigate("/userAdmin")} /> */}
            {/* <Button type="submit" cssClass="btn btn-success" label="Application Pages" handlerChange={() => navigate("/applicationPages")} /> */}
            <Button
              type=""
              cssClass="btn btn-secondary"
              label="Back to Menu"
              handlerChange={() => navigate("/main")}
            />
          </div>
        </div>
      </div>
      {/* <hr /> */}

      <div className="row p-5 py-4">
        <Title
          title={"Published projects"}
          cssClass="text-center fw-bolder mb-2 fs-5 text-uppercase green-900"
        />
        <hr className="border-dark" />
        {publishProjecstStatus ? (
          <Projects
            project={pubishProject}
            handleProjectDelete={handleProjectDelete}
          />
        ) : (
          "Add new Project and publish "
        )}
      </div>

      {/* Saved / Ready to publish */}
      {liveProjectsStatus ? (
        <div className="row p-5 pt-0">
          <Title
            title={"Saved / Ready to publish"}
            cssClass="text-center fw-bolder pt-4 text-uppercase  mb-2 fs-5 green-900"
          />
          <hr className="border-dark" />
          <Projects
            project={liveProjects}
            handleProjectDelete={handleProjectDelete}
          />
        </div>
      ) : (
        ""
      )}

      {archiveProjectsStatus ? (
        <div className="row p-5 py-3 bg-gray-light">
          <Title
            title={"Archive projects"}
            cssClass="text-center fw-bolder pt-4 text-uppercase  mb-2 fs-4 gray-900"
          />
          <hr className="border-dark" />
          <Projects
            project={archiveProject}
            handleProjectDelete={reStoreProject}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Dashboard;
