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
import { axiosServiceApi } from "../../../util/axiosUtil";
import { toast } from "react-toastify";
import { getCookie } from "../../../util/cookieUtil";
import Error from "../../Components/Error";

export const AdminNews = () => {
  const navigate = useNavigate();
  const [newsObject, setNewsObject] = useState([]);
  const [newProject, setNewProject] = useState({ _id: uuidv4() });
  const newsKeys = { newstitle: "", description: "" };
  const [newsState, setnewsState] = useState(newsKeys);
  const [errorMessage, setErrorMessage] = useState("");
  const [editState, setEditState] = useState(false);
  const [id, setID] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(getCookie("userName"));
  }, []);

  const changeHandler = (e) => {
    setErrorMessage("");
    setnewsState({ ...newsState, [e.target.name]: e.target.value });
  };

  const [newsList, setNewsList] = useState([]);

  const getNewList = async () => {
    const response = await axiosServiceApi.get(`/api/appnews/getNewsList`);
    if (response?.status == 200 && response.data?.appNews?.length > 0) {
      //const listReverseOrder = response.data.appNews;
      setNewsList(response.data.appNews.reverse());
    } else {
      setNewsList([]);
    }
  };

  useEffect(() => {
    getNewList();
  }, []);

  const saveProject = async () => {
    if (newsState.newstitle === "") {
      setErrorMessage("Please add title");
      return;
    }

    if (newsState.description === "") {
      setErrorMessage("Please add description");
      return;
    }

    const news = {
      projectID: newProject._id,
      newstitle: newsState.newstitle,
      description: newsState.description,
      imageIds: newsObject.map(function (item) {
        return item._id;
      }),
      originalnames: newsObject.map(function (item) {
        return item.originalname;
      }),
      imageUrls: newsObject.map(function (item) {
        return item.path;
      }),
      updateBy: userName,
      _id: id,
    };

    const newsURL = editState
      ? `/api/appnews/updateNews`
      : `/api/appnews/addNews`;

    try {
      const response = await axiosServiceApi.post(newsURL, {
        ...news,
      });
      if (response?.status == 200) {
        toast.success(
          `${newsState.newstitle} news ${editState ? "Update" : "created"}`,
        );
        setEditState(false);
        setnewsState(newsKeys);
        setNewsObject([]);
        getNewList();
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      toast.error("Unable to save the news");
    }
  };

  const handleNewsEdit = (event, news) => {
    event.preventDefault();
    const {
      imageId,
      projectID,
      originalname,
      imageUrl,
      description,
      newstitle,
      _id,
    } = news;

    const newsObj = {
      newstitle: newstitle,
      description: description,
    };
    setNewProject({ _id: projectID });
    setnewsState(newsObj);
    setEditState(true);
    setID(_id);
    window.scrollTo(0, 0);
  };

  const handleNewsDelete = (event, news) => {
    event.preventDefault();
    const deleteSelectedNews = async () => {
      const response = await axiosServiceApi.get(
        `/api/appnews/deleteSelectedNews/${news._id}`,
      );

      if (response.status !== 200) {
        setErrorMessage(data.message);
        toast.error("Unable to Delete news", "success");
      }
      if (response.status == 200 && response?.data?.appNews?.acknowledged) {
        toast.success(`${news.newstitle} news deleted`);
        setEditState(false);
        setnewsState(newsKeys);
        setNewsObject([]);
        getNewList();
      }
    };
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteSelectedNews}
            projectName={news.newstitle}
          />
        );
      },
    });
  };

  return (
    <div className="pt-5" style={{ marginTop: "120px" }}>
      <div className="row px-5">
        <div className="text-end d-flex justify-content-between">
          <Title
            title={"News And Update"}
            cssClass="text-center blue-500 fs-4"
          />
          <Button
            type="submit"
            cssClass="btn btn-secondary"
            label="Back to Menu"
            handlerChange={() => navigate("/main")}
          />
        </div>
      </div>

      <div className="row px-5 mt-4">
        <div className="col-12 col-md-3">
          <div className="border border-1 p-4 mb-4 bg-light shadow-lg">
            {errorMessage && <Error>{errorMessage}</Error>}
            <div className="mb-3">
              <label htmlFor="projectDescription" className="form-label  ">
                News Title <span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="newstitle"
                value={newsState.newstitle}
                onChange={changeHandler}
                id="newstitle"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="projectDescription" className="form-label  ">
                News Description <span className="text-danger"> *</span>
              </label>
              <textarea
                className="form-control"
                name="description"
                value={newsState.description}
                onChange={changeHandler}
                id="projectDescription"
                rows="3"
              ></textarea>
            </div>
            <div className="mb-3">
              <FileUpload
                title="News Images (Upload multiple images)"
                project={newProject}
                updatedBy={userName}
                category="news"
                gallerysetState={setNewsObject}
                galleryState={newsObject}
                validTypes="image/png,image/jpeg"
              />
              <CatageoryImgC
                title={`News Image`}
                catategoryImgs={newsObject}
                catategoryImgState={setNewsObject}
                project={newProject}
                category="news"
                cssClass="thumb75 mb-5 shadow-lg border border-5 border-warning rounded-5"
              />
            </div>
            <div className="text-center">
              <Button
                type="submit"
                cssClass="btn btn-primary w-100"
                label={editState ? "Update News" : "Save News"}
                handlerChange={saveProject}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-9">
          {newsList.length > 0 ? (
            <div className="row px-2">
              <table className="table table-responsive table-hover border align-middle">
                <thead>
                  <tr>
                    <th>News Title</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {newsList?.map((news) => (
                    <tr key={news._id}>
                      <td>{news.newstitle}</td>
                      <td>{news.description}</td>
                      <td>
                        {" "}
                        {news?.imageUrls.length > 0 ? (
                          <img
                            width={"100"}
                            height={"100"}
                            src={`${news.imageUrls[0]}`}
                            alt=" "
                          />
                        ) : (
                          <img
                            width={"100"}
                            height={"100"}
                            src="images/dummy-image-square.png"
                            alt=""
                          />
                        )}{" "}
                      </td>
                      <td>
                        <Link onClick={() => handleNewsEdit(event, news)}>
                          <i
                            className="fa fa-pencil-square-o fs-4 text-muted me-4"
                            aria-hidden="true"
                          ></i>
                        </Link>
                        <Link onClick={() => handleNewsDelete(event, news)}>
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

export default AdminNews;
