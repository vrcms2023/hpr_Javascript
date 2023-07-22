import React from 'react'
import Title from '../../Common/Title'

const Contact = () => {
  return (
    <div className='continer pt-5'>
      <div className='row bg-secondary'>
      <div className='col-md-6 d-flex justify-content-center align-items-center'>
          <div className='address`'>
          <Title title="Office Address" cssClass="text-white fs-1"/>
          <Title title="We’d Love to Hear From You, Get In Touch With Us!" cssClass="text-white fs-5"/>
          <p>
            HPR Infra Projects ,Flat No.404,<br />
            SIRI Enclave,Srinagar Colony,Main Road, Hyderabad- 500 073
            </p>
            <div className='d-flex justify-content-start align-items-center'>
                <i class="fa fa-mobile fs-1 me-3" aria-hidden="true"></i>
                <p className='fs-5 text-dark'>040 – 65224777, <br />040 - 23740171</p>
              </div>
              <div className='d-flex justify-content-start align-items-center'>
                <i class="fa fa-envelope-o fs-5 fw-bold me-3" aria-hidden="true"></i>
                <a href='mailto:contact@hprinfraprojects.com' className='fs-6 text-dark'> contact@hprinfraprojects.com</a>
              </div>
          </div>
        </div>
        <div className='col-md-6 d-flex justify-content-start align-items-center'>
        <form className='w-50 my-5 py-5'>
          <div className="mb-3">
            <label htmlFor="exampleInputFName" className="form-label">First Name</label>
            <input type="email" className="form-control" id="exampleInputFName" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputLName" className="form-label">Last Name</label>
            <input type="email" className="form-control" id="exampleInputLName" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
            <input type="email" className="form-control" id="exampleInputPhone" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormMesg" className="form-label">Message</label>
            <textarea className="form-control" id="exampleFormMesg" rows="3"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Send Request</button>
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