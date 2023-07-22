import React from 'react'
import Title from './Title'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
    <footer className='text-center bg-secondary text-dark py-5 footerTop'>
      <div className='container py-3'>
        <div className='row'>
          <div className='col-md-4 text-start'>
              <Title title="HPR Info" cssClass="text-white fs-4"/>
              <p className=''>
              HPR Infra Projects has instantly made a distinctive mark on the cityscape of Hyderabad: the city in which the group is headquartered, as it understands the city with an instinctive ease sharing with it a glorious past and a promising future.
              </p>
            </div>

            <div className='col-md-4 text-start'>
              <Title title="Contact Info" cssClass="text-white fs-4"/>
              <p className='fs-5'>
              HPR Infra Projects, <br />Flat No.404, SIRI Enclave, Srinagar Colony, <br />Main Road, Hyderabad- 500 073.
              </p>
              
              <div className='d-flex justify-content-start align-items-center'>
                <i className="fa fa-mobile fs-1 me-3" aria-hidden="true"></i>
                <p className='fs-5 text-dark'>040 – 65224777, <br />040 - 23740171</p>
              </div>
              <div className='d-flex justify-content-start align-items-center'>
                <i className="fa fa-envelope-o fs-5 fw-bold me-3" aria-hidden="true"></i>
                <a href='mailto:contact@hprinfraprojects.com' className='fs-5 text-dark'> contact@hprinfraprojects.com</a>
              </div>
            </div>

            <div className='col-md-4 text-start'>
            <Title title="Social Media" cssClass="text-white pb-3 fs-4 text-end"/>
            <div className='d-flex justify-content-between align-items-end flex-column'>
              <a href="#" className='fs-4 text-dark'>FACEBOOK <i className="fa fa-facebook-square fs-1 ms-2" aria-hidden="true"></i></a>
              <a href="#" className='fs-4 text-dark'>GOOGLE PLUS<i className="fa fa-google-plus-square fs-1 ms-2" aria-hidden="true"></i></a>
              <a href="#" className='fs-4 text-dark'>LINKED IN<i className="fa fa-linkedin-square fs-1 ms-2" aria-hidden="true"></i></a>
              </div>
            </div>
      </div>
      </div>
     
    </footer>
    <footer className='text-center text-secondary bg-dark py-4 '>
      <div className='container d-flex justify-content-between align-items-center'>
        <div>Copyright 2015 HPR Infra    |   All Rights Reserved</div>
        <div>Privacy Policy | News & Updates</div>
      </div>
    </footer>
    </>
  )
}

export default Footer