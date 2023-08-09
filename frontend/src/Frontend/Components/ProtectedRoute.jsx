
import React from "react";
import { useSelector } from 'react-redux'
import { NavLink} from 'react-router-dom'

const ProtectedRoute = (props) => {
  
    const { userInfo } = useSelector((state) => state.auth)

    return (
        <React.Fragment>
            {
                userInfo ? props.children : ( 
                <div className='unauthorized'>
                <h1>Unauthorized :(</h1>
                <span>
                  <NavLink to='/login'>Login</NavLink> to gain access
                </span>
              </div>)
            }
        </React.Fragment>
    );
}
export default ProtectedRoute;