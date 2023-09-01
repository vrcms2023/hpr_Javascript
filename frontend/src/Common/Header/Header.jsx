import React, { useCallback, useEffect, useState } from "react";
import Button from "../Button"
import { useNavigate, Link, NavLink } from "react-router-dom";
import Logo from  "../../Images/hpr-infra-logo.png";
import { getCookie, removeAllCookies } from "../../util/cookieUtil";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import "./Styles.css";

const Header = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [loginState, setLoginState] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const pathList = ['/login', '/register']
  const isHideMenu = pathList.indexOf(window.location.pathname) >= 0 ? true : false

  useEffect(() => {
    if (userInfo || getCookie("userToken")) {
      setLoginState(true);
      const uName = userInfo ? userInfo.userName : getCookie("userName");
      setUserName(uName);
    } else {
      setLoginState(false);
      setUserName("");
    }
  }, [userInfo]);

  function logOutHandler() {
    removeAllCookies();
    setLoginState(false);
    dispatch(logout());
    toast.success("Logout successfully");
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          <Link to="/" className="navbar-brand logo">
            <img src={Logo} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {loginState ? (
              <AdminMenu userName={userName} logOutHandler={logOutHandler}/>
            ) : !isHideMenu ? (
              <ClientMenu/>
            ) : null }
          </div>
        </div>
      </nav>
    </>
  );
};

export const AdminMenu = ({userName,logOutHandler}) => {
  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="text-dark text-capitalize d-flex justify-content-center align-items-center">
        {userName ? (
          <>
            {/* {testimonialUser ?  <img
                      src={testimonialUser}
                      className="rounded-circle testimonialImg shadow-md me-2"
                      alt="User"
                      width="30px"
                    /> : <i className="fa fa-user" aria-hidden="true"></i>} */}
            <i
              className="fa fa-user-circle-o fs-1 text-secondary me-2 "
              aria-hidden="true"
            ></i>{" "}
            {userName}
          </>
        ) : (
          ""
        )}
        {/* <h6>{userName ? `${userName}` : ""}</h6> */}
      </li>
      <li className="nav-item mx-3">
        <Button
          type="submit"
          cssClass="btn border border-secondary fw-bold ms-3"
          label="Logout"
          handlerChange={logOutHandler}
        />
      </li>
      {/* <li className="nav-item mx-3">
                  {loginState ? (
                    <Button
                      type="submit"
                      cssClass="btn border border-secondary fw-bold ms-3"
                      label="Logout"
                      handlerChange={logOutHandler}
                    />
                  ) : (
                    <Button
                      type="submit"
                      cssClass="btn"
                      label="Login"
                      handlerChange={() => navigate("/login")}
                    />
                  )}
                </li> */}
    </ul>
  )
}
export const ClientMenu = () => {
  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
    <li className="nav-item">
      <NavLink
        to="/"
        className={useCallback(({ isActive }) =>
          isActive ? "nav-Link active" : "nav-Link",
        )}
      >
        Home
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? "nav-Link active" : "nav-Link"
        }
      >
        About Us
      </NavLink>
    </li>
    <li className="nav-item dropdown">
      <NavLink
        id="projectLink"
        to="/projects"
        className={({ isActive }) =>
          isActive ? "nav-Link active" : "nav-Link"
        }
      >
        Projects
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink
        to="/gallery"
        className={({ isActive }) =>
          isActive ? "nav-Link active" : "nav-Link"
        }
      >
        Gallery
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink
        to="/news"
        className={({ isActive }) =>
          isActive ? "nav-Link active" : "nav-Link"
        }
      >
        News & Updates
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive ? "nav-Link active" : "nav-Link"
        }
      >
        Contact Us
      </NavLink>
    </li>
  </ul>
  )}

export default Header;
