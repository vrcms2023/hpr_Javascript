import React from "react";
import "./DeleteDialog.css";

const DeleteDialog = (props) => {
  const { onClose, callback, projectName, label } = props;
  return (
    <div className="popup-overlay d-flex justify-content-center align-items-center flex-column">
      <h3>Are you sure?</h3>
      <p className="text-muted m-0">
        {label ? label : "for deleting"} the <strong>{projectName}</strong>{" "}
        project?
      </p>
      <div>
        <hr className="mb-4" />
        <button className="btn btn-secondary me-3" onClick={onClose}>
          No
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            callback();
            onClose();
          }}
        >
          Yes,{label ? label : "Delete"} it!
        </button>
      </div>
    </div>
  );
};

export default DeleteDialog;
