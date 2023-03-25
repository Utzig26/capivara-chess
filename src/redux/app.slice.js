import { createSlice } from '@reduxjs/toolkit'

const game = JSON.parse(localStorage.getItem("game"));

const appInitial = {
  loading: false,
  error: false,
  message: '',
  game: game ? game : undefined,
}

export const appSlice = createSlice({
  name: 'appSlice',
  initialState: appInitial,
  reducers: {
    isLoading: (state, action) => {
      state.loading = action.payload
    },
    isError: (state, action) => {
      state.error = action.payload
    },
    setMessage: (state, action) => {
      state.message = action.payload
    },
    setGame: (state, action) => {
      state.game = action.payload
    }
  }
})

export const { 
  isLoading,
  isError,
  setMessage,
  setGame
} = appSlice.actions

export default appSlice.reducer
