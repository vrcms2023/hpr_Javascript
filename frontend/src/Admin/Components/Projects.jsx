import React from "react";
import Title from "../../Common/Title";
import { Link } from "react-router-dom";

const Projects = ({ title, cssClass, projects, handleProjectDelete }) => {
  return (
    <>
      <Title
        title={title}
        cssClass="text-start fw-bold pt-4 mb-3 fs-6 text-dark"
      />
      <table className={`table table-hover border `}>
        <thead>
          <tr className="">
            <th scope="col" className="py-2 bg-light fw-normal text-dark">
              Name
            </th>
            <th scope="col" className="py-2 bg-light fw-normal text-dark">
              Status
            </th>
            <th
              scope="col"
              colSpan={2}
              className="py-2 bg-light fw-normal text-dark"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map((project) => (
              <tr key={project._id}>
                {/* <td className='align-middle fw-bold'>{project._id}</td> */}
                <td className="align-middle">
                  {project.projectTitle}{" "}
                  <span
                    className={`badge text-dark bg-${
                      project.projectCategoryValue === "ongoing"
                        ? "warning"
                        : project.projectCategoryValue === "future"
                        ? "info "
                        : project.projectCategoryValue === "completed"
                        ? "success text-white"
                        : ""
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="align-middle">
                  <span
                    class={`badge fw-normal ${
                      project.percentValue === "0"
                        ? "bg-info"
                        : project.percentValue === "100"
                        ? "bg-success"
                        : "bg-warning"
                    }`}
                  >
                    {project.percentValue} %
                  </span>
                </td>
                <td className="align-middle">
                  <Link to={`/editproject/${project._id}`}>
                    <i
                      className="fa fa-pencil-square-o fs-4 text-muted me-4"
                      aria-hidden="true"
                      title="Edit"
                    ></i>
                  </Link>
                  <Link
                    to=""
                    onClick={() => handleProjectDelete(project, project._id)}
                  >
                    <i
                      className="fa fa-trash-o fs-4 text-danger"
                      aria-hidden="true"
                      title="Delete"
                    ></i>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>
                <p className="text-center text-dark fw-bold">
                  No projects found, Add a new project
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Projects;
