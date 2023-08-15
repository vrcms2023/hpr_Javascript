import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../../features/auth/authActions";
import Title from "../../../Common/Title";
import Button from "../../../Common/Button";
import { useNavigate } from "react-router-dom";
import Error from "../../Components/Error";
import { setCookie } from "../../../util/cookieUtil";

const Login = () => {
  const { userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  // redirect authenticated user to Main screen
  useEffect(() => {
    if (userInfo) {
      setCookie("userToken", userInfo.userToken);
      setCookie("email", userInfo.email);
      setCookie("userName", userInfo.userName);
      setCookie("userId", userInfo._id);
      setCookie("isSuperAdmin", JSON.parse(userInfo.isSuperAdmin));
      navigate("/main");
    }
  }, [navigate, userInfo]);

  const submitForm = (data) => {
    dispatch(userLogin(data));
  };

  const loginHandler = () => {};

  return (
    <div
      className="mt-5 pt-5 pb-3"
      style={{ background: "#E6E6E6", borderBottom: "1px solid #ccc" }}
    >
      <div className="row py-5 ">
        <div className="col-lg-6 offset-lg-3 bg-light shadow-lg">
          <div className="row">
            <div className="col-lg-6 bg-light d-flex justify-content-center align-items-center">
              <form onSubmit={handleSubmit(submitForm)}>
                {error && <Error>{error}</Error>}
                <Title
                  title="Admin login"
                  cssClass="text-start text-dark mb-4 fs-4"
                />
                <div className="mb-3">
                  <label
                    htmlFor="userName"
                    className="form-label text-dark fw-normal"
                  >
                    User name
                  </label>
                  <input
                    type="text"
                    {...register("email")}
                    name="email"
                    className="form-control bg-light border border-secondary"
                    id="userName"
                    aria-describedby="emailHelp"
                  />
                  {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="signPassord"
                    className="form-label text-dark fw-normal"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password")}
                    name="password"
                    className="form-control bg-light border border-secondary"
                    id="signPassord"
                  />
                </div>

                <div className="d-grid gap-2">
                  <Button
                    type="submit"
                    cssClass="btn btn-lg btn-secondary"
                    handlerChange={loginHandler}
                    label="Login"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
