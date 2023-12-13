import React, { useState, useEffect } from "react";
import Menubar from "./Menubar.js";
import MenuToggle from "./util/MenuToggle.js";
import Navbar from "./Navbar.js";
import axios from "axios";

const RealtimeInformation = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const [scheduleData, setScheduleData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.bart.gov/api/sched.aspx?cmd=stnsched&orig=12th&key=MW9S-E7SL-26DU-VV8V&l=1&json=y"
        );
        setScheduleData(response.data);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
        setScheduleData({ error: true });
      }
    };

    fetchData();
  }, []);

  if (!scheduleData || !scheduleData.root || !scheduleData.root.station) {
    return <p>Fetching data...</p>;
  }

  const { station, message } = scheduleData.root;

  return (
    <div className="flex flex-col h-screen">
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
            <Navbar pagename={"Realtime Information"} />
          </div>
          <div className="flex flex-wrap justify-between mt-10 mx-4 sm:justify-start">
            <div>
              <h2>{station.name} Schedule</h2>
              <ul>
                {station.item.map((item, index) => (
                  <li key={index}>
                    <strong>{item["@line"]}</strong> to{" "}
                    {item["@trainHeadStation"]} at {item["@origTime"]} | Bikes
                    Allowed: {item["@bikeflag"] === "1" ? "Yes" : "No"} | Load:{" "}
                    {item["@load"]}
                  </li>
                ))}
              </ul>
              <p>{message.legend}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealtimeInformation;
