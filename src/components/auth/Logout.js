import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        navigate('/');
    }, [])


    return (<div></div>);
}

export default Logout;