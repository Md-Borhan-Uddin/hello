import axios from "axios";
import { baseUrl } from "./baseURL";

export const getObjects = (endpoint, headers, setState) => {
    let c = [{ key: "Please select", value: "" }]
  axios
    .get(baseUrl.defaults.baseURL + endpoint, { headers: headers })
    .then((res) => {
      
      const {data} = res
      data.map((item)=>c.push({ key: item.name, value: item.id.toString() }))
      setState(c);
      
    })
    .catch((error) => {
      console.log(error);
      
    });
};




