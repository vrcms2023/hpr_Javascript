import React, { useState, useEffect } from 'react'
import CatageoryImgC from '../../Common/CatageoryImgC';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import FileUpload from './FileUpload';
import Button from '../../Common/Button';

export const AdminNews = () => {
    const navigate = useNavigate();
    const newsID = '10001';
    const [newsObject, setNewsObject] = useState([]);
    const [newProject, setNewProject] = useState({_id:newsID})
    const news = {newstitle :'', description:''}
    const [newsState, setnewsState]= useState(news)
    const [cookies] = useCookies(["token","userName"]);
    const [errorMessage, setErrorMessage] = useState("")

    const changeHandler =(e)=>{
        setnewsState({ ...newsState, [e.target.name]: e.target.value });
    }

    const saveProject = async(event) => {
        event.preventDefault();
        const news = {
            projectID : newsID,
            newstitle : newsState.newstitle,
            description : newsState.description,
            imageId : newsObject[0]._id,
            originalname : newsObject[0].originalname,
            imageUrl : newsObject[0].path,
            updateBy : cookies.userName
        }
        try {
            const res = await fetch("/addNews", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "x-access-token": cookies.token
                },
                body: JSON.stringify(news)
            })
            const data = await res.json()
            console.log("data", data)
        } catch (err) {
            setErrorMessage(err)
        }

    }

  return (
    <>
       
        <div className="mb-3">
            <label htmlFor="projectDescription" className="form-label  ">News Title</label>
            <input type='text' className="form-control" name="newstitle" value={newsState.newstitle} onChange={changeHandler} id="newstitle"/>
        </div>
        <div className="mb-3">
            <label htmlFor="projectDescription" className="form-label  ">News Description</label>
            <textarea className="form-control" name="description" value={newsState.description} onChange={changeHandler} id="projectDescription" rows="3"></textarea>
        </div>
        <div className='mb-3'>
                <FileUpload title="News Images" project={newProject} updatedBy={cookies.userName} category="news" gallerysetState={setNewsObject} galleryState={newsObject} validTypes="image/png,image/jpeg" />
                <CatageoryImgC title={`News Image`}   catategoryImgs={newsObject} catategoryImgState={setNewsObject} project={newProject} category="news"  cssClass="thumb75 mb-5 shadow-lg border border-5 border-warning rounded-5" />
        </div>
        <div className='text-center'>
            <Button type="submit" cssClass="btn  btn-success" label="Save Project" handlerChange={saveProject}/>
        </div>
    </>
  );
};

export default AdminNews;
