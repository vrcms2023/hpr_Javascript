import moment from "moment";
import React from "react";
import { getImagesByDate } from "../../util/dataFormatUtil";

const GalleryImgThumb = ({
  imgs,
  imageDescription,
  findThumbHandler,
  projectID,
}) => {
  const getFormate = (dt) => {
    return moment(dt).format("YYYY/DD/MM");
  };
  const imagesByDate = getImagesByDate(imgs);
  return (
    <>
      {imagesByDate.length > 0
        ? imagesByDate.map((img) => (
            <li key={img._id}>
              <img
                src={img.path}
                alt=" "
                onClick={() => findThumbHandler(projectID, img._id)}
              />
              <span>{imageDescription}</span>
              <span>{getFormate(img.updatedAt)}</span>
            </li>
          ))
        : null}
    </>
  );
};

export default GalleryImgThumb;
