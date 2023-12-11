import React, { useState } from "react";
import AuthService from "../services/auth.service.js";

import Menubar from "./Menubar.js";
import MenuToggle from "../components/util/MenuToggle";
import Navbar from "./Navbar.js";
import { role } from "../Assets/index.js";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex flex-col h-screen w-full">
      {/* ************************************************************************************************** */}
      <div className="flex flex-grow">
        <div
          className={`w-1/4 h-full bg-gray-200 ${
            showMenu ? "" : "hidden"
          } lg:block`}
        >
          <Menubar />
        </div>
        <div className="flex-1 sm:relative">
          <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
          <div className="h-16 bg-white shadow-md">
            <Navbar pagename={"Dashboard"} />
          </div>
          <div className="flex-col pl-4">
            <header className="pt-10">
              <h3>
                <strong>{currentUser.username}</strong> Profile
              </h3>
            </header>
            <p>
              <strong> Token: </strong>{" "}
              {currentUser.accessToken.substring(0, 20)} ...{" "}
              {currentUser.accessToken.substr(
                currentUser.accessToken.length - 20
              )}
            </p>
            <p>
              <strong>Id:</strong> {currentUser.Id}
            </p>
            <p>
              <strong>Email:</strong> {currentUser.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
              {currentUser.roles &&
                currentUser.roles.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
