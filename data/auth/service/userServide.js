import { getUser } from '../../../utility/authentication'
import { baseURL } from '../../../utility/baseURL'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// const {access_token} = getUser()
export const userAPI = createApi({
    reducerPath: 'getUserData',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    endpoints: (builder) => ({
      getUser: builder.query({
        query: (access_token) => 
          {
            console.log(access_token)
            return {
            url:'/user/',
            headers:{
              'Authorization': `Bearer ${access_token}`
            } 
          } 
        },
      }),
    })
})


export const { useGetUserQuery } = userAPI