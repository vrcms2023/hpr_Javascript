import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

import Logo from '../../../src/Images/hpr-infra-logo.png'

import './Styles.css'

const Header = () => {
  const navigate = useNavigate()
  const [cookies,removeCookie] = useCookies(["token","userName"]);
  const [userName, setUserName] = useState('')
  const [loginState, setLoginState] = useState(false);

  useEffect(()=>{
    let token = cookies.token;
    setUserName(cookies.userName);

    if(token && userName) {
      setLoginState(true)
    }
  }, [userName]);

  function logOutHandler(){
    removeCookie("token");
    removeCookie("userName");
    setLoginState(false)
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container">
        <Link  to="/" className="navbar-brand logo" >
          <img src={Logo} alt=""/>
        </Link >
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
            </li>
            <li className="nav-item">
              <Link  to="/gallery" className="nav-Link ">Gallery</Link >
            </li>
            <li className="nav-item">
              <Link  to="/gallery" className="nav-Link ">News & Updates</Link >
            </li>
            <li className="nav-item">
              <Link  to="/contact" className="nav-Link ">Contact Us</Link >
            </li>
            <li className="nav-item">
                  {loginState ? (
                    <Button type="submit" cssClass="btn btn-warning" label="Logout" handlerChange={logOutHandler} />
                  ) : (
                    <Button type="submit" cssClass="btn btn-warning" label="Login" handlerChange={() => navigate("/login")} />
                  )}
              </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default Header