import React, { useEffect, useState} from 'react'
import { useCookies } from "react-cookie";

const UserAdmin = () => {
    const [cookies] = useCookies(["token","userName"]);
    const [userDetails, setUserDetails] = useState([])


    /**
     * get User details
     */
    const getAllUserDetails =() => {
      fetch("/getAllUsers",{
          headers: {"x-access-token": cookies.token}
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
      id : user._id,
      isActive : !user.isActive
    };
   
      fetch(`/userActiveStatusUpdate`,{
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "x-access-token": cookies.token
        },
        body: JSON.stringify(dbuser)
      })
      .then(res => res.json())
      .then(data => {
        getAllUserDetails();
      }).catch(err => console.log(err))
  
  }


  return (
    <div className="bg-light pt-5" style={{ marginTop: "90px" }}>
      <div className="row bg-light px-5">
      <table class="table table-striped">
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
        <td>{user.isActive.toString()}</td>
        <td><input type='checkbox' checked={user.isActive} onClick={() => {activeDeactiveUser(user)}} /></td>
      </tr>
     ))}
    </tbody>
  </table>
      </div>
    </div>
  );
};

export default UserAdmin