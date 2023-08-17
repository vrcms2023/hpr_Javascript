import React from "react";

const Model = ({ obj, closeModel }) => {
  const {
    newstitle,
    imageUrls,
    description,
    title,
    cr,
    crm,
  } = obj;
  return (
    <div className="modal d-block modal-lg" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-dark">{newstitle || title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModel}
            ></button>
          </div>
          <div className="modal-body px-4 py-3">
            {description && <p>{description}</p>}

            {imageUrls.length > 0 ? (
              <>
                <div className="">
                  <h5 className="text-dark text-center ">Images</h5>
                  <hr className="m-0 mb-3" />
                  {imageUrls.map((img) => (
                    <img
                      src={img}
                      key={img}
                      alt=""
                      width="250"
                      className="m-2"
                    />
                  ))}
                </div>
              </>
            ) : null}
            {cr && <p className="px-4 pb-1">{cr}</p>}
            {crm && <p className="px-4 pb-1">{crm}</p>}
          </div>
          {/* <div className="modal-footer text-center">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModel}>Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div> */}
        </div>
      </div>
    </div>
  );
};
export default Model;
