import React, { useState, useEffect } from "react";
import Title from "../../../Common/Title";
import Button from "../../../Common/Button";
import DeleteDialog from "../../../Common/DeleteDialog";
import Projects from "../../Components/Projects";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { getBaseURL } from "../../../util/ulrUtil";

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [cookies] = useCookies(["userName"]);
  const [userName, setUserName] = useState("");

  const backendURL = getBaseURL();

  /**
   * set user name
   */
  useEffect(() => {
    setUserName(cookies.userName);
  }, [cookies.userName]);

  /**
   * Get Dash borad projects
   */
  useEffect(() => {
    fetch(`${backendURL}/api/project/getDashboardProject`, {
      headers: {
        authorization: `Bearer ${cookies.userToken}`,
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.projectList?.length > 0) {
          const finalObj = formatData(data.projectList);
          setProjects(finalObj);
        }
      })
      .catch((err) => console.log(err));
  }, []);

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
    const deleteDashBoardProject = () => {
      fetch(`${backendURL}/api/project/deleteDashboardProject/${id}`, {
        headers: {
          authorization: `Bearer ${cookies.userToken}`,
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.projectList?.length > 0) {
            const finalObj = formatData(data.projectList);
            setProjects(finalObj);
          } else {
            setProjects([]);
          }
        })
        .catch((err) => console.log(err));
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
    <div className="bg-light pt-5" style={{ marginTop: "90px" }}>
      {/* <div className='text-end'>
            <badge className="bg-light text-dark shadow rounded p-1">{userName ? (`You are logged as - ${userName}`):""}</badge>
        </div> */}
      <div className="row bg-light px-5">
        <div className="text-end d-flex justify-content-between">
          <Title title="Dashboard" cssClass="text-center fs-3" />
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

      <div className="row bg-light p-5 pt-0">
        {projects &&
          projects.map((project, index) => (
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
