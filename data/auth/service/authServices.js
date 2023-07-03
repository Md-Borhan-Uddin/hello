// Need to use the React-specific entry point to import createApi
import { baseURL } from '../../../utility/baseURL'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoint
export const userAuthAPI = createApi({
  reducerPath: 'authentication',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    userRegistration: builder.mutation({
      query: (user) => {
        return {
            url:'/realtor/registration/',
            body:user,
            method:'POST',
            headers:{
              "Content-type":"application/json"
            }
        }
      },
    }),
    userLogin: builder.mutation({
        query: (user) => {
          return {
              url:'/login/',
              body:user,
              method:'POST',
              headers:{
                "Content-type":"application/json"
              }
          }
        },
      }),
    userActivation: builder.mutation({
        query: (data) => {
            return {
                url:`/email-veryfi/${data.uid}/${data.token}/`,
                method:'POST',
                headers:{
                  "Content-type":"application/json"
                }
            }
          },
    }),
   

  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useUserRegistrationMutation, useUserLoginMutation, useUserActivationMutation } = userAuthAPI