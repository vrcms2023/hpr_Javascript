import React from "react";

const Model = ({ obj, closeModel, privacy, flag }) => {
  // const { newstitle, imageUrls, description, } = obj;
  // const { dec, title, cr, crm } = privacy;

  // const newImages = obj.imageUrls.length > 0 ? (
  //     <div className="">
  //       <h5 className="text-dark text-center ">Images</h5>
  //       <hr className="m-0 mb-3" />
  //       {imageUrls.map((img) => (
  //         <img src={img} key={img} alt="" width="250" className="m-2" />
  //       ))}
  //     </div>
  //   ) : null;

  return (
    <div className="modal d-block modal-lg" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-dark fw-bold">
              {flag === "footer" ? privacy.title : obj.newstitle}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModel}
            ></button>
          </div>
          {flag === "footer" ? (
            <div className="modal-body px-4 py-3">
              {privacy.dec && <p className="text-dark">{privacy.dec}</p>}
              {privacy.cr && <p className="m-0 text-primary">{privacy.cr}</p>}
              {privacy.crm && <p className="pb-1 text-dark">{privacy.crm}</p>}
            </div>
          ) : (
            <div className="modal-body px-4 py-3">
              {obj.description && (
                <p className="text-dark">{obj.description}</p>
              )}
              {obj.imageUrls.length > 0 ? (
                <div className="text-center">
                  <h5 className="text-dark  ">Images</h5>
                  <hr className="m-0" />
                  {obj.imageUrls.map((img, i) => (
                    <img
                      src={img}
                      key={i}
                      alt=""
                      className={`me-2 mt-2 newsImg`}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          )}

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
