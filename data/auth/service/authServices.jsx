// Need to use the React-specific entry point to import createApi
import { getUser } from '../../../utility/authentication';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseURL } from '../../../utility/baseURL';


const {access_token} = getUser()
const headers = {
  Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
};


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
            url:`/active-account/${data.uid}/${data.token}/`,
            method:'POST',
            headers:{
              "Content-type":"application/json"
            }
          }
        },
      }),

    changePassword: builder.mutation({
      query: (data) => {
        return {
          url:`/password-change/`,
          method:'POST',
          body:data,
          headers:headers
        }
      },
    }),
    sendPasswordResetEmain: builder.mutation({
      query: (email) => {
        console.log(email)
        return {
          url:`/password-reset-email/`,
          method:'POST',
          body:email,
          headers:{
            "Content-type":"application/json"
          }
        }
      },
    }),

    PasswordReset: builder.mutation({
      query: (data) => {
        return {
          url:`/reset-password/${data.uid}/${data.token}/`,
          method:'POST',
          body:data.data,
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
export const { useUserRegistrationMutation, usePasswordResetMutation,useSendPasswordResetEmainMutation, useChangePasswordMutation, useUserLoginMutation, useUserActivationMutation } = userAuthAPI