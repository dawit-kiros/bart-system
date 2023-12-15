import React, { useEffect, useState } from "react";
import axios from "axios";
import { see, remove, change, search } from "../../Assets/index.js";
import RouteForm from "./RouteForm.js";
import RouteService from "../../services/route.service";


const RoutesTable = () => {
  const [routes, setRoutes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchRoutes = async () => {
      const response = await axios.get("https://localhost:8080/api/routes");

      setRoutes(response.data.data);
    };
    fetchRoutes();
  }, []);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRoutes = routes.filter((route) =>
    route.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDelete = (id) => {
    
    try {
      const response = RouteService.deleteRoute(id);
      setRoutes(routes.filter((route) => route._id !== id));
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting route:", error);
    }
  };

  const [routeData, setRouteData] = useState({
    id: "",
    name	:	"",
    abbr	:	"",
    routeID	:	"",
    number	:	"",
    color	:	"",
    direction	:	"",    
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
              setTitle("Add New Route");
              setRouteData({
                ...routeData,
                id: '',
                name	:	'',
                abbr	:	'',
                routeID	:'',
                number	:	'',
                color	:	'',
                direction	:	'',                
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
                      <RouteForm routeData={routeData} />
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
            <th className="px-2 py-2">S.No</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Abbr</th>
            <th className="px-4 py-2">routeID</th>
            <th className="px-4 py-2">number</th>
            <th className="px-4 py-2">color</th>
            <th className="px-4 py-2">direction</th>            
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRoutes.map((route, index) => (
            <tr key={route._id}>
              <td className="shadow-sm px-2 py-0 ">{index + 1}</td>
              <td className="shadow-sm px-4 py-0">{route.name}</td>
              <td className="shadow-sm px-4 py-0">{route.abbr}</td>
              <td className="shadow-sm px-4 py-0">{route.routeID}</td>
              <td className="shadow-sm px-4 py-0">{route.number}</td>             
              <td className="shadow-sm px-4 py-0">{route.color}</td>
              <td className="shadow-sm px-4 py-0">{route.direction}</td>
                          

              <td className="shadow-sm px-4 py-0">
                <div className="flex flex-row justify-between gap-4 cursor-pointer w-4 h-4 ">
                  <img
                    src={change}
                    alt="change"
                    onClick={() => {
                      setRouteData({
                        ...routeData,
                        id: route._id,
                        name	:	route.name,
                        abbr	:	route.abbr,
                        routeID	:	route.routeID,
                        number	:route.number,
                        color	:	route.color,
                        direction	:	route.direction,                       
                        buttonText : "Save"
                      });
                      setShowModal(true);
                      setTitle("Edit Route");
                    }}
                  />
                  {/* <img src={see} alt="see" /> */}
                  <img
                    src={remove}
                    alt="remove"
                    onClick={() => handleDelete(route._id)}
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

export default RoutesTable;
