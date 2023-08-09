import React from 'react'

const Model = ({obj, closeModel} ) => {
    const {title, description, dec1, dec2, dec3, cr, crm} = obj
  return (
    <div className="modal d-block modal-lg" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title  text-dark">{title}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModel}></button>
            </div>
            <div className="modal-body">
                {description && <p className='px-4 py-2'>{description}</p>}
                {dec1 &&  <p className='px-4 pb-1'>{dec1}</p>}
                {dec2 &&  <p className='px-4 pb-1'>{dec2}</p>}
                {dec3 &&  <p className='px-4 pb-1'>{dec3}</p>}
                {cr &&  <p className='px-4 pb-1'>{cr}</p>}
                {crm &&  <p className='px-4 pb-1'>{crm}</p>}
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