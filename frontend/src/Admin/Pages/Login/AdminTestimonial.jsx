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

import './AdminCommon.css';

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

    setErrorMessage("");
    setTestimonialState({
      ...testimonialState,
      [e.target.name]: e.target.value,
    });
  };

  const cancelHandler = () => {
    setTestimonialState(testimonialKeys);
    setEditState(false);
  };

  const [testimonialList, setTestimonialList] = useState([]);

  const getTestimonialList = async () => {
    const response = await axiosServiceApi.get(
      `/api/testimonial/getTestimonialList`,
    );
    if (response?.status == 200 && response.data?.testimonial?.length > 0) {
      const listReverseOrder = response.data.testimonial;
      setTestimonialList(listReverseOrder.reverse());
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
    if (testimonialState.title === "") {
      setErrorMessage("Please add testimonial title");
      return;
    }

    if (testimonialState.description === "") {
      setErrorMessage("Please add testimonial description");
      return;
    }

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
        toast.success(
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
      toast.error("Unable to save the testimonial");
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
        toast.error("Unable to Delete testimonial");
      }
      if (response.status == 200 && response?.data?.testimonial?.acknowledged) {
        toast.success(`${testimonial.title} testimonial deleted`);
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
    <div className="container-fluid pt-5" style={{ marginTop: "120px" }}>
      <div className="row px-3 px-md-3">
        <div className="text-end d-flex justify-content-between">
          <Title title={"Testimonial"} cssClass="text-center blue-500 fs-4" />
          <Button
            type="submit"
            cssClass="btn btn-secondary"
            label="Back to Menu"
            handlerChange={() => navigate("/main")}
          />
        </div>
      </div>

      <div className="row px-3 px-md-3 mt-4">
        <div className="col-12 col-md-5 col-lg-4">
          <div className="border border-1 p-4 mb-4 bg-light shadow-lg">
            {errorMessage && <Error>{errorMessage}</Error>}
            <div className="mb-3">
              <label
                htmlFor="projectDescription"
                className="form-label fw-normal "
              >
                Testimonial Title <span className="text-danger"> *</span>
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
              <label
                htmlFor="projectDescription"
                className="form-label fw-normal "
              >
                Testimonial Description <span className="text-danger">*</span>
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
                cssClass="thumb75 mb-5 shadow-lg border border-5 border-warning rounded-5 fs-2"
              />
            </div>
            <div className="text-center">
            {editState ? (
                <Button
                  type="submit"
                  cssClass="btn btn-secondary me-3"
                  label="Cancel"
                  handlerChange={cancelHandler}
                />
              ) : (
                ""
              )}
              <Button
                type="submit"
                cssClass="btn btn-primary"
                label={editState ? "Update Testimonial" : "Save Testimonial"}
                handlerChange={saveTestimonial}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-7 col-lg-8">
          {testimonialList.length > 0 ? (
            <div className="row px-2 table-responsive">
              <table className="table table-hover border align-middle">
                <thead>
                  <tr>
                    <th>News Title</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonialList?.reverse().map((testimonial) => (
                    <tr key={testimonial._id}>
                      <td className="description"><span className="m-0">{testimonial.title}</span></td>
                      <td className="description"><p className="m-0">{testimonial.description}</p></td>
                      <td>
                        {" "}
                        {testimonial?.imageUrl ? (
                          <img
                            width={"60"}
                            height={"60"}
                            src={`${testimonial.imageUrl}`}
                            alt=" "
                          />
                        ) : (
                          <img
                            width={"60"}
                            height={"60"}
                            src="images/dummy-image-square.png"
                            alt=""
                          />
                        )}{" "}
                      </td>
                      <td className="valign-middle">
                        <Link
                          onClick={() => handleNewsEdit(event, testimonial)}
                        >
                          <i
                            className="fa fa-pencil-square-o fs-4 text-secondary me-3"
                            aria-hidden="true"
                          ></i>
                          {/* <i
                                className="fa fa-pencil "
                                aria-hidden="true"
                              ></i> */}
                        </Link>
                        <Link
                          onClick={() => handleNewsDelete(event, testimonial)}
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
  );
};

export default AdminTestimonial;
