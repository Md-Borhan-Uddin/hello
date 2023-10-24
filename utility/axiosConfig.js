
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const BASEURL = "http://127.0.0.1:8000/api";
// const BASEURL = "http://www.api.daimn.com/api"


const baseAxios = axios.create({
  baseURL: BASEURL, // Your API base URL
});

// Add a request interceptor
baseAxios.interceptors.request.use(
  (config) => {
    // Get the access token from your storage (localStorage, sessionStorage, etc.)
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      // Attach the access token to the Authorization header
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle refresh token logic
baseAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If response status code is 401 (unauthorized) and you have a refresh token logic
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Handle refreshing the access token and retry the original request

      // Example code to refresh the token
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        // Call your refresh token API and get a new access token
        const newAccessToken = await axios.post(BASEURL+"/refresh-token/",{"refresh":refreshToken});
        
        // Update the access token in storage
        try{

          localStorage.setItem('access_token', newAccessToken.data.access);
        }
        catch(e){
          const router = useNavigate()
          router('/login')
        }

        // Retry the original request with the new access token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken.data.access}`;
        return baseAxios(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default baseAxios;


