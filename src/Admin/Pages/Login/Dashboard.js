import React, { useState, useEffect } from 'react'
import Title from '../../../Common/Title'
import Button from '../../../Common/Button'
import DeleteDialog from '../../../Common/DeleteDialog';
import Projects from '../../Components/Projects';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Dashboard = () => {

    const navigate = useNavigate();
    const [projects, setProjects] = useState([])
    const [cookies] = useCookies(["userName"]);
    const [userName, setUserName] = useState('');
    
    /**
     * set user name
     */
    useEffect(() =>{
        setUserName(cookies.userName);
    },[cookies.userName])


    /**
     * Get Dash borad projects
     */
    useEffect(() => {
        fetch("/getDashboardProject",{
            headers: {"x-access-token": cookies.token}
        })
        .then(res => res.json())
        .then(data => {
            if(data?.project?.length > 0) {
                const finalObj = formatData(data.project);
                setProjects(finalObj);
            }
        }).catch(err => console.log(err))
    }, []);

    /**
     * Format dashboard data
     */    
    const formatData =(data) => {
        const arrObj = [];
        const projectArray = [];
        let unique_values = [...new Set(data.map((element) => element.projectCategoryID))];
        unique_values.forEach(item => {           
            arrObj[item] = (data.filter(res => res.projectCategoryID ===  item));
        });   
        unique_values.forEach(item => {
            projectArray.push(arrObj[item])
        })
        return projectArray   
    }
    
   /**
     * Delete project form Dashboard
     * @param {project id} id 
     */

    const handleProjectDelete = (project, id) => {
        console.log(project, "project")
      const deleteDashBoardProject = () => {
        fetch(`/deleteDashboardProject/${id}`,{
            headers: {"x-access-token": cookies.token}
        })
        .then(res => res.json())
        .then(data => {
            if(data?.project?.length > 0) {
                const finalObj = formatData(data.project);
                setProjects(finalObj);
            }else {
                setProjects([]);
            }
        }).catch(err => console.log(err))
      }
      confirmAlert({
        customUI: ({ onClose, }) => {
          return (
            <DeleteDialog onClose={onClose} callback={deleteDashBoardProject} projectName={project.projectTitle}/>          
          );
        }
      });
    }


  return (
    <div className='bg-light pt-5' style={{marginTop: "90px"}}>
        {/* <div className='text-end'>
            <badge className="bg-light text-dark shadow rounded p-1">{userName ? (`You are logged as - ${userName}`):""}</badge>
        </div> */}
        <div className='row bg-light px-5'>
            <div className='text-end d-flex justify-content-between'>
                <Title title="Dashboard" cssClass="text-center fs-3"/>
                <Button type="submit" cssClass="btn btn-success" label="Add New Project" handlerChange={() => navigate("/addproject")} />
                <Button type="submit" cssClass="btn btn-success" label="User Admin" handlerChange={() => navigate("/userAdmin")} />
                <Button type="submit" cssClass="btn btn-success" label="Application Pages" handlerChange={() => navigate("/applicationPages")} />
            </div>
        </div>
       
        <div className='row bg-light p-5 pt-0'>
        { projects && projects.map((project, index) => (
             <div className='col-md-4' key={index}>
             <Projects key={index} title={project[0].projectCategoryName} cssClass="text-success" projects={project} handleProjectDelete={handleProjectDelete} />
         </div>
        )) }
        </div>
    </div>
  )
}
export default Dashboard


