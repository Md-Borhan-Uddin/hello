import axios from "axios";
import { baseURL } from "./baseURL";

export const getObjects = (endpoint, headers, setState) => {
  
  axios
    .get(baseURL + endpoint, { headers: headers })
    .then((res) => {
      console.log(res);
      setState(res.data);
      
    })
    .catch((error) => {
      console.log(error);
      
    });
};

export const deleteItem = (endpoint, headers, id, setState, state, toast) => {
  

  axios
    .delete(`${baseURL}${endpoint}${id}/`, {
      headers: headers,
    })
    .then((res) => {
      const object = state.filter((e) => e.id != id);

      state = object;
      setState(object);
      toast({
        title: "Successfully Delete",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    })
    .catch((error) => {
      console.log(error);
      toast({
        title: "Something wrong try again",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    });
};




export const editItem = (
  endpoint,
  headers,
  id,
  data,
  setState,
  state,
  toast
) => {
  axios
    .patch(`${baseURL}${endpoint}${id}/`, data, {
      headers: headers,
    })
    .then((res) => {
      const { data } = res;
      
      const obj = state.map((item) => {
        if (item.id == data.id) {
          item.name = data.name;
          item.is_active = data.is_active;
        }
        return item
      });
      setState(obj)
      toast({
        title: "Successfully Update",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    })
    .catch((error) => {
      toast({
        title: "Something wrong try again",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.log(error);
    });
};
