import React from "react";
import { getImagesByDate } from "../../util/dataFormatUtil";

const GalleryImgThumb = ({
  imgs,
  imageDescription,
  findThumbHandler,
  projectID,
}) => {
  const imagesByDate = getImagesByDate(imgs);

  return (
    <>
      <h6>{imageDescription}</h6>
      {/* <h4>Work status as on date {getFormate(imgs[0].updatedAt)}</h4> */}
      {imagesByDate !== null
        ? Object.keys(imagesByDate).map((dt) => (
            <div key={dt}>
              <div>
                <span>Work status as on date {dt}</span>
              </div>
              {imagesByDate[dt].map((img) => (
                <div key={img._id}>
                  <img
                    src={img.path}
                    alt=" "
                    onClick={() => findThumbHandler(projectID, img._id)}
                  />
                </div>
              ))}
            </div>
          ))
        : null}
    </>
  );
};

export default GalleryImgThumb;
