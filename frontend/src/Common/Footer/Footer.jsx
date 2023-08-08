import React, {useState} from 'react'
import { Link } from "react-router-dom";

import Logo from '../../../src/Images/hpr-infra-logo.png'

import './Styles.css'
import Model from '../../Common/Model'
import ModelBg from '../ModelBg';

const Footer = () => {
  const [show, setShow] = useState(false)
  const privacyPolacyObj = {title: "Privacy Policy", description:"HPR Infra Projects has instantly made a distinctive mark on the cityscape of Hyderabad: the city in which the group is headquartered, as it understands the city with an instinctive ease sharing with it a glorious past and a promising future. Abibaltla had become prominent because of IT SEZ & Aero Space SEZ. TCS, CTS, and small other companies had been allotted land in IT SEZ. TCS, which is about to complete the construction is expected to generate an employment of 27,000 employees in Adibatla Campus. Tata Advanced Systems, a group company of Tata’s started their manufacturing facility for Helicopter units, wings manufacturing in collaboration with LOCKHEED MARTIN and SIKORSKY AIRCRAFT CORPORATION in the Aerospace SEZ, Adibatla. "}

  const showModel = () => {
    setShow(!show)
  }
  const closeModel = () => {
    setShow(!show)
  }
  return (
    <>
    <footer className='text-center text-dark py-2 py-md-5 footerTop'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-3 '>
            <address className='text-center text-sm-start'>
              <strong className='fs-5'>Address</strong><br />
              101, Silicon Towers, <br />
              Image Garden Road, <br />
              Madhapur, <br />
              Hyderabad - 500081.
            </address>
          </div>
          <hr className='d-block d-sm-none' />
            <div className='col-md-3 text-center text-sm-start'>
              <address>
                <strong className='fs-5'>Phone number</strong><br />
                <abbr title="Phone">P:</abbr> 40-40036841
              </address>

              <address className='mb-md-0'>
                <strong className='fs-5'>Email</strong><br />
                <abbr title="Phone">E:</abbr> <a href='mailto:contact@hprinfra.com.com' className='text-dark'> contact@contact@hprinfra.com</a>
              </address>
            </div>
            <hr className='d-block d-sm-none' />
            <div className='col-md-3 text-center text-sm-start'>
            <address>
              <strong className='fs-5'>Social Media</strong><br />
              <Link to="https://www.facebook.com/HPRInfraProjects" target='_blank' className='ms-0 text-underline'>Facebook</Link > <br />
              <Link to="https://plus.google.com/+HprinfraprojectsAdibatlaHyderabad/posts" target='_blank' className='ms-0'>Google Plus</Link >
            </address>
          </div>

          <div className='col-md-3 text-start d-none d-md-block'>
              <img src={Logo} alt="HPR Infra"/>
          </div>
      </div>
      </div>
    </footer>
    <footer className='text-center text-white py-3 footerLinks'>
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
              <Link  to="/news" >News & Updates</Link >
            </li>
            <li >
              <Link  to="/contact" >Contact Us</Link >
            </li>
        </ul>
        <ul className='d-lg-flex justify-content-between align-items-center list-unstyled m-0'>
          <li >
            <Link to="" onClick={showModel}>Privacy Policy</Link >
          </li>
        </ul>
      </div>
    </footer>
    <footer className='text-center text-white text-muted py-2 footerCopyRights'>
      Copyrights 2023 - All rights reserved
    </footer>

    {show && <Model obj={privacyPolacyObj} closeModel={closeModel} />}
    {show && <ModelBg /> }
    </>
  )
}
export default Footer