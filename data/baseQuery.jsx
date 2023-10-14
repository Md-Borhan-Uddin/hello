import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { deleteActiveUser, setActiveUser } from './auth/slice/activeUserSlice'
import { deletetUser, getUser } from '../utility/authentication'
import { baseURL } from '../utility/baseURL'
import { deleteLoginUser } from './auth/slice/userSlice'
import { useNavigate } from 'react-router-dom'

const baseQuery = fetchBaseQuery({
    baseUrl: baseURL,
    // credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getUser().access_token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
            headers.set("Content-type","application/json")
            headers.set("Content-type","application/json")
        }
        return headers
    }
})

export const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result?.error?.status === 400) {
        api.dispatch(deleteActiveUser())
        api.dispatch(deleteLoginUser())
        deletetUser()
    }
    if (result?.error?.status === 401) {
        // send refresh token to get new access token 
        const refreshResult = await baseQuery({
            url:'/refresh-token/',
            method:'POST',
            body: {refresh:getUser().refresh_token},
        }, api, extraOptions)
        if (refreshResult?.data) {
            const user = api.getState().activeUser.user
            // store the new token 
            api.dispatch(setActiveUser({ ...refreshResult.data, user }))
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(deleteActiveUser())
            api.dispatch(deleteLoginUser())
            deletetUser()
        }
    }

    return result
}

export const baseCreateAPI = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})