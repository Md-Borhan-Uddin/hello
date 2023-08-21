import { getUser } from '../../../utility/authentication'
import { baseURL } from '../../../utility/baseURL'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../../baseQuery'


// const {access_token} = getUser()
export const userAPI = createApi({
    reducerPath: 'getUserData',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
      getUser: builder.query({
        query: (access_token) => 
          {
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