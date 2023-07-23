
import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cookies,removeCookie] = useCookies(["token","userName"]);

    const checkUserToken = () => {
        const userToken = cookies.token;
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
            return navigate('/login');
        }
        setIsLoggedIn(true);
    }
    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : null
            }
        </React.Fragment>
    );
}
export default ProtectedRoute;