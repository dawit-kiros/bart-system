import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://localhost:8080/api/test/";

const API_USER_URL = "https://localhost:8080/api/users";

const getPublicContent = () => {
  return axios.get("https://localhost:8080/api/test/all")
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const deleteUser = async (id) => {
 
  try {
    const response = await axios.delete(
      `${API_USER_URL}/${id}`
    );

    console.log(response.data); // Log the server response
  } catch (error) {
    console.error("Error deleting user:", error);
   
  }
};

const getUsersCount = async () => {
 
  try {
    const response = await axios.get(
      `${API_USER_URL}/users/count`
    );
     
    return response.data.totalCount; // Log the server response
  } catch (error) {
    console.error("Error getting user count:", error);
    
  }
};
const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  deleteUser,
  getUsersCount
};

export default UserService;
