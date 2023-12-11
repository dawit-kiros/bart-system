import axios from 'axios'

const API_URL = 'https://localhost:8080/api/auth/'



const register = (username, email, password) => {
    return axios.post(API_URL + 'signup', {
        username,
        email, 
        password
    })
}

/********   
 * 
 * Check if the following line could be refactored to async/await
 */

// const login = async (username, password) => {
//     console.log(username + " "+ password)
//     try {
//         const response = await axios.post(apiUrl,  {
//           username,
//           password
//       });
      
//         if (response.data.accessToken) {
//           localStorage.setItem('user', JSON.stringify(response.data));
//         }
      
//         return response.data;
//       } catch (error) {
//         // Handle the error if needed
//         console.error('Error during login:', error);
//         throw error; // Rethrow the error or handle it according to your needs
//       }
// }

const login = (username, password) => {
   
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
        return response.data;
      });
  };

const logout = () => {
    localStorage.removeItem('user')
}

const getCurrentUser = () => {
  
    return JSON.parse(localStorage.getItem('user'))
    
}

const AuthService = { 
    register, 
    login,
    logout, 
    getCurrentUser
}

export default AuthService