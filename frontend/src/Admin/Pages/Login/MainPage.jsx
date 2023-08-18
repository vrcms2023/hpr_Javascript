import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../../Common/Title";
import { getCookie } from "../../../util/cookieUtil";

const MainPage = () => {
  const [isSuperAdmin, setisSuperAdmin] = useState("");
  useEffect(() => {
    setisSuperAdmin(JSON.parse(getCookie("isSuperAdmin")));
  }, []);
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ marginTop: "200px" }}
    >
      <Title
        title="Page Content's Customization"
        cssClass="text-dark fs-5 mb-4 fw-bold"
      />
      <ul className="list-group w-25">
        <li className="list-group-item list-group-item-action text-center py-4">
          <Link to="/dashboard" className="blue-500 text-decoration-none fs-5">
            Dashboard
          </Link>
        </li>
        <li className="list-group-item list-group-item-action text-center py-4">
          <Link to="/addproject" className="text-decoration-none blue-500 fs-5">
            Add Project
          </Link>
        </li>
        <li className="list-group-item list-group-item-action text-center py-4">
          <Link to="/adminNews" className="blue-500 text-decoration-none fs-5">
            New & Updates
          </Link>
        </li>
        <li className="list-group-item list-group-item-action text-center py-4">
          <Link
            to="/testimonial"
            className="blue-500 text-decoration-none fs-5"
          >
            Testimonials
          </Link>
        </li>

        {isSuperAdmin ? (
          <li className="list-group-item list-group-item-action text-center py-4">
            <Link
              to="/userAdmin"
              className="blue-500 text-decoration-none fs-5"
            >
              User Administration
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};
export default MainPage;
