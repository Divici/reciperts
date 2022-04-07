import React from 'react';
import { Route, Routes } from "react-router-dom";
import PrivateRoute from './auth/PrivateRoute';
import Home from './Home';
import Login from './auth/Login';
import Logout from './auth/Logout';
import RecipeForm from './recipes/RecipeForm';
import Signup from './auth/SignUp';
import Dashboard from './user/Dashboard';
//import Profile from './user/Profile';
import Recipe from './recipes/Recipe';
import '../styles/Home.css';

function App() {
  
  return (
    <div className="">
    
        <Routes>

          <Route element={<PrivateRoute />}>
            <Route path={`/dashboard/edit/:recipe_id`} element={<RecipeForm/>} />
            <Route path={`/dashboard/view/:recipe_id`} element={<Recipe/>} />
            <Route path={`/dashboard`} element={<Dashboard/>} />   
            {/* <Route path={`/profile`} element={<Profile/>} /> */}
            <Route path='/logout' element={<Logout/>} />
          </Route>
          
          <Route path='/login' element={<Login/>} />

          <Route path='/signup' element={<Signup/>} />
           
          <Route path='/*' element={<Home />} />

        </Routes>

    </div>
  );
}

export default App;
