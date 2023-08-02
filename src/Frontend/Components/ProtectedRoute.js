
import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cookies] = useCookies(["token","userName"]);


    useEffect(() => {
        const checkUserToken = () => {
            const userToken = cookies.token;
            if (!userToken || userToken === undefined) {
                setIsLoggedIn(false);
                return navigate('/login');
            }
            setIsLoggedIn(true);
        }

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