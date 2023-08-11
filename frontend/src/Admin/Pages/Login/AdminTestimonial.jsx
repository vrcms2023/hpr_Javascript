import React, { useState, useEffect } from "react";
import CatageoryImgC from "../../../Common/CatageoryImgC";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../Components/FileUpload";
import Button from "../../../Common/Button";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { getBaseURL } from "../../../util/ulrUtil";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../Common/DeleteDialog";
import Title from "../../../Common/Title";
import Error from "../../Components/Error";

export const AdminTestimonial = () => {
  const navigate = useNavigate();
  const [testimonialObject, setTestimonialObject] = useState([]);
  const [testimonialProject, setTestimonialProject] = useState({
    _id: uuidv4(),
  });
  const testimonialKeys = { title: "", description: "" };
  const [testimonialState, setTestimonialState] = useState(testimonialKeys);
  const [cookies] = useCookies(["token", "userName"]);
  const [errorMessage, setErrorMessage] = useState("");
  const [editState, setEditState] = useState(false);
  const [id, setID] = useState("");

  const changeHandler = (e) => {
    setTestimonialState({
      ...testimonialState,
      [e.target.name]: e.target.value,
    });
  };

  const [testimonialList, setTestimonialList] = useState([]);
  const backendURL = getBaseURL();

  const getTestimonialList = () => {
    fetch(`${backendURL}/api/testimonial/getTestimonialList`, {
      headers: {
        authorization: `Bearer ${cookies.userToken}`,
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.testimonial?.length > 0) {
          setTestimonialList(data.testimonial);
        } else {
          setTestimonialList([]);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTestimonialList();
  }, [cookies]);

  const saveTestimonial = async () => {
    const testimonial = {
      projectID: testimonialProject._id,
      title: testimonialState.title,
      description: testimonialState.description,
      imageId: testimonialObject[0]?._id,
      originalname: testimonialObject[0]?.originalname,
      imageUrl: testimonialObject[0]?.path,
      updateBy: cookies.userName,
      _id: id,
    };
    const testimonialURL = editState
      ? `${backendURL}/api/testimonial/updateTestimonial`
      : `${backendURL}/api/testimonial/addTestimonial`;

    try {
      const res = await fetch(testimonialURL, {
        method: "POST",
        headers: {
          authorization: `Bearer ${cookies.userToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(testimonial),
      });
      const data = await res.json();
      if (data?.testimonial) {
        setEditState(false);
        setTestimonialState(testimonialKeys);
        setTestimonialObject([]);
        getTestimonialList();
      } else {
        setErrorMessage("Unable to save the news");
      }
    } catch (err) {
      setErrorMessage(err);
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
    const deleteSelectedNews = () => {
      fetch(
        `${backendURL}/api/testimonial/deleteSelectedTestimonial/${testimonial._id}`,
        {
          headers: {
            authorization: `Bearer ${cookies.userToken}`,
            "Content-type": "application/json",
          },
        },
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.testimonial?.acknowledged) {
            setEditState(false);
            setTestimonialState(testimonialKeys);
            setTestimonialObject([]);
            getTestimonialList();
          }
        })
        .catch((err) => console.log(err));
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
              {/* {errorMessage && <Error>{errorMessage}</Error>} */}
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
                  updatedBy={cookies.userName}
                  category="testimonial"
                  gallerysetState={setTestimonialObject}
                  galleryState={testimonialObject}
                  validTypes="image/png,image/jpeg"
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
