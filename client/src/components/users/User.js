import React, { useState } from "react";
import Menubar from "../Menubar";
import MenuToggle from "../util/MenuToggle";
import Navbar from "../Navbar";
import UsersTable from "./Table";

const RoleManagement = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex">
      <div
        className={`w-1/4 h-auto h-screen bg-gray-100 ${
          showMenu ? "" : "hidden"
        } lg:block`}
      >
        <Menubar />
      </div>
      <div className="w-3/4 h-screen">
        <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
        <Navbar pagename={"Users Management"} />
        <div>
          <UsersTable />
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;
