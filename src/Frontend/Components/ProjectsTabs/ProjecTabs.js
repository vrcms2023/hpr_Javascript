import React from 'react';
import './ProjectTabs.css'

import HomeTab from './HomeTab';
import Title from '../../../Common/Title';
import Gallery from '../../Pages/Gallery'

const ProjectTabs = () => {
  return (
    <div className='row p-0 pt-4 projectTabs'>
      <div className='d-flex justify-content-between align-items-center mb-5'>
          <Title title="Ongoing Projects" cssClass="blue-900 fs-5 fw-bold" />
          <select  className="form-select shadow-lg border border-1 rounded-0 border-success w-25" aria-label="Default select example" id="projectStatus">
                <option>Select Project</option>
                <option>Project 1</option>
                <option>Project 2</option>
                <option>Project 3</option>
                <option>Project 4</option>
                <option>Project 5</option>
          </select>
        </div>
        <div className='col-md-12'>
        <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">HOME</button>
                <button className="nav-link" id="nav-gallery-tab" data-bs-toggle="tab" data-bs-target="#nav-gallery" type="button" role="tab" aria-controls="nav-gallery" aria-selected="false">GALLERY</button>
                <button className="nav-link" id="nav-specifications-tab" data-bs-toggle="tab" data-bs-target="#nav-specifications" type="button" role="tab" aria-controls="nav-specifications" aria-selected="false">SPECIFICATIONS</button>
                <button className="nav-link" id="nav-availability-tab" data-bs-toggle="tab" data-bs-target="#nav-availability" type="button" role="tab" aria-controls="nav-availability" aria-selected="false">AVAILABILITY</button>
                <button className="nav-link" id="nav-cost-tab" data-bs-toggle="tab" data-bs-target="#nav-cost" type="button" role="tab" aria-controls="nav-cost" aria-selected="false">COST</button>
                <button className="nav-link" id="nav-plan-tab" data-bs-toggle="tab" data-bs-target="#nav-plan" type="button" role="tab" aria-controls="nav-plan" aria-selected="false">PLAN</button>
                <button className="nav-link" id="nav-location-tab" data-bs-toggle="tab" data-bs-target="#nav-location" type="button" role="tab" aria-controls="nav-location" aria-selected="false">LOCATION</button>
                <button className="nav-link" id="nav-amenities-tab" data-bs-toggle="tab" data-bs-target="#nav-amenities" type="button" role="tab" aria-controls="nav-amenities" aria-selected="false">AMENITIES</button>
                
            </div>
        </nav>
        
        <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
              <HomeTab />
            </div>
            <div className="tab-pane fade" id="nav-gallery" role="tabpanel" aria-labelledby="nav-gallery-tab">
              <Gallery />
            </div>
            <div className="tab-pane fade" id="nav-specifications" role="tabpanel" aria-labelledby="nav-specifications-tab">Specifications</div>
            <div className="tab-pane fade" id="nav-availability" role="tabpanel" aria-labelledby="nav-availability-tab">AVAILABILITY</div>
            <div className="tab-pane fade" id="nav-cost" role="tabpanel" aria-labelledby="nav-cost-tab">COST</div>
            <div className="tab-pane fade" id="nav-plan" role="tabpanel" aria-labelledby="nav-plan-tab">PLAN</div>
            <div className="tab-pane fade" id="nav-location" role="tabpanel" aria-labelledby="nav-location-tab">LOCATION</div>
            <div className="tab-pane fade" id="nav-amenities" role="tabpanel" aria-labelledby="nav-amenities-tab">AMENITIES</div>
        </div>
        </div>
    </div>
  )
}

export default ProjectTabs