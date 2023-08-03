import React from 'react'
import { Link } from "react-router-dom";

import Logo from '../../../src/Images/hpr-infra-logo.png'

import './Styles.css'

const Footer = () => {
  return (
    <>
    <footer className='text-center text-dark py-3 footerTop'>
      <div className='container py-3'>
        <div className='row'>
          <div className='col-md-3 '>
            <address className='text-center text-sm-start'>
              <strong className='fs-4'>Address</strong><br />
              101, Silicon Towers, <br />
              Image Garden Road, <br />
              Madhapur, <br />
              Hyderabad - 500081.
            </address>
          </div>
          <hr className='d-block d-sm-none' />
            <div className='col-md-3 text-center text-sm-start'>
              <address>
                <strong className='fs-4'>Phone number</strong><br />
                <abbr title="Phone">P:</abbr> 40-40036841
              </address>

              <address>
                <strong className='fs-4'>Email</strong><br />
                <abbr title="Phone">E:</abbr> <a href='mailto:contact@hprinfra.com.com' className='text-dark'> contact@contact@hprinfra.com</a>
              </address>
            </div>
            <hr className='d-block d-sm-none' />
            <div className='col-md-3 text-center text-sm-start'>
            <address>
              <strong className='fs-4'>Social Media</strong><br />
              <Link to="https://www.facebook.com/HPRInfraProjects" target='_blank' className='ms-0 text-underline'>Facebook</Link > <br />
              <Link to="https://plus.google.com/+HprinfraprojectsAdibatlaHyderabad/posts" target='_blank' className='ms-0'>Google Plus</Link >
            </address>
          </div>

          <div className='col-md-3 text-start d-none d-md-block'>
              <img src={Logo} alt=""/>
          </div>
      </div>
      </div>
    </footer>
    <footer className='text-center text-white py-4 footerLinks'>
      <div className='container d-flex justify-content-between align-items-center flex-column flex-sm-row  '>
        <ul className='d-lg-flex flex-md-wrapjustify-content-between align-items-center list-unstyled m-0'>
            <li >
              <Link to="/" className='ms-0'>Home</Link >
            </li>
            <li >
              <Link  to="/about" >About Us</Link >
            </li>
            <li >
            <Link  to="/projects" >Projects</Link >
            </li>
            <li >
              <Link  to="/gallery" >Gallery</Link >
            </li>
            <li >
              <Link  to="/gallery" >News & Updates</Link >
            </li>
            <li >
              <Link  to="/contact" >Contact Us</Link >
            </li>
        </ul>
        <ul className='d-lg-flex justify-content-between align-items-center list-unstyled m-0'>
          <li >
            <Link to="/">Privacy Policy</Link >
          </li>
          <li >
            <Link  to="/" > News & Updates</Link >
          </li>
        </ul>
      </div>
    </footer>
    <footer className='text-center text-white py-4 footerCopyRights'>
      Copyrights 2023 - All rights reserved
    </footer>
    </>
  )
}
export default Footer