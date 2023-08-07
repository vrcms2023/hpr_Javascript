import React, { useEffect, useState } from 'react'
import Title from '../../Common/Title'
import ProjectDetails from '../Components/ProjectsTabs/ProjecTabs'
// import Specifications from '../Components/Specifications'
// import Carousel from '../Components/Carousel'
// import Plans from '../Components/Plans'
// import Location from '../Components/Location'
// import Amenities from './Amenities'

import './Projects.css'

import Img1 from '../../Images/ongoing.png'
import Img2 from '../../Images/future.png'
import Img3 from '../../Images/completed.png'

const Projects = () => {

  const[projects, setProjects] = useState([])
  const [completed, setCompleted] = useState([])
  const [future, setFuture] = useState([])
  const [ongoing, setOngoing] = useState([])

  useEffect(() => {
    fetch("/client/getProjects")
    .then(res => res.json())
    .then(data => {
       const projectList = formatData(data);
       setCompleted(projectList.completed)
       setFuture(projectList.future)
       setOngoing(projectList.ongoing)
    }).catch(err => console.log(err))
}, []);

// console.log(completed[0].imgs)
// console.log(future)
// console.log(ongoing[0].imgs[0].path)

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

useEffect(() => {
  fetch("/client/getSelectedProject/64cb5d5eea535b04d760d664")
  .then(res => res.json())
  .then(data => {
    //  console.log(data)
  }).catch(err => console.log(err))
  
},[])
  return (
    <>
      <div className='row p-0 pt-5'>
        <div className='col-md-12 banner'></div>
      </div>

      <div className='row py-3 introGrayBg'>
        <div className='col-md-8 offset-md-2 py-4'>
        <Title title="Welcome To HPR Infra Projects" cssClass="mb-2 fw-normal fs-2 text-center green-700" />
        <p className='text-center lh-md'>We believe that construction is a man made wonder. The thought of bringing imagination to real life structures excites us, each day the passion in us grows as we contribute to this industry.</p>
        </div>
      </div>

      {/* <div className='container'><ProjectDetails /></div> */}
      

      { /* Ongoing Projects */ }

      {/* {ongoing.length > 0 ? <div><img src={ongoing[0].imgs[0].path} alt="" width="300" /></div> : ""} */}
      {/* {ongoing.length > 0 ? 
        ongoing.map(project => console.log(project.imgs[5].path))
      : ""} */}

{/* {ongoing.length > 0 ? 
        ongoing.map(project => <div><img src={project.imgs[0].path} alt="" width="300" /></div>)
      : ""} */}

      <div className='container pt-5 pb-3'>
        <div className='row'>
          <div className='col-md-12 '>
            <Title title="Ongoing Projects" cssClass="blue-900"/>
            <p>We believe that construction is a man made wonder. The thought of bringing imagination to real life structures excites us, each day the passion in us grows as we contribute to this industry.</p>
          </div>
          </div>
          <div className='row'>

          {ongoing.length > 0 ? ongoing.map(project => 
            <div className='col-md-4 mb-3' key={project._id}>
              <div className='position-relative box'>
              <div className='infoStrip'>
                <Title title={project.projectTitle} cssClass="text-white fs-5"/>
                <a href="" className='blue-900'>more details</a>
              </div>
              <img src={project.imgs[0].path} alt="" />
              </div>
            </div>
          )
      : ""}
          </div>
          {ongoing.length > 3 ? 
          <div className='row mt-3'>
            <div className='col-md-12 text-center py-3'>
              <a href='#' className='loadMore'>LOAD MORE 
              <svg width="8" height="11" className='ms-2' viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.64645 10.3536C3.84171 10.5488 4.15829 10.5488 4.35355 10.3536L7.53553 7.17157C7.7308 6.97631 7.7308 6.65973 7.53553 6.46447C7.34027 6.2692 7.02369 6.2692 6.82843 6.46447L4 9.29289L1.17157 6.46447C0.97631 6.2692 0.659728 6.2692 0.464466 6.46447C0.269204 6.65973 0.269204 6.97631 0.464466 7.17157L3.64645 10.3536ZM3.5 -2.18557e-08L3.5 10L4.5 10L4.5 2.18557e-08L3.5 -2.18557e-08Z" fill="#165D3D"/>
</svg>
</a>
            </div>
          </div>
          : "" }
      </div>

      { /* Completed Projects */ }
      
      <div className='container pt-5 pb-3'>
        <div className='row'>
          <div className='col-md-12 '>
          <Title title="Completed Projects" cssClass="blue-900"/>
            <p>We believe that construction is a man made wonder. The thought of bringing imagination to real life structures excites us, each day the passion in us grows as we contribute to this industry.</p>
          </div>
          </div>
          <div className='row'>

          {completed.length > 0 ? completed.map(project => 
            <div className='col-md-4 mb-3 mb-md-0' key={project._id}>
              <div className='position-relative box'>
              <div className='infoStrip'>
                <Title title={project.projectTitle} cssClass="text-white fs-5"/>
                <a href="" className='blue-900'>more details</a>
              </div>
              <img src={project.imgs[3].path} alt="" />
              </div>
            </div>
          )
      : ""}
          </div>
          {completed.length > 3 ? 
          <div className='row mt-3'>
            <div className='col-md-12 text-center py-3'>
              <a href='#' className='loadMore'>LOAD MORE 
              <svg width="8" height="11" className='ms-2' viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.64645 10.3536C3.84171 10.5488 4.15829 10.5488 4.35355 10.3536L7.53553 7.17157C7.7308 6.97631 7.7308 6.65973 7.53553 6.46447C7.34027 6.2692 7.02369 6.2692 6.82843 6.46447L4 9.29289L1.17157 6.46447C0.97631 6.2692 0.659728 6.2692 0.464466 6.46447C0.269204 6.65973 0.269204 6.97631 0.464466 7.17157L3.64645 10.3536ZM3.5 -2.18557e-08L3.5 10L4.5 10L4.5 2.18557e-08L3.5 -2.18557e-08Z" fill="#165D3D"/>
</svg>
</a>
            </div>
          </div>
          : "" }
      </div>


      { /* Future Projects */ }
      <div className='container pt-5 pb-3'>
        <div className='row'>
          <div className='col-md-12 '>
          <Title title="Future Projects" cssClass="blue-900"/>
            <p>We believe that construction is a man made wonder. The thought of bringing imagination to real life structures excites us, each day the passion in us grows as we contribute to this industry.</p>
          </div>
          </div>
          <div className='row'>

          {future.length > 0 ? future.map(project => 
            <div className='col-md-4 mb-3 mb-md-0' key={project._id}>
              <div className='position-relative box'>
              <div className='infoStrip'>
                <Title title={project.projectTitle} cssClass="text-white fs-5"/>
                <a href="" className='blue-900'>more details</a>
              </div>
              <img src={project.imgs[3].path} alt="" />
              </div>
            </div>
          )
      : ""}
          </div>
          {future.length > 3 ? 
          <div className='row mt-3'>
            <div className='col-md-12 text-center py-3'>
              <a href='#' className='loadMore'>LOAD MORE 
              <svg width="8" height="11" className='ms-2' viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.64645 10.3536C3.84171 10.5488 4.15829 10.5488 4.35355 10.3536L7.53553 7.17157C7.7308 6.97631 7.7308 6.65973 7.53553 6.46447C7.34027 6.2692 7.02369 6.2692 6.82843 6.46447L4 9.29289L1.17157 6.46447C0.97631 6.2692 0.659728 6.2692 0.464466 6.46447C0.269204 6.65973 0.269204 6.97631 0.464466 7.17157L3.64645 10.3536ZM3.5 -2.18557e-08L3.5 10L4.5 10L4.5 2.18557e-08L3.5 -2.18557e-08Z" fill="#165D3D"/>
</svg>
</a>
            </div>
          </div>
          : "" }
      </div>


      
    </>
  )
}

export default Projects