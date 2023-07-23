import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";


const Header = () => {
  const navigate = useNavigate();
  const [cookies,removeCookie] = useCookies(["token","userName"]);
  const [userName, setUserName] = useState('')
  const [loginState, setLoginState] = useState(false);

  useEffect(()=>{
    let token = cookies.token;
    setUserName(cookies.userName);

    if(token && userName) {
      setLoginState(true)
    }
  });

  function logOutHandler(){
    removeCookie("token");
    removeCookie("userName");
    setLoginState(false)
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top py-4">
          <div className="container">
          <Link  to="/" className="navbar-brand" >Dynamic App</Link >
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/" className="nav-Link active">Home</Link >
                </li>
                <li className="nav-item">
                  <Link  to="/about" className="nav-Link ">About Us</Link >
                </li>
                <li className="nav-item dropdown">
                <Link  to="/projects" className="nav-Link ">Projects</Link >
                  {/* <a className="nav-Link  dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Projects
                  </a> */}
                  {/* <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" >Ongoing Projects</a></li>
                    <li><a className="dropdown-item" >Future Projects</a></li>
                    <li><a className="dropdown-item" >Completed Projects</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" >Something else here</a></li>
                  </ul> */}
                </li>
                <li className="nav-item">
                  <Link  to="/gallery" className="nav-Link ">Gallery</Link >
                </li>
                <li className="nav-item">
                  <Link  to="/contact" className="nav-Link ">Contact Us</Link >
                </li>
                {/* <li className="nav-item">
                  <Link  to="/addproject" className="nav-Link ">Add</Link >
                </li>
                <li className="nav-item">
                  <Link  to="/dashboard" className="nav-Link ">Dashboard</Link >
                </li> */}
                <li className="nav-item">
                  {loginState ? (
                    <Button type="submit" cssClass="btn btn-warning" label="Logout" handlerChange={logOutHandler} />
                  ) : (
                    <Button type="submit" cssClass="btn btn-warning" label="Login" handlerChange={() => navigate("/login")} />
                  )}
                  
                </li>
                
              </ul>

              {/* Login */}
              {/* <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <div className='input-group'>
                    <img alt=""className='rounded-circle' src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGF2YXRhcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=40&q=30" />
                    <a className="nav-Link  active" aria-current="page" >Rama Krishna Jetti</a>
                  </div>
                </li>
                <li className="nav-item">
                  <Button type="submit" cssClass="btn btn-warning" label="Login"/>
                </li>
              </ul> */}
              
            </div>
          </div>
        </nav>
  )
}

export default Header