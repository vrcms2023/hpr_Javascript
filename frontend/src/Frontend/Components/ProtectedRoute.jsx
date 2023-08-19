import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UnauthorizedPage from "../../Admin/Pages/Login/UnauthorizedPage";
import { getCookie } from "../../util/cookieUtil";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserToken = () => {
   
      const userToken = getCookie("userToken");
      if (!userToken || userToken === undefined) {
        setIsLoggedIn(false);
        return navigate("/login");
      }
      setIsLoggedIn(true);
    };

    checkUserToken();
  }, [isLoggedIn]);

  return (
    <React.Fragment>
      {isLoggedIn ? props.children : <UnauthorizedPage />}
    </React.Fragment>
  );
};
export default ProtectedRoute;
