import React from 'react'
import Title from '../../Common/Title'
import { Link } from 'react-router-dom'

const Projects = ( {title, cssClass, projects, handleProjectDelete}) => {
  return (
    <>
        
        <Title title={title} cssClass="text-start fw-bold pt-4 fs-5"/>
        <table className={`table shadow-lg border border-1 table-striped table-secondary border-secondary`}>
            <thead>
                <tr className=''>
                <th scope="col" className='py-2 bg-light fw-normal text-dark'>Name</th>
                <th scope="col" className='py-2 bg-light fw-normal text-dark'>Status</th>
                <th scope="col" colSpan={2} className='py-2 bg-light fw-normal text-dark'>Actions</th>
                </tr>
            </thead>
            <tbody>
            {projects.length > 0 ? projects.map(project => (
                <tr key={project.id}>
                <td className='align-middle fw-bold'>{project.id}</td>
                <td className='align-middle'>{project.projectName} <span className={`badge text-dark bg-${project.cagetory === "ongoing" ? "warning" : project.cagetory === "future" ? "info " : project.cagetory === "completed" ? "success text-white" : ""}`}>{project.status}</span></td>
                <td className='align-middle'><Link to="/addproject"><i className="fa fa-pencil fs-3 text-secondary" aria-hidden="true"></i></Link></td>
                <td className='align-middle'><Link to="" onClick={() => handleProjectDelete(project)}><i className="fa fa-trash-o fs-3 text-danger" aria-hidden="true"></i></Link></td>
            </tr>
            ))  
            : "No projects found" }
                
            </tbody>
        </table>
    </>
  )
}

export default Projects