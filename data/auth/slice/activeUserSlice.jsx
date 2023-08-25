import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: '',
  user: null
}

const activeUserSlice = createSlice({
  name: 'activeUser',
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.token = action.payload.token
      state.user = action.payload.user
      console.log('user update')
    },
    deleteActiveUser: (state) => {
      state.token = "" 
      state.user = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { setActiveUser, deleteActiveUser } = activeUserSlice.actions

export default activeUserSlice.reducer