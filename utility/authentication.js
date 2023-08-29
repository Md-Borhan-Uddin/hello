
import axios from 'axios';
import { parseJwt } from './utlity';







export const checkIfTokenExpired = () => {
    
    const {access_token} = getUser()
    if(!access_token){
      return false
    }
    const decoded = parseJwt(access_token)
    const access_token_expaire = new Date(decoded.exp*1000,)
    const isExpaire = access_token_expaire < new Date()

    return isExpaire;
     
  };







export const getUser = ()=>{
    let userType, access_token, refresh_token
    if (typeof window !== 'undefined') {
        userType = localStorage.getItem('userType')
        access_token = localStorage.getItem('access_token')
        refresh_token = localStorage.getItem('refresh_token')
    }
    return {userType, access_token, refresh_token}
}

export const setUser = (value)=>{
    const {user, token} = value;
    const {access, refresh} = token
    if (typeof window !== 'undefined') {
        localStorage.setItem('userType',user.user_type.toString())
        localStorage.setItem('access_token',access.toString())
        localStorage.setItem('refresh_token',refresh.toString())
    }
}

export const deletetUser = ()=>{
    localStorage.removeItem('userType')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
}

export const updateToken = (data)=>{
    const {access} = data
    localStorage.setItem('access_token',access)
}

export const token = getUser()





