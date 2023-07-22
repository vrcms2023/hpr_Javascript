import React, {useState, useEffect} from 'react'
import Title from '../../../Common/Title'
import Alert from '../../../Common/Alert'
import Button from '../../../Common/Button'
import { useNavigate } from 'react-router-dom';
import FileUpload from '../../Components/FileUpload';
import Specifications from '../../Components/Specifications';
import Amenities from '../../Components/Amenities';

import GalleryJSON from '../../../Data/Gallery.json'
import CatageoryImgC from '../../../Common/CatageoryImgC';


const AddProject = () => {
    const navigate = useNavigate();

    const [show, setShow] = useState(false)
    const [projectType, setProjectType] = useState('')
    const [projectName, setProjectName] = useState("")
    const [gallery, setGallery ] = useState(GalleryJSON)
    const [onGoingImgs, setOngoingImgs] = useState([])
    const [onFutureImgs, setFutureImgs] = useState([])
    const [onCompletedImgs, setCompletedImgs] = useState([])

    console.log("projectName", projectName)

    const handleChange = (e) => {
        const value = e.target.value.toLowerCase();
        setProjectType(value)
        if(value === "ongoing" || value === "future" || value === "completed") {
            document.getElementById('projectTitle').classList.remove('d-none')
            document.getElementById('projectTitle').classList.add('d-block')
            // setShow(!show)
        }
    }
    const thumbDelete = (id) => {
        const filteredArr = onGoingImgs.filter(obj => obj.id !== id);
        setOngoingImgs(filteredArr)
    }

    const titleInputHandleChange = (e) => {
        const title = e.target.value;
        setProjectName(title);
        document.getElementById('projectValidation').classList.add('d-none')
    }

    const addTitle = (e) => {
        if( projectName === "" ) {
            document.getElementById('projectValidation').classList.remove('d-none')
        } else {
            setShow(!show)
            document.getElementById('projectTitle').classList.remove('d-block')
            document.getElementById('projectTitle').classList.add('d-none')
            document.getElementById('projectStatus').classList.add('d-none')
        } 
    }

    useEffect(() => {
        setOngoingImgs(gallery.ongoing);
        setFutureImgs(gallery.future);
        setCompletedImgs(gallery.completed);
    }, [])

  return (
    <div className='bg-light pt-5' style={{marginTop: "90px"}}>
        
    <div className='row bg-light px-5'>
        <div className='text-end d-flex justify-content-between'>
            <Title title="Add Project" cssClass="text-center fs-3"/>
            <Button type="submit" cssClass="btn btn-success" label="Back" handlerChange={() => navigate("/dashboard")} />
        </div>
    </div>
        {/* <Alert mesg="Project Added Successfully" cssClass="alert alert-success text-center m-auto fs-5 w-50 "/> */}
        
        
        <select className="form-select mb-3 shadow-lg border border-2 border-success w-25 m-auto d-block" aria-label="Default select example" id="projectStatus"
        onChange={(e) => handleChange(e)}
        >
            <option>Select Status</option>
            <option value="ongoing">ONGOING PROJECTS</option>
            <option value="future">FUTURE PROJECT</option>
            <option value="completed">COMPLETED PROJECTS</option>
        </select>

    <div className='row d-none' id="projectTitle">
        <div className="col-md-4 offset-md-4 mb-3">
            <label htmlFor="projectName" className="form-label text-center d-block">Enter Project Name</label>
            
                <div className='d-flex'>
                    <input type="text" className="form-control" 
                    name="projectName" 
                    value={projectName}     
                    onChange={titleInputHandleChange}
                    id="projectName" placeholder="Add Project Name" />
                    <Button label="Save" cssClass="btn btn-success" handlerChange={addTitle} />
                </div>
                <small id="projectValidation" className="d-none error">Project name should not be empty.</small>
        </div>
        
    </div>


    {show ? 
    <>
    <div className='row bg-light px-5 mt-3 shadow-lg'>
    {projectName && <h3 className='my-4 text-success'>{projectName} <span class="badge bg-warning text-dark" style={{fontSize: ".8rem"}}>  {projectType.toUpperCase()} PROJECT</span></h3>}
    
        <div className='col-md-3 bg-light pb-3'>
            <div className="nav flex-column nav-pills " id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <button className="nav-link active mb-3" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Info</button>
                <button className="nav-link mb-3" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Pdfs / Plan / Map</button>
                <button className="nav-link mb-3" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Specifications</button>
                <button className="nav-link mb-3" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Amenities</button>

                <button className="nav-link mb-3" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-gallery" type="button" role="tab" aria-controls="v-pills-gallery" aria-selected="false">Image Gallery</button>
            </div>
        </div>
        <div className='col-md-9 bg-light pb-3'>
        <div className="tab-content" id="v-pills-tabContent">
            <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
            <div className="border border-3 p-5 mb-4 shadow-lg">
                {/* <div className="mb-3">
                    <label htmlFor="projectName" className="form-label  ">Project Name</label>
                    <input type="text" className="form-control" id="projectName" placeholder="Add Project Name" />
                </div> */}
                <div className="mb-3">
                    <label htmlFor="projectStatus" className="form-label  ">Status</label>
                    <select className="form-select" aria-label="Default select example" id="projectStatus">
                        <option>Select Status</option>
                        <option value="1">Ongoing</option>
                        <option value="2">Future</option>
                        <option value="3">Completed</option>
                    </select>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="projectDescription" className="form-label  ">Description</label>
                    <textarea className="form-control" id="projectDescription" rows="3"></textarea>
                </div>
            </div>
            </div>

            {/* DOCUMENTS */}
            <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                <FileUpload title="Add PDF's" />
                <FileUpload title="Add Plan" />
                {/* Add GOOGLE MAP  */}
                <Amenities title="Google Map"/>
            </div>
            <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                {/* Add SPECIFICATIONS */}
                <Specifications title="Specifications" />
            </div>
            <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                {/* Add AMENITIES */}
                <Amenities title="Add Features"/>
                <Amenities title="Add Amenities"/>
            </div>

            <div className="tab-pane fade" id="v-pills-gallery" role="tabpanel" aria-labelledby="v-pills-gallery-tab">
                <FileUpload title="Add Images" />
                <CatageoryImgC title="Ongoing Projects" thumbDelete={thumbDelete} catategoryImgs={onGoingImgs} cssClass="thumb75 mb-5 shadow-lg border border-5 border-warning rounded-5" />
                {/* <CatageoryImgC title="Future Projects" thumbDelete={thumbDelete}catategoryImgs={onFutureImgs} cssClass="thumb75 mb-5 shadow-lg border border-5 border-success rounded-5" /> */}
                {/* <CatageoryImgC title="Completed Projects" thumbDelete={thumbDelete} catategoryImgs={onCompletedImgs} cssClass="thumb75 mb-5 shadow-lg border border-5 border-secondary rounded-5" /> */}
            </div>
        </div>
        </div>
    </div>
    </>
    : <h5 className='text-center my-5 py-5 fw-bold'>Please select project type from the dropdown</h5>
    }
    <div className='row'>
        <div className='col-lg-12 text-center py-3'>
            <Button type="submit" cssClass="btn btn btn-outline-secondary" label="Cancel" handlerChange={() => navigate("/dashboard")} />
            <Button type="submit" cssClass="btn btn btn-outline-secondary mx-2" label="Reset"/>
            <Button type="submit" cssClass="btn  btn-success" label="Add Project" handlerChange={() => navigate("/dashboard")}/>
        </div>
    </div>
    </div>
  )
}
export default AddProject