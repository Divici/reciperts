import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from './Home';
import Login from './auth/Login';
import Signup from './auth/SignUp';
import '../styles/Home.css';

function App() {
  return (
    <div className="App">
    
        <Routes>

          <Route path='/login' element={<Login/>} />

          <Route path='/signup' element={<Signup/>} />
           
          <Route path='/' element={<Home />} />

        </Routes>

    </div>
  );
}

export default App;
