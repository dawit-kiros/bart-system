import React, { useEffect, useState } from "react";
import axios from "axios";
import { see, remove, change, search } from "../../Assets/index.js";
import StationForm from "./StationForm.js";
import StationService from "../../services/station.service";


const StationsTable = () => {
  const [stations, setStations] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchStations = async () => {
      const response = await axios.get("https://localhost:8080/api/stations");

      setStations(response.data.data);
    };
    fetchStations();
  }, []);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredStations = stations.filter((station) =>
    station.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDelete = (id) => {
    
    try {
      const response = StationService.deleteStation(id);
      setStations(stations.filter((station) => station._id !== id));
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting station:", error);
    }
  };

  const [stationData, setStationData] = useState({
    id: "",
    name	:	"",
    abbr	:	"",
    latitude	:	"",
    longitude	:	"",
    address	:	"",
    city	:	"",
    county	:	"",
    state	:	"",
    zipcode	:	"",
    buttonText : ""
  });

  return (
    <>
      <div className="flex justify-between items-center mx-4 my-8">
        <div className="w-1/3 relative">
          <input
            type="text"
            placeholder="Search"
            className="border-2 border-gray-400 rounded-md py-2 pl-12 pr-10 w-full"
            onChange={handleSearch}
          />
          <img
            src={search}
            alt="search"
            className="absolute top-2 left-2 pointer-events-none"
          />
        </div>
        <div>
          <button
            onClick={() => {
              setShowModal(true);
              setTitle("Add New Station");
              setStationData({
                ...stationData,
                id: '',
                name	:	'',
                abbr	:	'',
                latitude	:'',
                longitude	:	'',
                address	:	'',
                city	:	'',
                county	:'',
                state	:	'',
                zipcode	:	'',
                buttonText : "Add"
              });
            }}
            className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-8 rounded-md"
          >
            Add New
          </button>
          {showModal ? (
            <>
              <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t ">
                      <h3 className=" text-sm  ">{title}</h3>
                      <button
                        className="bg-transparent border-0 text-black float-right"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="text-black opacity-7 h-7 w-7 text-xl block bg-gray-300 py-0 rounded-full">
                          x
                        </span>
                      </button>
                    </div>
                    <div className="relative p-6 flex-auto">
                      <StationForm stationData={stationData} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>

      <table className="table-auto w-full">
        <thead>
          <tr className=" bg-gradient-to-r from-purple-600 to-blue-500  transition duration-300 text-white text-left ">
            <th className="px-0 py-2">S.No</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Abbr</th>
            <th className="px-4 py-2">Latitude</th>
            <th className="px-4 py-2">Longitude</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">City</th>
            <th className="px-4 py-2">County</th>
            <th className="px-4 py-2">State</th>
            <th className="px-4 py-2">Zipcode</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStations.map((station, index) => (
            <tr key={station._id}>
              <td className="shadow-sm px-0 py-0 ">{index + 1}</td>
              <td className="shadow-sm px-4 py-0">{station.name}</td>
              <td className="shadow-sm px-4 py-0">{station.abbr}</td>
              <td className="shadow-sm px-4 py-0">{station.latitude}</td>
              <td className="shadow-sm px-4 py-0">{station.longitude}</td>
             
              <td className="shadow-sm px-4 py-0">{station.address}</td>
              <td className="shadow-sm px-4 py-0">{station.city}</td>
              <td className="shadow-sm px-4 py-0">{station.county}</td>
              <td className="shadow-sm px-4 py-0">{station.state}</td>
              <td className="shadow-sm px-4 py-0">{station.zipcode}</td>
             

              <td className="shadow-sm px-4 py-0">
                <div className="flex flex-row justify-between gap-4 cursor-pointer w-4 h-4 ">
                  <img
                    src={change}
                    alt="change"
                    onClick={() => {
                      setStationData({
                        ...stationData,
                        id: station._id,
                        name	:	station.name,
                        abbr	:	station.abbr,
                        latitude	:station.latitude,
                        longitude	:	station.longitude,
                        address	:	station.address,
                        city	:	station.city,
                        county	:station.county,
                        state	:	station.state,
                        zipcode	:	station.zipcode,
                        buttonText : "Save"
                      });
                      setShowModal(true);
                      setTitle("Edit Station");
                    }}
                  />
                  {/* <img src={see} alt="see" /> */}
                  <img
                    src={remove}
                    alt="remove"
                    onClick={() => handleDelete(station._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default StationsTable;
