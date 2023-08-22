import React, { useState, useEffect } from "react";
import Title from "../../Common/Title";
import Model from "../../Common/Model";

import ModelBg from "../../Common/ModelBg";

import "./NewsAndUpdates.css";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import News from "./News";

const NewsAndUpdates = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      const response = await axiosClientServiceApi.get(
        `/api/appnews/client/getNews`,
      );
      if (response?.status == 200) {
        setNews(response.data.appNews);
      }
    };
    getNews();
  }, []);

  const [showModal, setShowModal] = useState(false);

  const [obj, setObj] = useState({});

  const articleHandler = (id) => {
    const searchObj = news.find((newsItem) => newsItem._id === id);
    setObj(searchObj);
    setShowModal(!showModal);
  };

  const closeModel = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dateFormat = (date) => {
    let datestring = date;
    return datestring.slice(0, 10);
  };

  return (
    <>
      <div className="row pt-5">
        <div className="col-md-12 banner"></div>
      </div>
      <div className="container my-4 newsAndUpdates">
        <div className="row">
          <Title title="News And Updates" cssClass="blue-900 fs-4 mb-4" />
          {news.length > 0 &&
            news.map((item) => (
              <News
                item={item}
                dateFormat={dateFormat}
                key={item._id}
                articleHandler={articleHandler}
              />
            ))}
        </div>
      </div>
      {showModal && <Model obj={obj} closeModel={closeModel} flag="news" />}
      {showModal && <ModelBg closeModel={closeModel} />}
    </>
  );
};

export default NewsAndUpdates;
