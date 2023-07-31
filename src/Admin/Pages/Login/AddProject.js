import React, {useState, useEffect} from 'react'
import Title from '../../../Common/Title'
import Alert from '../../../Common/Alert'
import Button from '../../../Common/Button'
import { useNavigate } from 'react-router-dom';
import FileUpload from '../../Components/FileUpload';
import Specifications from '../../Components/Specifications';
import { Amenities ,AmenitiesList} from '../../Components/Amenities';
import { useCookies } from "react-cookie";
import { useParams } from 'react-router-dom';

import CatageoryImgC from '../../../Common/CatageoryImgC';


const AddProject = () => {
    const navigate = useNavigate();

    const [show, setShow] = useState(false)
    const [projectType, setProjectType] = useState({})
    const [projectName, setProjectName] = useState('')
    const [defaultProjectType, setDefaultProjectType] = useState([]);
    const [cookies] = useCookies(["token","userName"]);
    const [errorMessage, setErrorMessage] = useState("")
    const [newProject, setNewProject] = useState({})
    const [readOnlyTitle, setreadOnlyTitle] = useState('');
    const [description, setdescription] = useState('');
    const specificationKeys = {title:"",feature:""};
    const amenitieKeys = {amenitie:"",feature:"", googleMap:""};
    const [specifications, setSpecifications]=useState([specificationKeys])
    const [amenities, setAmenities] = useState(amenitieKeys)
    const [pdfObject, setPdfObject] = useState([]);
    const [planObject, setPlanObject] = useState([]);
    const [imgGallery, setImgGallery] = useState([])
    const { id } = useParams();


    /**
     * Get project type object
     */
    useEffect(() => {
        const getPorjectCategory =() => {
            fetch("/projectCategory",{
                headers: {"x-access-token": cookies.token}
            })
            .then(res => res.json())
            .then(data => {
                if(data.length > 0) {
                    setDefaultProjectType(data);
                } else { 
                    navigate("/login"); 
                }  
            })
            .catch(err => console.log(err))
        }
        
       getPorjectCategory()
       
    }, [cookies]);

    /**
     * Select Porject type handler
     */
    const handleChange = (e) => {
        const value = e.target.value.toLowerCase()    
        const obj = defaultProjectType.filter(obj => {return (obj.value === value)});
        setProjectType(obj)
    }

    /**
     *  Project input title handler
     */
    const titleInputHandleChange = (e) => {
        const title = e.target.value;
        setProjectName(title);
    }

    const changeHandler =(e)=>{
        setdescription(e.target.value)
        newProject['description'] = e.target.value;
        setNewProject(newProject)
    }

    /**
     * Add project handler
     */
    async function addNewProject(event) {
        event.preventDefault();
        const project = {
            projectCategoryID : projectType[0]._id,
            projectCategoryName :  projectType[0].label,
            projectCategoryValue :  projectType[0].value,
            projectTitle : projectName,
            createdBy : cookies.userName,
            userID : cookies.userId,
            status : "0% complete",
            isActive : true
        }
     
        try {
            const res = await fetch("/addProject", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "x-access-token": cookies.token
                },
                body: JSON.stringify(project)
            })
            const data = await res.json()
            setNewProject(data.project)
            setreadOnlyTitle(data.project.projectTitle)
            setShow(true)
            setErrorMessage(data.message)
        } catch (err) {
            setErrorMessage(err)
        }
    }

    /**
     * get selected Project for edit
     */
    useEffect(() => {
       const getSelectedProject = () => {
                fetch(`/findById/${id}`,{
                    headers: {"x-access-token": cookies.token}
                })
                .then(res => res.json())
                .then(data => {
                    setNewProject(data.project)
                    const title = data.project.projectTitle;
                    setreadOnlyTitle(title);
                    setProjectName(title);
                    setdescription(data.project.description);
                    setShow(true)
                    setErrorMessage(data.message)
                })
                .catch(err => console.log(err))
            }
       if(id){
        getSelectedProject()
       }
    },[cookies,id])

    
    function saveProject() {
        updateProjectBasicDetails();
        saveSpecifications();
        saveAmenities();
        navigate("/dashboard")
        
    }


    /**
     * update Project Basic details
     */
    async function updateProjectBasicDetails(event) {
       
        const projectProps = {
            ...newProject,
            projectTitle : projectName,
            updatedBy : cookies.userName,
        }
     
        try {
            const res = await fetch("/updateProject", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "x-access-token": cookies.token
                },
                body: JSON.stringify(projectProps)
            })
            setProjectName('');
            setdescription('');
        } catch (err) {
            setErrorMessage(err)
        }
    }

    /**
     * Save specification
     */
    async function saveSpecifications() {
        const specification = {
            projectID: newProject._id,
            updatedBy : cookies.userName,
            specifications :specifications
        };
        try {
            const res = await fetch("/addAndUpdateSpecifications", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "x-access-token": cookies.token
                },
                body: JSON.stringify(specification)
            })
            const data = await res.json()
            if(data.message === "Success") {
                setSpecifications([specificationKeys]);
            }
            setErrorMessage(data.message)
        } catch (err) {
            setErrorMessage(err)
        }
    }

     /**
     * Save Amenities
     */
     async function saveAmenities() {
        const amenitiesObj = {
            projectID: newProject._id,
            updatedBy : cookies.userName,
            amenitieslist :amenities
        };
        try {
            const res = await fetch("/addAndUpdateAmenities", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "x-access-token": cookies.token
                },
                body: JSON.stringify(amenitiesObj)
            })
            const data = await res.json()
            if(data.message === "Success") {
                setAmenities(amenitieKeys);
            }
            setErrorMessage(data.message)
        } catch (err) {
            setErrorMessage(err)
        }
    }



  return (
    <div className='bg-light pt-5' style={{marginTop: "90px"}}>
        
    <div className='row bg-light px-5'>
        <div className='text-end d-flex justify-content-between'>
            <Title title={`${id ? 'Edit Project' : 'Add Project' }`} cssClass="text-center fs-3"/>
            <Button type="submit" cssClass="btn btn-success" label="Back" handlerChange={() => navigate("/dashboard")} />
        </div>
    </div>
        {/* <Alert mesg="Project Added Successfully" cssClass="alert alert-success text-center m-auto fs-5 w-50 "/> */}
        
        {!id ? (
            <select  className="form-select mb-3 shadow-lg border border-2 border-success w-25 m-auto d-block" aria-label="Default select example" id="projectStatus"
            onChange={(e) => handleChange(e)} >
                <option>Select Status</option>
                {defaultProjectType?.length ? (defaultProjectType?.map((option, index) => {
                    return <option key={option._id} value={option.value}>
                        {option.label}
                    </option>
                })) : ('')}      
            </select>
        ) : ''}
        
{projectType.length > 0  && !show ? (
    <div className='row' id="projectTitle">
        <div> {errorMessage} </div>
        <div className="col-md-8  mb-3">
            <label htmlFor="projectName" className="form-label text-center d-block">Enter Project Name</label>
                <div className='d-flex'>
                    <input type="text" className="form-control" 
                    name="projectName" 
                    value={projectName}     
                    onChange={titleInputHandleChange}
                    id="projectName" placeholder="Add Project Name" />
                    <Button label="Save" cssClass="btn btn-success" handlerChange={addNewProject} />
                </div>
                <small id="projectValidation" className="d-none error">Project name should not be empty.</small>
        </div>
        
    </div>
    ) : ''}


    {show ? 
    <>
    <div className='row bg-light px-5 mt-3 shadow-lg'>
    {readOnlyTitle && <h3 className='my-4 text-success'>{readOnlyTitle} <span className="badge bg-warning text-dark" style={{fontSize: ".8rem"}}>  {  projectType[0]?.label?.toUpperCase()} PROJECT</span></h3>}
    
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
                <div className="mb-3">
                    <label htmlFor="projectName" className="form-label  ">Project Name</label>
                    <input type="text" className="form-control" value={projectName} onChange={titleInputHandleChange} id="projectName" placeholder="Add Project Name" />
                </div> 
               {/*  <div className="mb-3">
                    <label htmlFor="projectStatus" className="form-label  ">Status</label>
                    <select className="form-select" aria-label="Default select example" id="projectStatus">
                        <option>Select Status</option>
                        <option value="1">Ongoing</option>
                        <option value="2">Future</option>
                        <option value="3">Completed</option>
                    </select>
                </div>*/}
                
                <div className="mb-3">
                    <label htmlFor="projectDescription" className="form-label  ">Description</label>
                    <textarea className="form-control" name="description" value={description} onChange={changeHandler} id="projectDescription" rows="3"></textarea>
                </div>
            </div>
            </div>

            {/* DOCUMENTS */}
            <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                <FileUpload title="Add PDF's" project={newProject} updatedBy={cookies.userName} category="PDF" gallerysetState={setPdfObject} galleryState={pdfObject} validTypes="application/pdf" />
                <CatageoryImgC title={`${readOnlyTitle} PDF's`} catategoryImgs={pdfObject} catategoryImgState={setPdfObject} project={newProject} category="PDF" cssClass="thumb75 mb-5 shadow-lg border border-5 border-warning rounded-5" />
                <FileUpload title="Add Plan" project={newProject} updatedBy={cookies.userName} category="Plans" gallerysetState={setPlanObject} galleryState={planObject} validTypes="image/png,image/jpeg" />
                <CatageoryImgC title={`${readOnlyTitle} Plans`}   catategoryImgs={planObject} catategoryImgState={setPlanObject} project={newProject} category="Plans"  cssClass="thumb75 mb-5 shadow-lg border border-5 border-warning rounded-5" />
                {/* Add GOOGLE MAP  */}
                <Amenities title="Google Map" value={amenities?.googleMap}  amenities={amenities} setAmenities={setAmenities} name="googleMap"/>
            </div>
            <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                {/* Add SPECIFICATIONS */}
                <Specifications title="Specifications" project={newProject} setSpecifications={setSpecifications} specifications={specifications}/>
            </div>
            <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                {/* Add AMENITIES */}
                <AmenitiesList project={newProject}  amenities={amenities} setAmenities={setAmenities} />             
            </div>

            <div className="tab-pane fade" id="v-pills-gallery" role="tabpanel" aria-labelledby="v-pills-gallery-tab">
                <FileUpload title="Add Images" project={newProject} updatedBy={cookies.userName} category="images" gallerysetState={setImgGallery} galleryState={imgGallery} validTypes="image/png,image/jpeg" />
                <CatageoryImgC title={`${readOnlyTitle} Image Gallery`}  catategoryImgs={imgGallery} catategoryImgState={setImgGallery} project={newProject} category="images" cssClass="thumb75 mb-5 shadow-lg border border-5 border-warning rounded-5" />
                {/* <CatageoryImgC title="Future Projects" thumbDelete={thumbDelete}catategoryImgs={onFutureImgs} cssClass="thumb75 mb-5 shadow-lg border border-5 border-success rounded-5" /> */}
                {/* <CatageoryImgC title="Completed Projects" thumbDelete={thumbDelete} catategoryImgs={onCompletedImgs} cssClass="thumb75 mb-5 shadow-lg border border-5 border-secondary rounded-5" /> */}
            </div>
        </div>
        </div>
    </div>
    <div className='row'>
        <div className='col-lg-12 text-center py-3'>
            <Button type="submit" cssClass="btn btn btn-outline-secondary" label="Cancel" handlerChange={() => navigate("/dashboard")} />
            <Button type="submit" cssClass="btn btn btn-outline-secondary mx-2" label="Reset"/>
            <Button type="submit" cssClass="btn  btn-success" label="Save Project" handlerChange={saveProject}/>
        </div>
    </div>
    </>
    : ""
    }
  
    </div>
  )
}
export default AddProject