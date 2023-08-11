import React from "react";
import { NavLink } from "react-router-dom";
import Title from "../../../Common/Title";

const UnauthorizedPage = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ marginTop: "200px" }}
    >
      <Title title="Unauthorized" cssClass="text-dark fs-5 mb-4" />
      <div className="unauthorized">
        <span>
          <NavLink to="/login">Login</NavLink> to gain access
        </span>
      </div>
    </div>
  );
};
export default UnauthorizedPage;
