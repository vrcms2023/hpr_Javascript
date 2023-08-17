import React, { useEffect, useState } from "react";
import Button from "../../../Common/Button";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../../../src/Images/hpr-infra-logo.png";
import testimonialUser from "../../../../src/Images/testimonial.jpg";
import { getCookie, removeAllCookies } from "../../../util/cookieUtil";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [loginState, setLoginState] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item mx-3">
                  {loginState ? (
                    <Button
                      type="submit"
                      cssClass="btn btn-secondary"
                      label="Logout"
                      handlerChange={logOutHandler}
                    />
                  ) : (
                    <Button
                      type="submit"
                      cssClass="btn btn-secondary"
                      label="Login"
                      handlerChange={() => navigate("/login")}
                    />
                  )}
                </li>
                <li className="text-dark text-capitalize text-center">
                  {userName ? (
                    <img
                      src={testimonialUser}
                      className="rounded-circle testimonialImg shadow-lg"
                      alt="User"
                      width="30px"
                    />
                  ) : (
                    ""
                  )}
                  <h6>{userName ? `${userName}` : ""}</h6>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
