import React, { useEffect, useState } from 'react'
import Button from '../../Common/Button'

import './Gallery.css'
import GalleryImgThumb from './GalleryImgThumb'

import ModelBg from '../../Common/ModelBg'
import DynamicCarousel from '../Components/DynamicCarousel'
import { getBaseURL } from '../../util/ulrUtil'

const Gallery = () => {
    const [all, setAll] = useState([])
    const [ongoing, setOngoing] = useState([])
    const [completed, setCompleted] = useState([])
    const [future, setFuture] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [img, setImg] = useState(null)
    const [btnActiveWord, setBtnActiveWord] = useState("all")

    const backendURL = getBaseURL()

    useEffect(() => {
        fetch(`${backendURL}/api/project/client/getProjects`)
        .then(res => res.json())
        .then(data => {
            setAll(data.imageList)
            const projectList = formatData(data);
            setCompleted(projectList.completed[0].imgs)
            setFuture(projectList.future[0].imgs)
            setOngoing(projectList.ongoing[0].imgs)
        //    const projectList = formatData(data);
        }).catch(err => console.log(err))
    }, []);

    const formatData  = (data)=> {
        const project = data.projectList;
        const images = data.imageList;
        const projList =[];
        
      
        const list = project.reduce((acc, val, ind) => {
          const imgs = [];
          images.forEach((el, i) => {
             if(el.projectID === val._id){
              imgs.push(el);
             };
          });
          return acc.concat({...val, imgs});
       }, []);
      
       list.map((proj) => {
        if(!projList[proj.projectCategoryValue]) {
          projList[proj.projectCategoryValue] = []
        }
        projList[proj.projectCategoryValue].push(proj)
        
       });
       return projList;
      }

    const thumbHandler = (label) => {
        const splitLabel = label.split(" ")
        const word = splitLabel[0].toLowerCase()
        setBtnActiveWord(word)
        if(word === "all") setAll([...ongoing, ...completed, ...future]);
        if(word === "ongoing") setAll(ongoing);
        if(word === "completed") setAll(completed);
        if(word === "future") setAll(future);
    }

    const findThumbHandler = (id) => {
        const findImg = all.find(allGallery => allGallery._id === id)
        setShowModal(!showModal)
        setImg(findImg)
    }

    const closeModel = () => {
        setShowModal(!showModal)
    }

    useEffect(() => {
        window.scrollTo(0,0)
    },[])

  return (
    <>
    <div className='py-5 mt-5'>
        <div className='text-center pb-2 mt-5'>
            <Button type="" cssClass={`loadMore me-2 ${btnActiveWord === "all" ? "active" : ""}`} label="All" handlerChange={thumbHandler}/>
            <Button type="" cssClass={`loadMore me-2 ${btnActiveWord === "ongoing" ? "active" : ""}`} label="Ongoing Projects" handlerChange={thumbHandler}/>
            <Button type="" cssClass={`loadMore me-2 ${btnActiveWord === "completed" ? "active" : ""}`} label="Completed Projects"  handlerChange={thumbHandler}/>
            <Button type="" cssClass={`loadMore me-2 ${btnActiveWord === "future" ? "active" : ""}`} label="Future Projects"  handlerChange={thumbHandler}/>
        </div>
        <hr />
        <div>
            <ul className='list-unstyled gallery d-flex justify-content-center align-items-center flex-wrap'>
                <GalleryImgThumb imgs={all} findThumbHandler={findThumbHandler}/>
            </ul>
        </div>
    </div>

    {showModal && <DynamicCarousel obj={img} all={all} closeCarousel={closeModel}/> }
    {showModal && <ModelBg closeModel={closeModel} /> }
    </>
  )
}
export default Gallery