import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ProjectTabs.css";

import Title from "../../../Common/Title";
import Gallery from "../../Pages/Gallery";
import { axiosClientServiceApi } from "../../../util/axiosUtil";
import HomeTab from "./HomeTab";
import Amenities from "./Amenities";
import Spefifications from "./Spefifications";
import Location from "./Location";
import Cost from "./Cost";

const ProjectTabs = () => {
  const location = useLocation();

  const [projects, setProjects] = useState(location.state.selectedPorject);
  const [projectid, setprojectid] = useState(location.state.projectid);
  // const [selectedProject, setSelectedProject] = useState(null)
  const [amenities, setAmenities] = useState({});
  const [projectImages, setProjectImages] = useState([]);
  const [projectHome, setProjectHome] = useState({});
  const [specifications, setSpecifications] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [priceImg, setPriceImg] = useState([]);
  const [planImg, setPlanImg] = useState([]);
  const [avlImg, setAvlImg] = useState([]);

  // console.log("projects", projects)

  useEffect(() => {
    getProjects(projectid);
  }, []);

  const getProjects = async (projectid) => {
    // const {value} = e.target
    const response = await axiosClientServiceApi.get(
      `/api/project/client/getSelectedProject/${projectid}`,
    );
    if (response?.status == 200) {
      // setSelectedProject("response", response.data);
      // console.log("Response Data images", response.data.imageData)
      setAmenities(response.data.amenitie);
      filtersImgPdfs(response.data.imageData, "images");
      filtersImgPdfs(response.data.imageData, "pdfs");
      filtersImgPdfs(response.data.imageData, "price");
      filtersImgPdfs(response.data.imageData, "plan");
      filtersImgPdfs(response.data.imageData, "avl");
      setProjectHome(response.data.project);
      setSpecifications(response.data.specificationData[0].specifications);
    }
  };

  const filtersImgPdfs = (data, type) => {
    if (type === "images") {
      // const imgs = data.filter( item => item.contentType === "jpg" || item.contentType === "jpeg" || item.contentType === "png");
      const imgs = data.filter((item) => item.category === "images");
      setProjectImages(imgs);
    }
    if (type === "pdfs") {
      const pdfs = data.filter((item) => item.category === "PDF");
      setPdfs(pdfs);
    }

    if (type === "price") {
      const priceImgs = data.filter((item) => item.category === "price");
      setPriceImg(priceImgs);
    }

    if (type === "plan") {
      const planImgs = data.filter((item) => item.category === "Plans");
      setPlanImg(planImgs);
    }

    if (type === "avl") {
      const avlImgs = data.filter((item) => item.category === "availability");
      setAvlImg(avlImgs);
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="row p-0 pt-4 projectTabs">
        <div className="col-md-12">
          <div className="d-flex justify-content-between align-items-center mt-5 mb-3">
            <Title
              title={projectHome.projectCategoryName}
              cssClass="blue-900 fs-5 fw-bold"
            />
            <select
              className="form-select shadow-lg border border-1 rounded-0 border-success w-25"
              aria-label="Default select example"
              id="projectStatus"
              onChange={(e) => getProjects(e.target.value)}
            >
              <option value="select">Select Project</option>
              {projects.length > 0
                ? projects.map((project) => (
                    <option value={project._id} key={project._id}>
                      {project.projectTitle}
                    </option>
                  ))
                : ""}
            </select>
          </div>

          <div className="col-md-12 mb-4">
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  className="nav-link active"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  HOME
                </button>
                <button
                  className="nav-link"
                  id="nav-gallery-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-gallery"
                  type="button"
                  role="tab"
                  aria-controls="nav-gallery"
                  aria-selected="false"
                >
                  GALLERY
                </button>
                <button
                  className="nav-link"
                  id="nav-specifications-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-specifications"
                  type="button"
                  role="tab"
                  aria-controls="nav-specifications"
                  aria-selected="false"
                >
                  SPECIFICATIONS
                </button>
                <button
                  className="nav-link"
                  id="nav-availability-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-availability"
                  type="button"
                  role="tab"
                  aria-controls="nav-availability"
                  aria-selected="false"
                >
                  AVAILABILITY
                </button>
                <button
                  className="nav-link"
                  id="nav-cost-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-cost"
                  type="button"
                  role="tab"
                  aria-controls="nav-cost"
                  aria-selected="false"
                >
                  COST
                </button>
                <button
                  className="nav-link"
                  id="nav-plan-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-plan"
                  type="button"
                  role="tab"
                  aria-controls="nav-plan"
                  aria-selected="false"
                >
                  PLAN
                </button>
                <button
                  className="nav-link"
                  id="nav-location-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-location"
                  type="button"
                  role="tab"
                  aria-controls="nav-location"
                  aria-selected="false"
                >
                  LOCATION
                </button>
                <button
                  className="nav-link"
                  id="nav-amenities-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-amenities"
                  type="button"
                  role="tab"
                  aria-controls="nav-amenities"
                  aria-selected="false"
                >
                  AMENITIES
                </button>
              </div>
            </nav>

            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <HomeTab
                  project={projectHome}
                  projectImages={projectImages}
                  pdfs={pdfs}
                />
              </div>
              <div
                className="tab-pane fade"
                id="nav-gallery"
                role="tabpanel"
                aria-labelledby="nav-gallery-tab"
              >
                <Gallery projectImages={projectImages} projTab="gallery" />
              </div>
              <div
                className="tab-pane fade"
                id="nav-specifications"
                role="tabpanel"
                aria-labelledby="nav-specifications-tab"
              >
                <Spefifications specifications={specifications} />
              </div>
              <div
                className="tab-pane fade"
                id="nav-availability"
                role="tabpanel"
                aria-labelledby="nav-availability-tab"
              >
                <Cost data={avlImg} />
              </div>
              <div
                className="tab-pane fade"
                id="nav-cost"
                role="tabpanel"
                aria-labelledby="nav-cost-tab"
              >
                <Cost data={priceImg} />
              </div>
              <div
                className="tab-pane fade"
                id="nav-plan"
                role="tabpanel"
                aria-labelledby="nav-plan-tab"
              >
                <Cost data={planImg} />
              </div>
              <div
                className="tab-pane fade"
                id="nav-location"
                role="tabpanel"
                aria-labelledby="nav-location-tab"
              >
                <Location amenities={amenities} />
              </div>
              <div
                className="tab-pane fade"
                id="nav-amenities"
                role="tabpanel"
                aria-labelledby="nav-amenities-tab"
              >
                <Amenities amenities={amenities} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTabs;
