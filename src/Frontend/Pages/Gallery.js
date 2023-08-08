import React, { useEffect, useState } from 'react'
import Button from '../../Common/Button'

import './Gallery.css'
import GalleryImgThumb from './GalleryImgThumb'

const Gallery = () => {

    const [all, setAll] = useState([])
    const [ongoing, setOngoing] = useState([])
    const [completed, setCompleted] = useState([])
    const [future, setFuture] = useState([])
   

    const [img, setImg] = useState(null)


    useEffect(() => {
        fetch("/client/getProjects")
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
        if(word === "all") setAll([...ongoing, ...completed, ...future]);
        if(word === "ongoing") setAll(ongoing);
        if(word === "completed") setAll(completed);
        if(word === "future") setAll(future);
    }

    const findThumbHandler = (id) => {
        const findImg = all.find(allGallery => allGallery._id === id)
        setImg(findImg)
        console.log(findImg)
    }

  return (
    <div className='py-5 mt-5'>
        <div className='text-center pb-2 mt-5'>
            <Button type="" cssClass="loadMore me-2 active" label="All" handlerChange={thumbHandler}/>
            <Button type="" cssClass="loadMore me-2" label="Ongoing Projects" handlerChange={thumbHandler}/>
            <Button type="" cssClass="loadMore me-2" label="Completed Projects"  handlerChange={thumbHandler}/>
            <Button type="" cssClass="loadMore me-2" label="Future Projects"  handlerChange={thumbHandler}/>
        </div>
        <hr />
        <div>
            <ul className='list-unstyled gallery d-flex justify-content-center align-items-center flex-wrap'>
                <GalleryImgThumb imgs={all} findThumbHandler={findThumbHandler}/>
            </ul>
        </div>
    </div>
  )
}
export default Gallery