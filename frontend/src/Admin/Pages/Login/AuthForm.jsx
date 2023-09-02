import React from "react";
import Login from "./Login";
import Registration from "./Registration";

import "./Login.css";

const AuthForm = () => {
  return (
    <div className="container-fluid">
      <div className="row authForm d-flex justify-contnet-center align-items-center">
        <div className="col-12 col-md-6">
          <Login />
        </div>
        <div className="col-12 col-md-6 register">
          <Registration />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
