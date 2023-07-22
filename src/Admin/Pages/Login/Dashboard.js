import React, { useState, useEffect } from 'react'
import Title from '../../../Common/Title'
import Button from '../../../Common/Button'
import Projects from '../../Components/Projects';
import { useNavigate } from 'react-router-dom';

import ProjectsJSON from '../../../Data/Projects.json'


const Dashboard = () => {

    const navigate = useNavigate();
    const [ongoingProject, setOngoingProject] =useState([]);
    const [futureProjects, setFutureProjects] = useState([])
    const [onCompletedProjects, setCompletedProjects] = useState([])
    const handleProjectDelete = (project) => {
        if(project.category ==="ongoing") {
            const filteredData = ongoingProject.filter(obj => obj.id !== project.id);
            setOngoingProject(filteredData)
        }
    }

    

    useEffect(() => {
        // const projects = Object.keys(ProjectsJSON);
        // console.log(ProjectsJSON[projects[2]])
        setOngoingProject(ProjectsJSON.ongoingProjectsObj);
        setFutureProjects(ProjectsJSON.futureProjectsObj);
        setCompletedProjects(ProjectsJSON.completedProjectsObj)
    }, [])

  return (
    <div className='bg-light pt-5' style={{marginTop: "90px"}}>
        <div className='row bg-light px-5'>
            <div className='text-end d-flex justify-content-between'>
                <Title title="Dashboard" cssClass="text-center fs-3"/>
                <Button type="submit" cssClass="btn btn-success" label="Add New Project" handlerChange={() => navigate("/addproject")} />
            </div>
        </div>
        <hr />
        <div className='row bg-light p-5 pt-0'>
            <div className='col-md-4'>
                <Projects title="Ongoing Projects" cssClass="text-success" projects={ongoingProject} handleProjectDelete={handleProjectDelete} />
            </div>
            <div className='col-md-4'>
                <Projects title="Future Projects" projects={futureProjects} handleProjectDelete={handleProjectDelete} />
            </div>
            <div className='col-md-4'>
                <Projects title="Completed Projects" projects={onCompletedProjects} handleProjectDelete={handleProjectDelete} />
            </div>
        </div>
    </div>
  )
}
export default Dashboard


