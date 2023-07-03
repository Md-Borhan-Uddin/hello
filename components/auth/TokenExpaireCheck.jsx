// components/RequireAuth.js

import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { checkIfTokenExpired } from '../../utility/authentication';
import axios from 'axios';
import { baseUrl } from '../../utility/baseURL';


const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post(baseUrl.defaults.baseURL+"/refresh-token/",{"refresh":refreshToken});
    
    const { access } = response.data;
    localStorage.setItem('access_token', access);
    return access;
  } catch (error) {
    return error
    
  }
};


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
        router.push('/account/login');
      }
      else if (isTokenExpired && refreshToken) {
        refreshAccessToken(refreshToken)
          .then((newAccessToken) => {
            console.log('refresh token new', newAccessToken)
            localStorage.setItem('access_token', newAccessToken);
            setIsShow(true)
          })
          .catch((error) => {
            console.error('Token refresh error:', error);
            router.push('/account/login');
          });
      } else if (isTokenExpired && !refreshToken) {
        router.push('/account/login');
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
