
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/PageHome";
import Profile from "./components/Profile";
import BoardUser from "./components/PageBoardUser";
import BoardModerator from "./components/PageBoardModerator";
import BoardAdmin from "./components/PageBoardAdmin";
import { demouser } from "./Assets/index";
import {
  Dashboard,  
  User,
  
  
} from "./components/index";
import {logo} from "./Assets/index.js";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

 
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };


  return (
    <div >
      <nav className="navbar navbar-expand navbar-dark bg-custom padding-y ">
        <Link to={"/"} className="navbar-brand">     
          
            <div className="flex"><img src={logo} alt="Company Logo" className="h-8 w-8" />
           Bart System</div>
          
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
            
              <Link to={"/profile"} className="nav-link">
                {/* {currentUser.username} */}
                <div className="flex items-center">
                  <div className="rounded-full h-8 w-8 bg-gray-300 flex items-center justify-center mr-4">
                    <img src={demouser} alt="avatar" className="rounded-full h-6 w-6" />
                  </div>
                  <div className="flex flex-col text-sm">
                    <span className="font-medium">{currentUser.username}</span>
                    <span className="font-small">
                        {currentUser.roles && 
                        currentUser.roles.map((role) => 
                        <div>{role}</div>
                        
                        )}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="flex flex-col h-screen w-full">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/user" element={<BoardUser/>} />
          <Route path="/mod" element={<BoardModerator/>} />
          <Route path="/admin" element={<BoardAdmin/>} />


          
         
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/role-management" element={<User />} />        
          
        </Routes>
      </div>
      

      
    </div>
  );
};

export default App;