import React, { useState, useEffect } from 'react'
import Title from '../../../Common/Title'
import Button from '../../../Common/Button'
import Projects from '../../Components/Projects';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

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
    const handleProjectDelete = (id) => {
       
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
             <div className='col-md-4' key={index}>
             <Projects key={index} title={project[0].projectCategoryName} cssClass="text-success" projects={project} handleProjectDelete={handleProjectDelete} />
         </div>
        )) }
        </div>
    </div>
  )
}
export default Dashboard


