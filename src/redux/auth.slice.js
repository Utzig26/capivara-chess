import { createSlice } from '@reduxjs/toolkit'

const user = JSON.parse(localStorage.getItem("user"));

const authInital = user
? { 
  logged: true, 
  user: user 
} : { 
  logged: false, 
  user: null 
}; 

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: authInital,
  reducers: {
    isLoggedIn: (state, action) => {
      state.logged = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    }
  }
})

export const { 
  isLoggedIn,
  setUser,
} = authSlice.actions

export default authSlice.reducer
