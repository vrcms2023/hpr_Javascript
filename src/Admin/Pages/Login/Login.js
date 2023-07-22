import React, {useEffect, useState} from 'react'
import Title from '../../../Common/Title'
import Button from '../../../Common/Button'
import { useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie";

const Login = () => {
  const [cookies, setCookie,removeCookie] = useCookies(["token"]);
  const [userName , setUserName] = useState('')

  const [registrationState, setRegistrationState] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword : "",
  })

  function handleRegistrationChange(evt) {
    const value = evt.target.value;
    setRegistrationState({
      ...registrationState,
      [evt.target.name]: value
    });
  }
  const [errorMessage, setErrorMessage] = useState("")

  async function handleRegister(event) {
    event.preventDefault();
    try {
        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(registrationState)
        })
        const data = await res.json()
        setErrorMessage(data.message)
    } catch (err) {
        setErrorMessage(err)
    }
}

/**-----------login handler */
const [loginState, setLoginState] = useState({ 
  email: "",
  password: ""
})

function handleloginChange(evt) {
  const value = evt.target.value;
  setLoginState({
    ...loginState,
    [evt.target.name]: value
  });
}

async function handleLogin(event) {
  event.preventDefault();
  try {
      const res = await fetch("/login", {
          method: "POST",
          headers: {
              "Content-type": "application/json"
          },
          body: JSON.stringify(loginState)
      })
      const data = await res.json()
      if(data.token){
        localStorage.setItem("token", data.token)
        setCookie("token", data.token)
        setErrorMessage(data.message)
        setUserName(data.userName);        
      } else{
        removeCookie("token")
        setErrorMessage(data.message)
      }      
  } catch (err) {
      setErrorMessage(err)
  }
}

  const navigate = useNavigate()
  return (
    <div className='bg-secondary mt-5 pt-5 pb-3 '>
      <div className='row py-5 '>
        <div className='col-lg-6 offset-lg-3 bg-light shadow-lg'>
          <div className='row'>
              <div className='col-lg-6 bg-secondary d-flex justify-content-center align-items-center'>
                <form className='border1 p-5 rounded ' onSubmit={handleRegister}>
                  <Title title="Create account" cssClass="text-start text-dark mb-4 fs-4"/>
                  <div className='mb-3'>
                  <div>{errorMessage}</div>
                </div>
                  <div className="mb-3">
                      <label htmlFor="userName" className="form-label ">User name</label>
                      <input type="text" name="userName" value={registrationState.userName} onChange={handleRegistrationChange} className="form-control bg-secondary" id="userName" aria-describedby="emailHelp" />
                      {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                  </div>
                  <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" value={registrationState.email} onChange={handleRegistrationChange} name="email"  className="form-control bg-secondary" id="email" aria-describedby="emailHelp" />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="signPassord" className="form-label">Password</label>
                      <input type="password" value={registrationState.password} onChange={handleRegistrationChange} name="password"  className="form-control bg-secondary" id="signPassord" />
                      <small>Passwords must be at least 6 characters.</small>
                  </div>
                  <div className="mb-3">
                      <label htmlFor="signPassordRe" className="form-label">Re-enter password</label>
                      <input type="password" value={registrationState.confirmPassword} onChange={handleRegistrationChange} name="confirmPassword" className="form-control bg-secondary" id="signPassordRe" />
                  </div>
                  {/* <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                      <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                  </div> */}
                  <div className="d-grid gap-2">
                    <Button type="submit" cssClass="btn btn-lg btn-dark" label="Create"/>
                  </div>
                </form>
              </div>

              <div className='col-lg-6 bg-light d-flex justify-content-center align-items-center'>
                <form className='border1 p-5 rounded shadow-lg' onSubmit={handleLogin}>
                  <Title title="Admin login" cssClass="text-start text-dark mb-4 fs-4"/>
                  <div className='mb-3'>
                  <div>{errorMessage}</div>
                  <div>{userName}</div>
                </div>
                  <div className="mb-3">
                      <label htmlFor="userName" className="form-label">User name</label>
                      <input type="text" value={loginState.email} onChange={handleloginChange} name="email"  className="form-control bg-light border border-secondary" id="userName" aria-describedby="emailHelp" />
                      {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                  </div>
                  <div className="mb-3">
                      <label htmlFor="signPassord" className="form-label">Password</label>
                      <input type="password" value={loginState.password} onChange={handleloginChange} name="password"  className="form-control bg-light border border-secondary" id="signPassord" />
                      <p>Error </p>
                  </div>
                  
                  <div className="d-grid gap-2">
                    <Button type="submit" cssClass="btn btn-lg btn-secondary" label="Login" />
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