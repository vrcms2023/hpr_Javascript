import React, {useEffect, useState} from 'react'
import Title from '../../Common/Title'
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom'

import './Contact.css'

import contactImg from '../../Images/contact.png'

const Contact = () => {
  const formObject = {firstName: "",lastName:"", email: "",phone:"",message: ""};
  const [formData, setFormData] = useState(formObject);
  const [cookies, setCookie, removeCookie] = useCookies(["clientInformation"]);
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };


  /**
   * contactus form submit
   */
  const onFormSubmit = (e) => {
    e.preventDefault();
    
    fetch('updateContactDetails/', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((data) => {
      removeCookie("clientInformation")
      setCookie("clientInformation", data.contactus.email, {maxAge: 86400})
      setFormData(formObject)
      if(cookies.previousPath !== undefined) {
        navigate(`/${cookies.previousPath}`)
      }
      
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-12'>
              <img src={contactImg} alt="Quick Contact" className='w-100' />
            </div>
        </div>

        {/* Introduction */}
        <div className='row py-3 introGrayBg'>
            <div className='col-md-8 offset-md-2 py-4'>
            <Title title="Share your views" cssClass="mb-2 fw-normal fs-2 text-center green-700" />
            <p className='text-center lh-md'>We believe that construction is a man made wonder. The thought of bringing imagination to real life structures excites us, each day the passion in us grows as we contribute to this industry.</p>
            </div>
        </div>

      <div className='row'>
      <div className='col-md-4 text-white d-flex justify-content-start align-items-start blueBg-500 p-5'>
          <div className='address`'>
          <Title title="Address" cssClass=""/>
          <Title title="We’d Love to Hear From You, Get In Touch With Us!" cssClass="fs-6 mb-4"/>
          <p className='mb-5'>
            101, Silicon Towers, <br />
            Image Garden Road, <br />
            Madhapur, <br />
            Hyderabad - 500081
          </p>

          <Title title="Phone Number" cssClass=""/>
          <p>40-40036841</p>

          <Title title="Email Id" cssClass=""/>
          <p><a href='mailto:contact@hprinfraprojects.com' className='fs-6 text-white'> contact@hprinfraprojects.com</a></p>
            
          </div>
        </div>
        <div className='col-md-8 d-flex justify-content-center align-items-center'>
        <form className='my-5 py-0 py-md-5 contactForm' onSubmit={onFormSubmit}>
        <Title title="Quick contact" cssClass="text-black fw-bold mb-4"/>

          <div className="mb-3 row">
            <label htmlFor="exampleInputFName" className="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
              <input type="textbox" name="firstName" value={formData.firstName} onChange={handleChange} className="form-control" id="exampleInputFName" aria-describedby="emailHelp" />
              {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="exampleInputLName" className="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
              <input type="textbox" name="lastName" value={formData.lastName} onChange={handleChange} className="form-control" id="exampleInputLName" aria-describedby="emailHelp" />
              {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
              </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="exampleInputEmail1" className="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="exampleInputPhone" className="col-sm-2 col-form-label">Phone</label>
            <div class="col-sm-10">
              <input type="textbox" name="phone" value={formData.phone} onChange={handleChange} className="form-control" id="exampleInputPhone" aria-describedby="emailHelp" />
              {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="exampleFormMesg" className="col-sm-2 col-form-label">Message</label>
            <div class="col-sm-10">
            <textarea className="form-control" value={formData.message} onChange={handleChange} name='message' id="exampleFormMesg" rows="3"></textarea>
          </div>
          </div>
          <div className="mb-3 row">
          <div class="col-sm-2"></div>
          <div class="col-sm-10">
            <button type="submit" className="btn btn-primary w-100 text-uppercase py-2">Send Request</button>
          </div>
          </div>
        </form>
        </div>
      </div>

      <div className='row'>
        <div className='col'>
          <iframe className="googlemap" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15226.413145928846!2d78.441906!3d17.430816!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x80e4d67809745a48!2sHPR+INFRA+PROJECTS!5e0!3m2!1sen!2sin!4v1442574301202"  height="450" width="100%"></iframe>
        </div>
        
      </div>

      
    </div>
  )
}

export default Contact