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
  const [projectStatus, setProjectStatus] = useState("");
  const dispatch = useDispatch();
  /**
   * Get Dash borad projects
   */
  useEffect(() => {
    dispatch(getDashBoardProjects());
  }, []);

  useEffect(() => {
    if (projects && projects?.projectList?.length > 0) {
      const finalObj = formatData(projects.projectList);
      setProjectStatus(finalObj);
    }
  }, [projects]);

  /**
   * Format dashboard data
   */
  const formatData = (data) => {
    const arrObj = [];
    const projectArray = [];
    let unique_values = [
      ...new Set(data.map((element) => element.projectCategoryID)),
    ];
    unique_values.forEach((item) => {
      arrObj[item] = data.filter((res) => res.projectCategoryID === item);
    });
    unique_values.forEach((item) => {
      projectArray.push(arrObj[item]);
    });
    return projectArray;
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
        const finalObj = formatData(response.data.projectList);
        setProjectStatus(finalObj);
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

  return (
    <div className="" style={{ marginTop: "150px" }}>
      {/* <div className='text-end'>
            <badge className="bg-light text-dark shadow rounded p-1">{userName ? (`You are logged as - ${userName}`):""}</badge>
        </div> */}
      <div className="row px-5">
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

      <div className="row p-5 pt-0">
        {projectStatus &&
          projectStatus.map((project, index) => (
            <div className="col-md-4" key={index}>
              <Projects
                key={index}
                title={project[0].projectCategoryName}
                cssClass="text-success"
                projects={project}
                handleProjectDelete={handleProjectDelete}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
export default Dashboard;
