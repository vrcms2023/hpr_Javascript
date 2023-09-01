import React, { useEffect, useState } from "react";

import Title from "../../../Common/Title";
import Button from "../../../Common/Button";
import { useNavigate } from "react-router-dom";
import { axiosServiceApi } from "../../../util/axiosUtil";
import { toast } from "react-toastify";
import { getCookie } from "../../../util/cookieUtil";

const UserAdmin = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [isSuperAdmin, setisSuperAdmin] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserName(getCookie("userName"));
    setisSuperAdmin(JSON.parse(getCookie("isSuperAdmin")));
    setUserId(getCookie("userId"));
  }, []);

  const navigate = useNavigate();

  /**
   * get User details
   */
  const getAllUserDetails = async () => {
    const response = await axiosServiceApi.get(`/api/user/getAllUsers`);
    if (response?.status == 200 && response.data?.users?.length > 0) {
      setUserDetails(response.data.users);
    } else {
      setUserDetails([]);
    }
  };
  useEffect(() => {
    getAllUserDetails();
  }, []);

  /**
   * user activation
   * @param {*} user
   */
  const activeDeactiveUser = async (user) => {
    const response = await axiosServiceApi.post(`/api/user/activeAdminUser`, {
      id: user._id,
      isActive: !user.isActive,
    });

    if (response.status !== 200) {
      setErrorMessage(data.message);
      toast.error("Unable to active user");
    }
    if (response.status == 200) {
      toast.success(`${user.userName} is status updated`);
      getAllUserDetails();
    }
  };

  return (
    <div className="container-fluid pt-5" style={{ marginTop: "120px" }}>
      <div className="row px-5">
        <div className="text-end d-flex justify-content-between">
          <Title
            title={"Application Pages"}
            cssClass="text-center blue-500 fs-4"
          />
          <Button
            type="submit"
            cssClass="btn btn-secondary"
            label="Back to Menu"
            handlerChange={() => navigate("/main")}
          />
        </div>
      </div>

      <div className="row px-5 py-4">
        {isSuperAdmin ? (
          <table className="table table-striped table-responsive table-hover">
            <thead>
              <tr>
                <th>UserName</th>
                <th>Email</th>
                <th>Admin type</th>
                <th colSpan={2}>isActive</th>
              </tr>
            </thead>
            <tbody>
              {userDetails?.map((user) => (
                <tr key={user._id}>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.isSuperAdmin ? 'Super Admin': 'Admin'}</td>
                  <td>{user.isActive.toString()} </td>
                  <td>
                    {user._id !== userId ? (
                      <input
                        type="checkbox"
                        checked={user.isActive}
                        readOnly
                        onClick={() => {
                          activeDeactiveUser(user);
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h3>Not authorized to view this page </h3>
        )}
      </div>
    </div>
  );
};

export default UserAdmin;
