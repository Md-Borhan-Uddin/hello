import axios from 'axios'
import { baseURL } from './baseURL'



export const getAccessToken = (refreshToken,router=null)=>{
    axios.post(baseURL+"/refresh-token/",{"refresh":refreshToken})
    .then(res=>{
      console.log('get access token',res);
      localStorage.setItem('access_token', res.data.access)
      
    })
    .catch(err=>{
      console.log('get access token error',err);
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      router('/login')
    })
  }
