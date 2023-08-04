import React, { useEffect, useState, useCallback } from 'react'
import Button from '../Button';
import { useNavigate, NavLink, Link } from 'react-router-dom';
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
              <NavLink to="/" className={
             useCallback(({isActive}) => isActive ? "nav-Link active" : "nav-Link")}>Home</NavLink >
            </li>
            <li className="nav-item">
              <NavLink  to="/about" className={({ isActive }) => (isActive ? "nav-Link active" : "nav-Link")}>About Us</NavLink >
            </li>
            <li className="nav-item dropdown">
            <NavLink  to="/projects" className={({ isActive }) => (isActive ? "nav-Link active" : "nav-Link")}>Projects</NavLink >
            </li>
            <li className="nav-item">
              <NavLink  to="/gallery" className={({ isActive }) => (isActive ? "nav-Link active" : "nav-Link")}>Gallery</NavLink >
            </li>
            <li className="nav-item">
              <NavLink  to="/" className={({ isActive }) => (isActive ? "nav-Link active" : "nav-Link")}>News & Updates</NavLink >
            </li>
            <li className="nav-item">
              <NavLink  to="/contact" className={({ isActive }) => (isActive ? "nav-Link active" : "nav-Link")}>Contact Us</NavLink >
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