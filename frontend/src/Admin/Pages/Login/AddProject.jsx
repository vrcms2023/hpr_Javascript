import React, { useState, useEffect } from "react";
import Title from "../../../Common/Title";
import Alert from "../../../Common/Alert";
import Button from "../../../Common/Button";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../Components/FileUpload";
import Specifications from "../../Components/Specifications";
import { Amenities, AmenitiesList } from "../../Components/Amenities";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

import CatageoryImgC from "../../../Common/CatageoryImgC";
import { getBaseURL } from "../../../util/ulrUtil";

const AddProject = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [projectType, setProjectType] = useState({});
  const [projectName, setProjectName] = useState("");
  const [defaultProjectType, setDefaultProjectType] = useState([]);
  const [cookies] = useCookies(["token", "userName"]);
  const [errorMessage, setErrorMessage] = useState("");
  const [newProject, setNewProject] = useState({});
  const [readOnlyTitle, setreadOnlyTitle] = useState("");
  const about = { aboutstitle: "", aboutussubtitle: "", description: "" };
  const [aboutUs, setAboutUs] = useState(about);
  const specificationKeys = { title: "", feature: "" };
  const amenitieKeys = { amenitie: "", feature: "", googleMap: "" };
  const [specifications, setSpecifications] = useState([specificationKeys]);
  const [amenities, setAmenities] = useState(amenitieKeys);
  const [pdfObject, setPdfObject] = useState([]);
  const [planObject, setPlanObject] = useState([]);
  const [availabileObject, setAvailabileObject] = useState([]);
  const [priceObject, setPriceObject] = useState([]);
  const [imgGallery, setImgGallery] = useState([]);
  const [projectStatus, setProjectStatus] = useState("");
  const { id } = useParams();

  const [percentValue, setPercentValue] = useState("");
  const options = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const handleSelectChange = (event) => {
    setPercentValue(event.target.value);
  };

  const backendURL = getBaseURL();

  /**
   * Get project type object
   */
  useEffect(() => {
    const getPorjectCategory = () => {
      fetch(`${backendURL}/api/projectCategory/projectCategoryList`, {
        headers: {
          authorization: `Bearer ${cookies.userToken}`,
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            setDefaultProjectType(data);
          } else {
            navigate("/login");
          }
        })
        .catch((err) => console.log(err));
    };
    getPorjectCategory();
  }, [cookies]);

  /**
   * Select Porject type handler
   */
  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    const obj = defaultProjectType.filter((obj) => {
      return obj.value === value;
    });
    if (obj.length > 0) {
      setProjectType(obj);
    } else {
      alert("select status");
    }
  };

  /**
   *  Project input title handler
   */
  const titleInputHandleChange = (e) => {
    const title = e.target.value;
    setProjectName(title);
  };

  const changeHandler = (e) => {
    setAboutUs({ ...aboutUs, [e.target.name]: e.target.value });
  };

  /**
   * project status object
   */

  const getProjectStatus = () => {
    return {
      projectCategoryID: projectType[0]._id,
      projectCategoryName: projectType[0].label,
      projectCategoryValue: projectType[0].value,
    };
  };

  /**
   * about us status  object
   */

  const getAboutUsStatus = () => {
    return {
      aboutstitle: aboutUs.aboutstitle,
      aboutussubtitle: aboutUs.aboutussubtitle,
      description: aboutUs.description,
    };
  };

  /**
   * Add project handler
   */
  async function addNewProject(event) {
    const project = {
      ...getProjectStatus(),
      projectTitle: projectName,
      createdBy: cookies.userName,
      userID: cookies.userId,
      status: projectType[0].label,
      isActive: true,
    };

    try {
      const res = await fetch(`${backendURL}/api/project/addProject`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${cookies.userToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(project),
      });
      const data = await res.json();
      setNewProject(data.project);
      setProjectStatus(data.project.projectCategoryName);
      setreadOnlyTitle(data.project.projectTitle);
      setShow(true);
      setErrorMessage(data.message);
    } catch (err) {
      setErrorMessage(err);
    }
  }

  /**
   * get selected Project for edit
   */
  useEffect(() => {
    const getSelectedProject = () => {
      fetch(`${backendURL}/api/project/findById/${id}`, {
        headers: {
          authorization: `Bearer ${cookies.userToken}`,
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProjectType([
            {
              label: data.project.projectCategoryName,
              value: data.project.projectCategoryValue,
              _id: data.project.projectCategoryID,
            },
          ]);
          setProjectStatus(data.project.projectCategoryName);
          setNewProject(data.project);
          const title = data.project.projectTitle;
          setreadOnlyTitle(title);
          setProjectName(title);
          const aboutus = {
            aboutstitle: data.project.aboutstitle,
            aboutussubtitle: data.project.aboutussubtitle,
            description: data.project.description,
          };
          setAboutUs(aboutus);
          setPercentValue(Number(data.project.percentValue));
          setShow(true);
          setErrorMessage(data.message);
        })
        .catch((err) => console.log(err));
    };
    if (id) {
      getSelectedProject();
    }
  }, [cookies, id]);

  function saveProject() {
    updateProjectBasicDetails();
    saveSpecifications();
    saveAmenities();
    navigate("/dashboard");
  }

  /**
   * update Project Basic details
   */
  async function updateProjectBasicDetails(event) {
    const projectProps = {
      ...newProject,
      ...getProjectStatus(),
      ...getAboutUsStatus(),
      projectTitle: projectName,
      updatedBy: cookies.userName,
      percentValue: percentValue,
    };

    try {
      const res = await fetch(`${backendURL}/api/project/updateProject`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${cookies.userToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(projectProps),
      });
      setProjectName("");
      setAboutUs({ about });
    } catch (err) {
      setErrorMessage(err);
    }
  }

  /**
   * Save specification
   */
  async function saveSpecifications() {
    const specification = {
      projectID: newProject._id,
      updatedBy: cookies.userName,
      specifications: specifications,
    };
    try {
      const res = await fetch(
        `${backendURL}/api/specification/addAndUpdateSpecifications`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${cookies.userToken}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify(specification),
        },
      );
      const data = await res.json();
      if (data.message === "Success") {
        setSpecifications([specificationKeys]);
      }
      setErrorMessage(data.message);
    } catch (err) {
      setErrorMessage(err);
    }
  }

  /**
   * Save Amenities
   */
  async function saveAmenities() {
    const amenitiesObj = {
      projectID: newProject._id,
      updatedBy: cookies.userName,
      amenitieslist: amenities,
    };
    try {
      const res = await fetch(
        `${backendURL}/api/amenities/addAndUpdateAmenities`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${cookies.userToken}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify(amenitiesObj),
        },
      );
      const data = await res.json();
      if (data.message === "Success") {
        setAmenities(amenitieKeys);
      }
      setErrorMessage(data.message);
    } catch (err) {
      setErrorMessage(err);
    }
  }

  return (
    <div className="bg-light pt-5" style={{ marginTop: "90px" }}>
      <div className="row bg-light px-5">
        <div className="text-end d-flex justify-content-between">
          <Title
            title={`${id ? "Edit Project" : "Add Project"}`}
            cssClass="text-center fs-3"
          />
          <div>
            <Button
              type=""
              cssClass="btn btn-success me-3"
              label="Dashboard"
              handlerChange={() => navigate("/dashboard")}
            />
            <Button
              type=""
              cssClass="btn btn-secondary "
              label="Back to Menu"
              handlerChange={() => navigate("/main")}
            />
          </div>
        </div>
      </div>
      <hr />

      {/* <Alert mesg="Project Added Successfully" cssClass="alert alert-success text-center m-auto fs-5 w-50 "/> */}

      <div className="py-2">
        {!id ? (
          <select
            className="form-select shadow-lg border border-2 border-success w-25 m-auto d-block"
            aria-label="Default select example"
            id="projectStatus"
            onChange={(e) => handleChange(e)}
          >
            <option>Select Project Type</option>
            {defaultProjectType?.length
              ? defaultProjectType?.map((option, index) => {
                  return (
                    <option key={option._id} value={option.value}>
                      {option.label}
                    </option>
                  );
                })
              : ""}
          </select>
        ) : (
          ""
        )}
      </div>
      <hr />
      {projectType.length > 0 && !show ? (
        <div className="row" id="projectTitle">
          <div> {errorMessage} </div>
          <div className="col-md-4 offset-md-4 my-5 ">
            <div className="">
              {/* <label htmlFor="projectName" className="form-label text-center d-block fs-5 mb-3 fw-normal">Add project name</label> */}
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  name="projectName"
                  value={projectName}
                  onChange={titleInputHandleChange}
                  id="projectName"
                  placeholder="Add project name"
                />
                <Button
                  label="Save"
                  cssClass="btn btn-success mt-2 w-100"
                  handlerChange={addNewProject}
                />
              </div>
              <small id="projectValidation" className="d-none error">
                Project name should not be empty.
              </small>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {show ? (
        <>
          <div className="row bg-light px-5 mt-3 shadow-lg">
            {readOnlyTitle && (
              <h3 className="my-4 text-success">
                {readOnlyTitle}{" "}
                <span
                  className="badge bg-warning text-dark"
                  style={{ fontSize: ".8rem" }}
                >
                  {" "}
                  {projectStatus.toUpperCase()} PROJECT
                </span>
              </h3>
            )}

            <div className="col-md-3 bg-light pb-3">
              <div
                className="nav flex-column nav-pills "
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <button
                  className="nav-link active mb-3"
                  id="v-pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-home"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-home"
                  aria-selected="true"
                >
                  Info
                </button>
                <button
                  className="nav-link mb-3"
                  id="v-pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-profile"
                  aria-selected="false"
                >
                  Pdfs / Plan / Map / Cost / Availability
                </button>
                <button
                  className="nav-link mb-3"
                  id="v-pills-messages-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-messages"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                >
                  Specifications
                </button>
                <button
                  className="nav-link mb-3"
                  id="v-pills-settings-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-settings"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-settings"
                  aria-selected="false"
                >
                  Amenities
                </button>

                <button
                  className="nav-link mb-3"
                  id="v-pills-settings-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-gallery"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-gallery"
                  aria-selected="false"
                >
                  Image Gallery
                </button>

                {/* <button className="nav-link mb-3" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-cost" type="button" role="tab" aria-controls="v-pills-cost" aria-selected="false">Cost</button>
                <button className="nav-link mb-3" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-availability" type="button" role="tab" aria-controls="v-pills-availability" aria-selected="false">Availability</button> */}
              </div>
            </div>
            <div className="col-md-9 bg-light pb-3">
              <div className="tab-content" id="v-pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  <div className="border border-3 p-5 mb-4 shadow-lg">
                    <div className="mb-3">
                      <label htmlFor="projectName" className="form-label  ">
                        Project Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={projectName}
                        onChange={titleInputHandleChange}
                        id="projectName"
                        placeholder="Add Project Name"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="projectStatus" className="form-label  ">
                        Status
                      </label>
                      <select
                        value={projectType[0]?.value}
                        className="form-select mb-3 w-100"
                        aria-label="Default select example"
                        id="projectStatus"
                        onChange={(e) => handleChange(e)}
                      >
                        <option>Select Status</option>
                        {defaultProjectType?.length
                          ? defaultProjectType?.map((option, index) => {
                              return (
                                <option key={option._id} value={option.value}>
                                  {option.label}
                                </option>
                              );
                            })
                          : ""}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="projectStatus" className="form-label  ">
                        Project % Completed
                      </label>
                      <select
                        value={percentValue}
                        className="form-select mb-3 w-100"
                        aria-label="Default select example"
                        id="projectStatus"
                        onChange={(e) => handleSelectChange(e)}
                      >
                        <option>Select Status</option>
                        {options.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="projectDescription"
                        className="form-label"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="aboutstitle"
                        value={aboutUs.aboutstitle}
                        onChange={changeHandler}
                        id="aboutstitle"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="projectDescription"
                        className="form-label"
                      >
                        Sub Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="aboutussubtitle"
                        value={aboutUs.aboutussubtitle}
                        onChange={changeHandler}
                        id="aboutussubtitle"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="projectDescription"
                        className="form-label  "
                      >
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={aboutUs.description}
                        onChange={changeHandler}
                        id="projectDescription"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* DOCUMENTS */}
                <div
                  className="tab-pane fade"
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                >
                  <div className="mb-3">
                    <label className="form-label">Add PDF's</label>
                    <FileUpload
                      project={newProject}
                      updatedBy={cookies.userName}
                      category="PDF"
                      gallerysetState={setPdfObject}
                      galleryState={pdfObject}
                      validTypes="application/pdf"
                    />
                    <CatageoryImgC
                      title={`${readOnlyTitle} PDF's`}
                      catategoryImgs={pdfObject}
                      catategoryImgState={setPdfObject}
                      project={newProject}
                      category="PDF"
                      cssClass="thumb75 mb-5 shadow-lg border border-5 border-warning rounded-5"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Add Plan</label>
                    <FileUpload
                      project={newProject}
                      updatedBy={cookies.userName}
                      category="Plans"
                      gallerysetState={setPlanObject}
                      galleryState={planObject}
                      validTypes="image/png,image/jpeg"
                    />
                    <CatageoryImgC
                      title={`${readOnlyTitle} Plans`}
                      catategoryImgs={planObject}
                      catategoryImgState={setPlanObject}
                      project={newProject}
                      category="Plans"
                      cssClass="thumb75 mb-5 shadow-lg border border-5 border-warning rounded-5"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Add Availability</label>
                    <FileUpload
                      project={newProject}
                      updatedBy={cookies.userName}
                      category="availability"
                      gallerysetState={setAvailabileObject}
                      galleryState={availabileObject}
                      validTypes="image/png,image/jpeg,application/pdf"
                    />
                    <CatageoryImgC
                      title={`${readOnlyTitle} Availibility`}
                      catategoryImgs={availabileObject}
                      catategoryImgState={setAvailabileObject}
                      project={newProject}
                      category="availability"
                      cssClass="thumb75 mb-5 shadow-lg border border-5 border-warning rounded-5"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Add Price</label>
                    <FileUpload
                      title=""
                      project={newProject}
                      updatedBy={cookies.userName}
                      category="price"
                      gallerysetState={setPriceObject}
                      galleryState={priceObject}
                      validTypes="image/png,image/jpeg,application/pdf"
                    />
                    <CatageoryImgC
                      title={`${readOnlyTitle} Price`}
                      catategoryImgs={priceObject}
                      catategoryImgState={setPriceObject}
                      project={newProject}
                      category="price"
                      cssClass="thumb75 mb-5 shadow-lg border border-5 border-warning rounded-5"
                    />
                  </div>

                  {/* Add GOOGLE MAP  */}
                  <div className="mb-3">
                    <label className="form-label">Add Google Map</label>
                    <Amenities
                      title=""
                      value={amenities?.googleMap}
                      amenities={amenities}
                      setAmenities={setAmenities}
                      name="googleMap"
                    />
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-messages"
                  role="tabpanel"
                  aria-labelledby="v-pills-messages-tab"
                >
                  {/* Add SPECIFICATIONS */}
                  <Specifications
                    title="Specifications"
                    project={newProject}
                    setSpecifications={setSpecifications}
                    specifications={specifications}
                  />
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-settings"
                  role="tabpanel"
                  aria-labelledby="v-pills-settings-tab"
                >
                  {/* Add AMENITIES */}
                  <AmenitiesList
                    project={newProject}
                    amenities={amenities}
                    setAmenities={setAmenities}
                  />
                </div>

                <div
                  className="tab-pane fade"
                  id="v-pills-gallery"
                  role="tabpanel"
                  aria-labelledby="v-pills-gallery-tab"
                >
                  <FileUpload
                    title="Add Images"
                    project={newProject}
                    updatedBy={cookies.userName}
                    category="images"
                    gallerysetState={setImgGallery}
                    galleryState={imgGallery}
                    validTypes="image/png,image/jpeg"
                  />
                  <CatageoryImgC
                    title={`${readOnlyTitle} Image Gallery`}
                    catategoryImgs={imgGallery}
                    catategoryImgState={setImgGallery}
                    project={newProject}
                    category="images"
                    cssClass="thumb75 mb-5 shadow-lg border border-5 border-warning rounded-5"
                  />
                  {/* <CatageoryImgC title="Future Projects" thumbDelete={thumbDelete}catategoryImgs={onFutureImgs} cssClass="thumb75 mb-5 shadow-lg border border-5 border-success rounded-5" /> */}
                  {/* <CatageoryImgC title="Completed Projects" thumbDelete={thumbDelete} catategoryImgs={onCompletedImgs} cssClass="thumb75 mb-5 shadow-lg border border-5 border-secondary rounded-5" /> */}
                </div>

                {/* <div className="tab-pane fade" id="v-pills-cost" role="tabpanel" aria-labelledby="v-pills-cost-tab">COST</div> */}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-center py-3">
              <Button
                type="submit"
                cssClass="btn btn btn-outline-secondary"
                label="Cancel"
                handlerChange={() => navigate("/dashboard")}
              />
              <Button
                type="submit"
                cssClass="btn btn btn-outline-secondary mx-2"
                label="Reset"
              />
              <Button
                type="submit"
                cssClass="btn  btn-success"
                label="Save Project"
                handlerChange={saveProject}
              />
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
export default AddProject;
