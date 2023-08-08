import React from 'react'

const Model = ({obj, closeModel} ) => {
    const {title, description} = obj
  return (
    <div className="modal d-block modal-lg" tabIndex="-1" style={{zIndex: 99999}}>
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title  text-dark">{title}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModel}></button>
            </div>
            <div className="modal-body">
                <p className='px-4 py-3'>{description}</p>
            </div>
            {/* <div className="modal-footer text-center">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModel}>Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div> */}
            </div>
        </div>
    </div>
  )
}
export default Model