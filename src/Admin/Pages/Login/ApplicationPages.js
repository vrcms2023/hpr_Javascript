import React, { useState, useEffect } from 'react'
import Title from '../../../Common/Title'
import Button from '../../../Common/Button'

import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';


import AdminNews from '../../Components/AdminNews';

const ApplicationPages = () => {

    const navigate = useNavigate();
    const [cookies] = useCookies(["token","userName"]);

   

  return (
    <div className='bg-light pt-5' style={{marginTop: "90px"}}>
        <div className='row bg-light px-5'>
            <div className='text-end d-flex justify-content-between'>
                <Title title={'Application Pages'} cssClass="text-center fs-3"/>
                <Button type="submit" cssClass="btn btn-success" label="Back" handlerChange={() => navigate("/dashboard")} />
            </div>
        </div>

        <div className='row bg-light px-5 mt-3 shadow-lg'>
         <h3 className='my-4 text-success'>Internal Pages </h3>
         <div className='col-md-3 bg-light pb-3'>
            <div className="nav flex-column nav-pills " id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <button className="nav-link active mb-3" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-news" type="button" role="tab" aria-controls="v-pills-news" aria-selected="true">News and Updates</button>
                <button className="nav-link mb-3" id="v-pills-testimonial-tab" data-bs-toggle="pill" data-bs-target="#v-pills-testimonial" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Testimonial</button>
            </div>
        </div>
        <div className='col-md-9 bg-light pb-3'>
          <div className="tab-content" id="v-pills-tabContent">
              <div className="tab-pane fade show active" id="v-pills-news" role="tabpanel" aria-labelledby="v-pills-news-tab">
                <div className="border border-3 p-5 mb-4 shadow-lg">
                  <AdminNews />
                </div>
              </div>

              <div className="tab-pane fade show" id="v-pills-testimonial" role="tabpanel" aria-labelledby="v-pills-testimonial-tab">
                <div className="border border-3 p-5 mb-4 shadow-lg">
                testimonial
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
export default ApplicationPages


