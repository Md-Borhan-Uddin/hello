// components/RequireAuth.js

import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { checkIfTokenExpired, getAccessToken } from '../../utility/authentication';
import axios from 'axios';
import { baseUrl } from '../../utility/baseURL';



// const refreshAccessToken = async (refreshToken) => {
//   console.log('acess token reguiest')
//   try {
//     const response = await axios.post(baseUrl.defaults.baseURL+"/refresh-token/",{"refresh":refreshToken});
//     console.log('refresh', response)
//     const { access } = response.data;
//     return access;
//   } catch (error) {
//     console.log('error',error)
//     return error
    
//   }
// };



const RequireAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const router = useNavigate();
    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');
      // Check if the access token is expired
      const isTokenExpired = checkIfTokenExpired(accessToken);
      
      if(!accessToken){
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        router('/login');
      }
      else if (isTokenExpired && refreshToken) {
        getAccessToken(refreshToken,router)
      } else if (isTokenExpired && !refreshToken) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        router('/login');
      }
      else{
        setIsShow(true)
      }
    }, []);
    
    const component = isShow ? <WrappedComponent {...props} />:null
      return component
    
  };

  return AuthenticatedComponent;
};

export default RequireAuth;
