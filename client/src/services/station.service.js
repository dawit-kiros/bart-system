import axios from "axios";



const API_STATION_URL = "https://localhost:8080/api/stations";

const register = ( 
  name,
  abbr,          
  latitude,
  longitude,
  address,
  city,
  county,
  state,
  zipcode) => {
  return axios.post(API_STATION_URL , {
    name,
    abbr,          
    latitude,
    longitude,
    address,
    city,
    county,
    state,
    zipcode
  })
}
const deleteStation = async (id) => {
 
  try {
    const response = await axios.delete(
      `${API_STATION_URL}/${id}`
    );

    console.log(response.data); // Log the server response
  } catch (error) {
    console.error("Error deleting station:", error);
   
  }
};

const getStationsCount = async () => {
 
  try {
    const response = await axios.get(
      `${API_STATION_URL}/stations/count`
    );
     
    return response.data.totalCount; // Log the server response
  } catch (error) {
    console.error("Error getting station count:", error);
    
  }
};
const StationService = {  
  register, 
  deleteStation,
  getStationsCount
};

export default StationService;
