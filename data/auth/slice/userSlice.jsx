import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
}

const userSlice = createSlice({
  name: 'userObject',
  initialState,
  reducers: {
    setLoginUser: (state, action) => {
      state.user = action.payload.user
    },
    deleteLoginUser: (state) => {
      state.user = null
    }
  },
})


export const { setLoginUser, deleteLoginUser } = userSlice.actions

export default userSlice.reducer