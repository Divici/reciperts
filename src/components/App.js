import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PrivateRoute from './auth/PrivateRoute';
import Home from './Home';
import Login from './auth/Login';
import Logout from './auth/Logout';
import Signup from './auth/SignUp';
import Dashboard from './user/Dashboard';
import '../styles/Home.css';

function App() {
  return (
    <div className="App">
    
        <Routes>

          <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>} />   

          <Route path='/logout' element={<PrivateRoute><Logout/></PrivateRoute>} />

          <Route path='/login' element={<Login/>} />

          <Route path='/signup' element={<Signup/>} />
           
          <Route path='/' element={<Home />} />

        </Routes>

    </div>
  );
}

export default App;
