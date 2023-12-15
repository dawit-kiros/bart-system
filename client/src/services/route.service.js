import axios from "axios";



const API_ROUTE_URL = "https://localhost:8080/api/routes";


const register = ( 
  name,
  abbr,          
  routeID,
  number,
  color,
  direction) => {
  return axios.post(API_ROUTE_URL , {
    name,
    abbr,          
    routeID,
    number,
    color,
    direction
  })
}

const deleteRoute = async (id) => {
 
  try {
    const response = await axios.delete(
      `${API_ROUTE_URL}/${id}`
    );

    console.log(response.data); // Log the server response
  } catch (error) {
    console.error("Error deleting route:", error);
   
  }
};

const getRoutesCount = async () => {
 
  try {
    const response = await axios.get(
      `${API_ROUTE_URL}/routes/count`
    );
     
    return response.data.totalCount; // Log the server response
  } catch (error) {
    console.error("Error getting route count:", error);
    
  }
};
const RouteService = {  
    register,
  deleteRoute,
  getRoutesCount
};

export default RouteService;
