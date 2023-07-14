import { getUser } from '../../../utility/authentication'
import { baseURL } from '../../../utility/baseURL'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const {userType} = getUser()
export const realestateAPI = createApi({
    reducerPath: 'realestateAPI',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    endpoints: (builder) => ({
      getRealestate: builder.query({
        query: () => ({
            url:`realestate-count/`,
            headers:{
            //   'Authorization': `Bearer ${access_token}`,
              "Content-type":"application/json"
            }  
        }),
      }),
    })
})


export const { useGetRealestateQuery } = realestateAPI