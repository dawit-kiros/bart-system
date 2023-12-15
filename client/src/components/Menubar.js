import React, { useState } from "react";
import {  
  dashboard, 
  showcase,
  settings,
 
  logout,
  stations, 
  routes, 
  users
} from "../Assets/index";

const Menubar = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const menuItems = [
    {
      name: "Dashboard",
      icon: dashboard,
      link: "/dashboard",
    },
    {
      name: "Admin Panel",
      icon: settings,
      link: "/profile",
      subItems: [
        {
          name: "Manage Stations",
          icon: stations,
          link: "/stations",
        },
        {
          name: "Manage Train Routes",
          icon: routes,
          link: "/profile",
        },
        {
          name: "Manage Users",
          icon: users,
          link: "/role-management",
        },
      ],
    },   
    {
      name: "Realtime Information",
      icon: showcase,
      link: "/realtime-info",
    },   
    { 
      name: "Settings",
       icon: settings,
        link: "/user" 
    },
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex flex-col items-start pt-20">
          <span className="px-5 py-2 text-black">Menu</span>
          {menuItems.map((item, index) => (
            <>
              <a
                key={index}
                href={item.name !== "Admin Panel" ? item.link : "#"}
                className={`px-4 py-3 flex items-center ${
                  selectedItem === item ? "text-lime-500" : "hover:text-gray"
                }`}
                onClick={() => handleItemClick(item)}
              >
                <img src={item.icon} alt={item.name} className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline-block">{item.name}</span>
              </a>

              {item.subItems &&
                item.subItems.map((subItem, index ) => (
                  <a
                    key={index + 5}
                    href={subItem.link}
                    className={`px-5 py-3 flex items-center ${
                      selectedItem === subItem.name
                        ? "text-lime-500"
                        : "hover:text-gray"
                    }`}
                    onClick={() => handleItemClick(subItem.name)}
                  >
                    <img
                      src={subItem.icon}
                      alt={subItem.name}
                      className="h-5 w-5 mr-2"
                    />
                    <span className="px-1 py-0 ">{subItem.name} </span>
                  </a>
                ))}
            </>
          ))}
        </div>
        <div
          className="flex items-center justify-center h-20 cursor-pointer text-red-500"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <img src={logout} alt="Logout" className="h-6 w-6 mr-2" />
          <span className="hidden sm:inline-block text-red-500 text-2xl ">
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Menubar;
