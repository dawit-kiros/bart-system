import React, { useState, useEffect } from "react";
import Menubar from "./Menubar.js";
import MenuToggle from "./util/MenuToggle.js";
import Navbar from "./Navbar.js";
import Card from "./util/Dashboard-card.js";
import { stations, routes, users } from "../Assets/index.js";
import UserService from "../services/user.service";
import StationService from "../services/station.service";
import RouteService from "../services/route.service";


const Dashboard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [userCount, setUserCount] = useState(null);
  const [stationCount, setStationCount] = useState(null);
  const [routeCount, setRouteCount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.getUsersCount(); // Adjust the URL as needed
        setUserCount(response);
        console.log(response)
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures the effect runs once on mount

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await StationService.getStationsCount(); // Adjust the URL as needed
        setStationCount(response);
        
      } catch (error) {
        console.error('Error fetching station count:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures the effect runs once on mount

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RouteService.getRoutesCount(); // Adjust the URL as needed
        setRouteCount(response);
        
      } catch (error) {
        console.error('Error fetching route count:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures the effect runs once on mount

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const getUserCount = (id) => {
    
    try {
      const response = UserService.getUsersCount();
      //setUserCount(response.data.totalCount);
      console.log(response)
    } catch (error) {
      console.error("Error getting cout:", error);
    }
  };

  getUserCount();
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
        <div
          className={`w-1/4 h-full bg-gray-200 ${
            showMenu ? "" : "hidden"
          } lg:block`}>
          <Menubar />
        </div>
        <div className="flex-1 sm:relative">
          <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
          <div className="h-16 bg-white shadow-md">
            <Navbar pagename={"Dashboard"} />
          </div>
          <div className="flex flex-wrap justify-between mt-10 mx-4 sm:justify-start">
            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-2 mb-4">
              <Card
                title={userCount}
                subtitle={"Total users count"}
                icon={users}
                color={"bg-gradient-to-r from-cyan-500 to-blue-500"}
              />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-2 mb-4">
              <Card
                title={stationCount}
                subtitle={"Total Stations count"}
                icon={stations}
                color={"bg-gradient-to-r from-purple-500 to-pink-500"}
              />
            </div>
            <div className="w-full lg:w-1/4 px-2 mb-4">
              <Card
                title={routeCount}
                subtitle={"Total Routes count"}
                icon={routes}
                color={"bg-gradient-to-r from-amber-400 to-amber-600"}
              />
            </div>
            <div className="w-full lg:w-1/4 px-2 mb-4">
              <Card
                title={userCount}
                subtitle={"New Users"}
                icon={users}
                color={"bg-gradient-to-r from-lime-400 to-lime-600"}
              />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
