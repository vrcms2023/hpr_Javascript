import React, { useEffect, useState } from 'react'
import { useCookies } from "react-cookie";
import Title from '../../../Common/Title';
import Button from '../../../Common/Button';
import { getBaseURL } from '../../../util/ulrUtil';
import { useNavigate } from 'react-router-dom';


const UserAdmin = () => {
  const [cookies] = useCookies(["token", "userName"]);
  const [userDetails, setUserDetails] = useState([])
  const [isSuperAdmin, setisSuperAdmin] = useState(JSON.parse(cookies.isSuperAdmin))


  const navigate = useNavigate();
  const backendURL = getBaseURL();

  /**
   * get User details
   */
  const getAllUserDetails = () => {
    fetch(`${backendURL}/api/user/getAllUsers`, {
      headers: { "authorization": `Bearer ${cookies.userToken}` }
    })
      .then(res => res.json())
      .then(data => {
        setUserDetails(data.users);
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getAllUserDetails();
  }, [cookies]);


  /**
   * user activation
   * @param {*} user 
   */
  const activeDeactiveUser = (user) => {
    const dbuser = {
      id: user._id,
      isActive: !user.isActive
    };

    fetch(`${backendURL}/api/user/activeAdminUser`, {
      method: "POST",
      headers: {
        "authorization": `Bearer ${cookies.userToken}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(dbuser)
    })
      .then(res => res.json())
      .then(data => {
        getAllUserDetails();
      }).catch(err => console.log(err))

  }


  return (
    <div className='bg-light pt-5' style={{ marginTop: "90px" }}>
      <div className='row bg-light px-5'>
        <div className='text-end d-flex justify-content-between'>
          <Title title={'Application Pages'} cssClass="text-center fs-3" />
          <Button type="submit" cssClass="btn btn-secondary" label="Back to Menu" handlerChange={() => navigate("/main")} />
        </div>
      </div>

      <div className="row bg-light px-5 py-4">
        {isSuperAdmin ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>UserName</th>
              <th>Email</th>
              <th colSpan={2}>isActive</th>
            </tr>
          </thead>
          <tbody>
            {userDetails?.map(user => (
              <tr key={user._id}>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.isActive.toString()} </td>
                <td>{user._id !== cookies.userId ? (<input type='checkbox' checked={user.isActive} readOnly onClick={() => { activeDeactiveUser(user) }} />):('')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        ): (
          <h3>Not authorized to view this page </h3>
        )}
      </div>
    </div>
  );
};

export default UserAdmin