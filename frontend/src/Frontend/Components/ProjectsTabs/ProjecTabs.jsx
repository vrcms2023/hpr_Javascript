import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProjectTabs.css";

import Title from "../../../Common/Title";
import Gallery from "../../Pages/Gallery";
import { axiosClientServiceApi } from "../../../util/axiosUtil";
import HomeTab from "./HomeTab";
import Amenities from "./Amenities";
import Spefifications from "./Spefifications";
import Location from "./Location";
import Cost from "./Cost";
import Button from "../../../Common/Button";
import moment from "moment";
import { getImagesByDate } from "../../../util/dataFormatUtil";

const ProjectTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
  const [projectTitle, setProjectTitle] = useState("");

  useEffect(() => {
    getProjects(projectid);
  }, []);

  const getProjects = async (projectid) => {
    // const {value} = e.target
    const response = await axiosClientServiceApi.get(
      `/api/project/client/getSelectedProject/${projectid}`,
    );
    if (response?.status == 200) {
      const projectData = response.data;
      setProjectTitle(projectData.project.projectTitle);
      setprojectid(projectData.project._id);
      setProjectHome(projectData.project);
      setAmenities(projectData.amenitie);
      filtersImgPdfs(projectData, "images");
      filtersImgPdfs(projectData, "pdfs");
      filtersImgPdfs(projectData, "price");
      filtersImgPdfs(projectData, "plan");
      filtersImgPdfs(projectData.imageData, "avl");
      setSpecifications(projectData?.specificationData[0]?.specifications);
    }
  };

  const filtersImgPdfs = (proj, type) => {
    const data = proj.imageData;
    if (type === "images") {
      // const imgs = data.filter( item => item.contentType === "jpg" || item.contentType === "jpeg" || item.contentType === "png");
      const imgs = data.filter((item) => item.category === "images");
      const sortImages = getImagesByDate(imgs);
      const project = [
        {
          ...proj.project,
          imgs: sortImages,
        },
      ];
      setProjectImages(project);
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
          <Button
            type=""
            cssClass={"loadMore"}
            label="Back to projects"
            handlerChange={() => {
              navigate("/projects");
            }}
          />
          <div className="d-flex justify-content-between align-items-center mt-5 mb-3">
            <Title
              title={projectHome.projectCategoryName}
              subTitle={projectTitle}
              cssClass="blue-900 fs-5 fw-bold"
            />
            <select
              className="form-select shadow-lg border border-1 rounded-0 border-success w-25"
              aria-label="Default select example"
              id="projectStatus"
              value={projectid}
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
                {projectImages?.length > 0 ? (
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
                ) : (
                  ""
                )}
                {specifications?.length > 0 ? (
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
                ) : (
                  ""
                )}
                {avlImg?.length > 0 ? (
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
                ) : (
                  ""
                )}

                {priceImg?.length > 0 ? (
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
                ) : (
                  ""
                )}

                {planImg?.length > 0 ? (
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
                ) : (
                  ""
                )}

                {amenities?.googleMap ? (
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
                ) : (
                  ""
                )}

                {amenities?.amenitie || amenities?.feature ? (
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
                ) : (
                  ""
                )}
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
              {projectImages?.length > 0 ? (
                <div
                  className="tab-pane fade"
                  id="nav-gallery"
                  role="tabpanel"
                  aria-labelledby="nav-gallery-tab"
                >
                  <Gallery projectImages={projectImages} />
                </div>
              ) : (
                ""
              )}

              {specifications?.length > 0 ? (
                <div
                  className="tab-pane fade"
                  id="nav-specifications"
                  role="tabpanel"
                  aria-labelledby="nav-specifications-tab"
                >
                  <Spefifications specifications={specifications} />
                </div>
              ) : (
                ""
              )}

              {avlImg?.length > 0 ? (
                <div
                  className="tab-pane fade"
                  id="nav-availability"
                  role="tabpanel"
                  aria-labelledby="nav-availability-tab"
                >
                  <Cost data={avlImg} />
                </div>
              ) : (
                ""
              )}
              {priceImg?.length > 0 ? (
                <div
                  className="tab-pane fade"
                  id="nav-cost"
                  role="tabpanel"
                  aria-labelledby="nav-cost-tab"
                >
                  <Cost data={priceImg} />
                </div>
              ) : (
                ""
              )}
              {planImg?.length > 0 ? (
                <div
                  className="tab-pane fade"
                  id="nav-plan"
                  role="tabpanel"
                  aria-labelledby="nav-plan-tab"
                >
                  <Cost data={planImg} />
                </div>
              ) : (
                ""
              )}
              {amenities?.googleMap ? (
                <div
                  className="tab-pane fade"
                  id="nav-location"
                  role="tabpanel"
                  aria-labelledby="nav-location-tab"
                >
                  <Location amenities={amenities} />
                </div>
              ) : (
                ""
              )}
              {amenities?.amenitie || amenities?.feature ? (
                <div
                  className="tab-pane fade"
                  id="nav-amenities"
                  role="tabpanel"
                  aria-labelledby="nav-amenities-tab"
                >
                  <Amenities amenities={amenities} />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTabs;
