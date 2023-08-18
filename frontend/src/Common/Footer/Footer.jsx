import React, { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../../../src/Images/hpr-infra-logo.png";

import "./Styles.css";
import Model from "../../Common/Model";
import ModelBg from "../ModelBg";

const Footer = () => {
  const [show, setShow] = useState(false);
  const privacyPolacyObj = {
    title: "Privacy Policy",
    dec: "Personal Information: Some personal information including name, contact numbers, e-mail addresses, and other demographic information is collected through enquiry forms. HPR Infra Group takes precautions to protect your individual / personal information from unauthorized use and makes internal use of your contact information only to inform you of projects and services that may interest you. When you voluntarily send us electronic mail, we will keep a record of this information so that we can respond to you. However, we do not disclose your information to other public bodies or individuals except as authorized by law. \n\n As you travel through the HPR Infra Projects website, our servers log information about your session. Information logged includes items such as your IP address, what browser you are using, the time and date you visited, how long your session lasted, and what pages you visited. We use this information from our server logs primarily to learn about our visitors as a group, to track visitors and readership on our website.\n\n HPR INFRA Group reserves the right to change this policy in any manner at any time without prior notice. If we make material changes to our privacy policy, the same will be updated on the website.",
    cr: "Copyright",
    crm: "The content on this website is the exclusive property of The HPR INFRA GROUP",
  };

  const showModel = () => {
    setShow(!show);
  };
  const closeModel = () => {
    setShow(!show);
  };
  return (
    <>
      <footer className="text-center text-dark py-2 py-md-5 footerTop">
        <div className="container">
          <div className="row">
            <div className="col-md-3 ">
              <address className="text-center text-sm-start">
                <strong className="fs-5">Address</strong>
                <br />
                101, Silicon Towers, <br />
                Image Garden Road, <br />
                Madhapur, <br />
                Hyderabad - 500081.
              </address>
            </div>
            <hr className="d-block d-sm-none" />
            <div className="col-md-3 text-center text-sm-start">
              <address>
                <strong className="fs-5">Phone number</strong>
                <br />
                <abbr title="Phone">P:</abbr> 40-40036841
              </address>

              <address className="mb-md-0">
                <strong className="fs-5">Email</strong>
                <br />
                <abbr title="Phone">E:</abbr>{" "}
                <a href="mailto:contact@hprinfra.com.com" className="text-dark">
                  {" "}
                  contact@contact@hprinfra.com
                </a>
              </address>
            </div>
            <hr className="d-block d-sm-none" />
            <div className="col-md-3 text-center text-sm-start">
              <address>
                <strong className="fs-5">Social Media</strong>
                <br />
                <Link
                  to="https://www.facebook.com/HPRInfraProjects"
                  target="_blank"
                  className="ms-0 text-underline"
                >
                  Facebook
                </Link>{" "}
                <br />
                <Link
                  to="https://plus.google.com/+HprinfraprojectsAdibatlaHyderabad/posts"
                  target="_blank"
                  className="ms-0"
                >
                  Google Plus
                </Link>
              </address>
            </div>

            <div className="col-md-3 text-start d-none d-md-block">
              <img src={Logo} alt="HPR Infra" />
            </div>
          </div>
        </div>
      </footer>
      <footer className="text-center text-white py-3 footerLinks">
        <div className="container d-flex justify-content-between align-items-center flex-column flex-sm-row  ">
          <ul className="d-lg-flex flex-md-wrapjustify-content-between align-items-center list-unstyled m-0">
            <li>
              <Link to="/" className="ms-0">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/news">News & Updates</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
          <ul className="d-lg-flex justify-content-between align-items-center list-unstyled m-0">
            <li>
              <Link to="" onClick={showModel}>
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </footer>
      <footer className="text-center text-white text-muted py-2 footerCopyRights">
        Copyrights 2023 - All rights reserved
      </footer>

      {show && (
        <Model
          privacy={privacyPolacyObj}
          closeModel={closeModel}
          flag="footer"
        />
      )}
      {show && <ModelBg />}
    </>
  );
};
export default Footer;
