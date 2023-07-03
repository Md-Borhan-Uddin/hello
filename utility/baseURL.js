import axios from "axios";
import { getUser } from "./authentication";

const {access_token} = getUser()

const headers= {
    Authorization: 'Bearer ' + String(access_token) //the token is a variable which holds the token
  }


export const baseUrl = axios.create({
    baseURL:"http://127.0.0.1:8000/api",
    // baseURL:"http://www.api.daimn.com/api"
    headers:headers
})


// export const baseURL = "http://www.api.daimn.com/api"
export const baseURL = "http://127.0.0.1:8000/api"