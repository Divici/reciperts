import React from 'react';
//import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from './auth/PrivateRoute';
import Home from './Home';
import Login from './auth/Login';
import Logout from './auth/Logout';
import AddRecipeForm from './recipes/AddRecipeForm';
import Signup from './auth/SignUp';
import Dashboard from './user/Dashboard';
import Recipe from './recipes/Recipe';
import EditRecipe from './recipes/EditRecipe';
import '../styles/Home.css';

function App() {
  return (
    <div className="App">
    
        <Routes>

          <Route element={<PrivateRoute />}>
            <Route path='/add-recipe' element={<AddRecipeForm/>} />
            <Route path='/dashboard/edit/:recipe_id' element={<EditRecipe/>} />
            <Route path='/dashboard/view/:recipe_id' element={<Recipe/>} />
            <Route path='/dashboard' element={<Dashboard/>} />   
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
