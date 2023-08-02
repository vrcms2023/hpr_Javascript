import React from 'react';

const DeleteDialog = (props) => {
    return (
      <div className="popup-overlay">
        <h1>Are you sure?</h1>
        <p>You want to delete this file?</p>
        <button onClick={props.onClose}>No</button>
        <button
          onClick={() => {
            props.callback();
            props.onClose();
          }}
        >
          Yes, Delete it!
        </button>
      </div>
    );
  }
  
  export default DeleteDialog;