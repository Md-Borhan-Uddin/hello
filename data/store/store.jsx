import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userAuthAPI } from '../auth/service/authServices'
import activeUserSlice from '../auth/slice/activeUserSlice'
import { userAPI } from '../auth/service/userServide'
import userSlice from '../auth/slice/userSlice'
import { realestateAPI } from '../auth/service/realestateService'
import {notificationAPI} from '../notification/notificationService'
import notificationSlice from '../notification/notificationSlice'


export const store = configureStore({
  reducer: {
    
    [userAuthAPI.reducerPath]: userAuthAPI.reducer,
    activeUser:activeUserSlice,
    [userAPI.reducerPath]:userAPI.reducer,
    userData:userSlice,
    [realestateAPI.reducerPath] : realestateAPI.reducer,
    notifications:notificationSlice,
    [notificationAPI.reducerPath]: notificationAPI.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthAPI.middleware)
    .concat(userAPI.middleware).concat(realestateAPI.middleware)
    .concat(notificationAPI.middleware),
})


setupListeners(store.dispatch)
