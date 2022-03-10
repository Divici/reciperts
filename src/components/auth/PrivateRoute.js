import React from "react";
import { Route, Navigate } from "react-router-dom";

function PrivateRoute(props) {
  const {component:Component, ...rest} = props;

  return <Route {...rest} render={()=>{
    if(localStorage.getItem('token')) {
      return <Component {...rest}/>
    }
    else {
      return <Navigate to='/' replace/>
    }
  }} />
}

export default PrivateRoute;