import React, { useEffect } from 'react'
import Title from '../../Common/Title'
import Gallery from './Gallery'
import Specifications from '../Components/Specifications'
import Carousel from '../Components/Carousel'
import Plans from '../Components/Plans'
import Location from '../Components/Location'
import Amenities from './Amenities'

const Projects = () => {

  useEffect(() => {
    fetch("/client/getProjects")
    .then(res => res.json())
    .then(data => {
       const projectList = formatData(data);
       console.log(projectList)
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

useEffect(() => {
  fetch("/client/getSelectedProject/64cb5d5eea535b04d760d664")
  .then(res => res.json())
  .then(data => {
     console.log(data)
  }).catch(err => console.log(err))
  
},[])

  return (
    <div className='row p-0 pt-5'>
      <div className='col-md-4 d-flex justify-content-center align-items-center p-5 bg-light'>
        <div className='mx-3'>
        <Title title="Projects" cssClass="fw-normal fs-1"/>
        <Title title="Move into a home that will reflect your lifestyle" cssClass="fw-normal fs-5 mb-4 text-secondary"/>
        <p className='lh-3'>Living at the lakeside is one of those dreamy thigs, which many let go, as it isn't. We, for one, are idealists who want to bring surreal things to reality. We bring you to this lakeside and yet uncompromising urban lifestyle altogether combined. The best thing abount urban life are the apartmnts; a community and life that believes sharing is caring. You're not alone in this idealistic dream of a lakefront. You're welcomed into tis crafty construction to lay your legs down and feel at heaven, the cool breeze of the lake and the cosiness of a warm home. Make your dreams a reality now.</p>
        <ul className='list-group'>
          <li className='list-group-item'>GHMC Approved Project</li>
          <li className='list-group-item'>High-rise Gated community</li>
          <li className='list-group-item'>Seimic resistant design</li>
          <li className='list-group-item'>Right in the heart of the City</li>
          <li className='list-group-item'>Close proximity to Offices, Schools, Super Markets &amp; Hospitals</li>
        </ul>
        </div>
      </div>
      <div className='col-md-8'>
        <Carousel />
      </div>

      <div className='row shadow-lg' style={{padding: "50px 100px"}}>
        <div className='col-md-8 border bg-secondary'>
          <Plans />
        </div>
        <div className='col-md-4 bg-warning p-5'>
          <Specifications />
        </div>
      </div>

      <div className='row shadow-lg' style={{padding: "0 100px 50px"}}>
        <div className='col-md-4 bg-secondary p-0'>
          <Location />
        </div>
        <div className='col-md-8 bg-info p-5'>
          <Amenities />
        </div>
      </div>
      
    </div>
  )
}

export default Projects