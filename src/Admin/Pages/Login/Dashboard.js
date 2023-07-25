import React, { useState, useEffect } from 'react'
import Title from '../../../Common/Title'
import Button from '../../../Common/Button'
import Projects from '../../Components/Projects';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

import ProjectsJSON from '../../../Data/Projects.json'

const Dashboard = () => {

    const navigate = useNavigate();
    const [projects, setProjects] = useState([])
    const [cookies] = useCookies(["userName"]);
    const [userName, setUserName] = useState('')

    useEffect(() =>{
        setUserName(cookies.userName);
    },[cookies.userName])

    const handleProjectDelete = (id) => {
        // for(let i=0; i<projects.length; i++){
        //     for(let j=0; j<projects[i].length; j++) {
        //         const filtered = projects[i].filter(project => project.id !== id)
        //         setProjects(filtered)
        //     }
        // }

        let Obj = []
        // projects.map(projArr => projArr.map(proj => console.log(proj)))
        const arrObj = projects.map(projArr => projArr)
            for(let i=0; i<arrObj.length; i++){
                const arrs = arrObj[i]
                const filterObj = arrs.map(obj => obj)
                const finalObj = filterObj.filter(obj => obj.id !== id)
                Obj.push(finalObj)
            }
            setProjects(Obj)
    }
    
    useEffect(() => {
        let obj = []
        const objectKeys = Object.keys(ProjectsJSON)
        for(let i=0; i<objectKeys.length; i++) {
            obj.push(ProjectsJSON[objectKeys[i]])
                setProjects(obj)
            // for(let j=0; j<ProjectsJSON[objectKeys[i]].length; j++){
            //     obj.push(ProjectsJSON[objectKeys[i]][j])
            //     setProjects(obj)
            // }
        }
    }, [])

  return (
    <div className='bg-light pt-5' style={{marginTop: "90px"}}>
    <div className='row bg-light px-5'>
        {userName ? (`userName = ${userName}`):""}
    </div>
        <div className='row bg-light px-5'>
            <div className='text-end d-flex justify-content-between'>
                <Title title="Dashboard" cssClass="text-center fs-3"/>
                <Button type="submit" cssClass="btn btn-success" label="Add New Project" handlerChange={() => navigate("/addproject")} />
            </div>
        </div>
        <hr />
       
        <div className='row bg-light p-5 pt-0'>
        { projects && projects.map((project, index) => (
             <div className='col-md-4' key={project.id}>
             <Projects key={project.id} title="Ongoing Projects" cssClass="text-success" projects={project} handleProjectDelete={handleProjectDelete} />
         </div>
        )) }
        </div>
    </div>
  )
}
export default Dashboard


