import React, { useState, useEffect } from "react";
import CatageoryImgC from "../../../Common/CatageoryImgC";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../Components/FileUpload";
import Button from "../../../Common/Button";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../Common/DeleteDialog";
import Title from "../../../Common/Title";
import Error from "../../Components/Error";
import { axiosServiceApi } from "../../../util/axiosUtil";
import { toast } from "react-toastify";
import { getCookie } from "../../../util/cookieUtil";

export const AdminTestimonial = () => {
  const navigate = useNavigate();
  const [testimonialObject, setTestimonialObject] = useState([]);
  const [testimonialProject, setTestimonialProject] = useState({
    _id: uuidv4(),
  });
  const testimonialKeys = { title: "", description: "" };
  const [testimonialState, setTestimonialState] = useState(testimonialKeys);
  const [errorMessage, setErrorMessage] = useState("");
  const [editState, setEditState] = useState(false);
  const [id, setID] = useState("");
  const [userName, setUserName] = useState("");
  const [disabledFile, setDisabledFile] = useState(false);

  useEffect(() => {
    setUserName(getCookie("userName"));
  }, []);

  const changeHandler = (e) => {
    setTestimonialState({
      ...testimonialState,
      [e.target.name]: e.target.value,
    });
  };

  const [testimonialList, setTestimonialList] = useState([]);

  const getTestimonialList = async () => {
    const response = await axiosServiceApi.get(
      `/api/testimonial/getTestimonialList`,
    );
    if (response?.status == 200 && response.data?.testimonial?.length > 0) {
      setTestimonialList(response.data.testimonial);
    } else {
      setTestimonialList([]);
    }
  };

  useEffect(() => {
    getTestimonialList();
  }, []);

  useEffect(() => {
    if (testimonialObject.length > 0) {
      setDisabledFile(true);
    } else {
      setDisabledFile(false);
    }
  }, [testimonialObject]);

  const saveTestimonial = async () => {
    const testimonial = {
      projectID: testimonialProject._id,
      title: testimonialState.title,
      description: testimonialState.description,
      imageId: testimonialObject[0]?._id ? testimonialObject[0]._id : "",
      originalname: testimonialObject[0]?.originalname
        ? testimonialObject[0].originalname
        : "",
      imageUrl: testimonialObject[0]?.path ? testimonialObject[0].path : "",
      updateBy: userName,
      _id: id,
    };
    const testimonialURL = editState
      ? `/api/testimonial/updateTestimonial`
      : `/api/testimonial/addTestimonial`;

    try {
      const response = await axiosServiceApi.post(testimonialURL, {
        ...testimonial,
      });
      if (response?.status == 200) {
        toast(
          `${testimonialState.title} news ${editState ? "Update" : "created"}`,
        );
        setEditState(false);
        setTestimonialState(testimonialKeys);
        setTestimonialObject([]);
        getTestimonialList();
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      toast("Unable to save the testimonial");
    }
  };

  const handleNewsEdit = (event, testimonial) => {
    event.preventDefault();
    const {
      imageId,
      projectID,
      originalname,
      imageUrl,
      description,
      title,
      _id,
    } = testimonial;

    const testimonialObj = {
      title: title,
      description: description,
    };
    setTestimonialProject({ _id: projectID });
    setTestimonialState(testimonialObj);
    setEditState(true);
    setID(_id);
    window.scrollTo(0, 0);
  };

  const handleNewsDelete = (event, testimonial) => {
    event.preventDefault();
    const deleteSelectedNews = async () => {
      const response = await axiosServiceApi.get(
        `/api/testimonial/deleteSelectedTestimonial/${testimonial._id}`,
      );
      if (response.status !== 200) {
        setErrorMessage(data.message);
        toast("Unable to Delete testimonial");
      }
      if (response.status == 200 && response?.data?.testimonial?.acknowledged) {
        toast(`${testimonial.title} testimonial deleted`);
        setEditState(false);
        setTestimonialState(testimonialKeys);
        setTestimonialObject([]);
        getTestimonialList();
      }
    };
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteSelectedNews}
            projectName={testimonial.title}
          />
        );
      },
    });
  };

  return (
    <div className="bg-light pt-5" style={{ marginTop: "90px" }}>
      <div className="row bg-light px-5">
        <div className="text-end d-flex justify-content-between">
          <Title title={"Testimonial"} cssClass="text-center fs-3" />
          <Button
            type="submit"
            cssClass="btn btn-secondary"
            label="Back to Menu"
            handlerChange={() => navigate("/main")}
          />
        </div>
      </div>

      <div className="row bg-light px-5 mt-3 pt-5 shadow-lg">
        <div className="tab-content" id="v-pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="v-pills-news"
            role="tabpanel"
            aria-labelledby="v-pills-news-tab"
          >
            <div className="border border-3 p-5 mb-4 shadow-lg">
              {errorMessage && <Error>{errorMessage}</Error>}
              <div className="mb-3">
                <label htmlFor="projectDescription" className="form-label  ">
                  Testimonial Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={testimonialState.title}
                  onChange={changeHandler}
                  id="title"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="projectDescription" className="form-label  ">
                  Testimonial Description
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  value={testimonialState.description}
                  onChange={changeHandler}
                  id="projectDescription"
                  rows="3"
                ></textarea>
              </div>
              <div className="mb-3">
                <FileUpload
                  title="Testimonial Images"
                  project={testimonialProject}
                  updatedBy={userName}
                  category="testimonial"
                  gallerysetState={setTestimonialObject}
                  galleryState={testimonialObject}
                  validTypes="image/png,image/jpeg"
                  disabledFile={disabledFile}
                />

                <CatageoryImgC
                  title={`Testimonial Image`}
                  catategoryImgs={testimonialObject}
                  catategoryImgState={setTestimonialObject}
                  project={testimonialProject}
                  category="testimonial"
                  cssClass="thumb75 mb-5 shadow-lg border border-5 border-warning rounded-5"
                />
              </div>
              <div className="text-center">
                <Button
                  type="submit"
                  cssClass="btn  btn-success"
                  label={editState ? "Update Testimonial" : "Save Testimonial"}
                  handlerChange={saveTestimonial}
                />
              </div>
              {testimonialList.length > 0 ? (
                <div className="row bg-light px-5 py-4">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>News Title</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testimonialList?.map((testimonial) => (
                        <tr key={testimonial._id}>
                          <td>{testimonial.title}</td>
                          <td>{testimonial.description}</td>
                          <td>
                            {" "}
                            {testimonial?.imageUrl ? (
                              <img
                                width={"100"}
                                height={"100"}
                                src={`${testimonial.imageUrl}`}
                                alt=" "
                              />
                            ) : (
                              ""
                            )}{" "}
                          </td>
                          <td>
                            <Link
                              onClick={() => handleNewsEdit(event, testimonial)}
                            >
                              <i
                                className="fa fa-pencil fs-4 text-secondary me-2"
                                aria-hidden="true"
                              ></i>
                            </Link>
                            <Link
                              onClick={() =>
                                handleNewsDelete(event, testimonial)
                              }
                            >
                              <i
                                className="fa fa-trash-o fs-4 text-danger"
                                aria-hidden="true"
                              ></i>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

export default AdminTestimonial;
