import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notification:null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notification = action.payload.notification
    },
  },
})

// Action creators are generated for each case reducer function
export const { setNotification } = notificationSlice.actions

export default notificationSlice.reducer