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

  // console.log(imagesByDate, "imagesByDate")
  return (
    <>
      <h6>{imageDescription}</h6>
      {/* <h4>Work status as on date {getFormate(imgs[0].updatedAt)}</h4> */}
      {imagesByDate.length > 0
        ? imagesByDate.map((img) => (
            <div key={img._id}>
              <div>
                <span>Work status as on date {getFormate(img.updatedAt)}</span>
              </div>
              <img
                src={img.path}
                alt=" "
                onClick={() => findThumbHandler(projectID, img._id)}
              />
            </div>
          ))
        : null}
    </>
  );
};

export default GalleryImgThumb;
