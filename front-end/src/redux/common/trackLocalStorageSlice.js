import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const trackLocalStorageSlice = createSlice({
  name: 'trackLocalStorage',
  initialState,
  reducers: {
    updateLocalStorage(state, action) {
      state.splice(0, 1, action.payload);
    }
  }
})

export const { updateLocalStorage } = trackLocalStorageSlice.actions

export default trackLocalStorageSlice.reducer;