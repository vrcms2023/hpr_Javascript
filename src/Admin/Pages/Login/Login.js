import React from 'react'
import Title from '../../../Common/Title'
import Button from '../../../Common/Button'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  return (
    <div className='bg-secondary mt-5 pt-5 pb-3 '>
      <div className='row py-5 '>
        <div className='col-lg-6 offset-lg-3 bg-light shadow-lg'>
          <div className='row'>
              <div className='col-lg-6 bg-secondary d-flex justify-content-center align-items-center'>
                <form className='border1 p-5 rounded '>
                  <Title title="Create account" cssClass="text-start text-dark mb-4 fs-4"/>
                  <div className="mb-3">
                      <label htmlFor="userName" className="form-label ">User name</label>
                      <input type="text" className="form-control bg-secondary" id="userName" aria-describedby="emailHelp" />
                      {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                  </div>
                  <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" className="form-control bg-secondary" id="email" aria-describedby="emailHelp" />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="signPassord" className="form-label">Password</label>
                      <input type="password" className="form-control bg-secondary" id="signPassord" />
                      <small>Passwords must be at least 6 characters.</small>
                  </div>
                  <div className="mb-3">
                      <label htmlFor="signPassordRe" className="form-label">Re-enter password</label>
                      <input type="password" className="form-control bg-secondary" id="signPassordRe" />
                  </div>
                  {/* <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                      <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                  </div> */}
                  <div className="d-grid gap-2">
                    <Button type="submit" cssClass="btn btn-lg btn-dark" label="Create" handlerChange={() => navigate("/dashboard")}/>
                  </div>
                </form>
              </div>

              <div className='col-lg-6 bg-light d-flex justify-content-center align-items-center'>
                <form className='border1 p-5 rounded shadow-lg'>
                  <Title title="Admin login" cssClass="text-start text-dark mb-4 fs-4"/>
                  <div className="mb-3">
                      <label htmlFor="userName" className="form-label">User name</label>
                      <input type="text" className="form-control bg-light border border-secondary" id="userName" aria-describedby="emailHelp" />
                      {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                  </div>
                  <div className="mb-3">
                      <label htmlFor="signPassord" className="form-label">Password</label>
                      <input type="password" className="form-control bg-light border border-secondary" id="signPassord" />
                      <p>Error </p>
                  </div>
                  
                  <div className="d-grid gap-2">
                    <Button type="submit" cssClass="btn btn-lg btn-secondary" label="Login" handlerChange={() => navigate("/dashboard")}/>
                  </div>
                </form>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login