import React, { useEffect, useState } from 'react'
import Title from '../../Common/Title'
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

console.log(completed)

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
        <div className='col-md-12 banner'>fsda</div>
      </div>

      <div className='row py-3 introGrayBg'>
        <div className='col-md-8 offset-md-2 py-4'>
        <Title title="Welcome To HPR Infra Projects" cssClass="mb-2 fw-normal fs-2 text-center green-700" />
        <p className='text-center lh-md'>We believe that construction is a man made wonder. The thought of bringing imagination to real life structures excites us, each day the passion in us grows as we contribute to this industry.</p>
        </div>
      </div>
      <div className='container py-5'>
        <div className='row'>
          <div className='col-md-12 '>
            <Title title="Completed Projects" cssClass="blue-900"/>
            <p>We believe that construction is a man made wonder. The thought of bringing imagination to real life structures excites us, each day the passion in us grows as we contribute to this industry.</p>
          </div>
          </div>
          <div className='row'>
            <div className='col-md-4'>
              <div className='position-relative box'>
              <div className='infoStrip'>
                <h6 className='text-white mb-1'>PROJECT NAME</h6>
                <a href="" className='blue-900'>more details</a>
              </div>
              <img src={Img1} alt="" />
              </div>
            </div>
            <div className='col-md-4'>
            <div className='position-relative box'>
            <div className='infoStrip'>
                <h6 className='text-white m-0'>PROJECT NAME</h6>
                <a href="" className='blue-900'>more details</a>
              </div>
              <img src={Img2} alt="" />
              </div>
            </div>
            <div className='col-md-4'>
            <div className='position-relative box'>
            <div className='infoStrip'>
                <h6 className='text-white m-0'>PROJECT NAME</h6>
                <a href="" className='blue-900'>more details</a>
              </div>
              <img src={Img3} alt="" />
              </div>
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col-md-12 text-center py-3'>
              <a href='#' className='loadMore'>LOAD MORE 
              <svg width="8" height="11" className='ms-2' viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.64645 10.3536C3.84171 10.5488 4.15829 10.5488 4.35355 10.3536L7.53553 7.17157C7.7308 6.97631 7.7308 6.65973 7.53553 6.46447C7.34027 6.2692 7.02369 6.2692 6.82843 6.46447L4 9.29289L1.17157 6.46447C0.97631 6.2692 0.659728 6.2692 0.464466 6.46447C0.269204 6.65973 0.269204 6.97631 0.464466 7.17157L3.64645 10.3536ZM3.5 -2.18557e-08L3.5 10L4.5 10L4.5 2.18557e-08L3.5 -2.18557e-08Z" fill="#165D3D"/>
</svg>
</a>

            </div>
          </div>
      </div>
    </>
  )
}

export default Projects