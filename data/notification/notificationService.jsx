
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getUser } from '../../utility/authentication';
import { baseURL } from '../../utility/baseURL';


const {access_token} = getUser()
const headers = {
  Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
};


// Define a service using a base URL and expected endpoint
export const notificationAPI = createApi({
  reducerPath: 'notification',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: () => {
        return {
            url:'/notification/',
            headers:headers
        }
      },
    }),
   

  }),
})

export const { useGetNotificationQuery } = notificationAPI