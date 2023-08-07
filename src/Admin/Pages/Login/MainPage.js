import React from 'react'
import { Link } from 'react-router-dom'
import Title from '../../../Common/Title'
import { useNavigate } from 'react-router-dom';
import Button from '../../../Common/Button';

const MainPage = () => {

    const navigate = useNavigate();

  return (
    <div className='d-flex flex-column justify-content-center align-items-center' style={{marginTop: "200px"}}>
        <Title title="Page Content's Customization" cssClass="text-dark fs-5 mb-4" />
        <ul class="list-group w-25">
            
            <li class="list-group-item list-group-item-action text-center py-4"><Link to="/addproject" className='text-decoration-none blue-500 fs-4'>Add Project</Link></li>
            <li class="list-group-item list-group-item-action text-center py-4"><Link to="/applicationPages" className='blue-500 text-decoration-none fs-4'>New & Updates</Link></li>
            <li class="list-group-item list-group-item-action text-center py-4"><Link to="/applicationPages" className='blue-500 text-decoration-none fs-4' >Testimonials</Link></li>
            <li class="list-group-item list-group-item-action text-center py-4 bg-info"><Link to="/dashboard" className='text-decoration-none blue-900 fs-4 text-uppercase'>Dashboard</Link></li>
        </ul>
    </div>
  )
}

export default MainPage