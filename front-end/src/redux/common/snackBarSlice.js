import { createSlice } from '@reduxjs/toolkit'

const initialState = [{
  open: true,
  message: 'test bar',
  severity: 'success',
}]

const snackBarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    updateSnackBar(state, action) {
      state.splice(0, 1, action.payload);
    }
  }
})

export const { updateSnackBar } = snackBarSlice.actions

export default snackBarSlice.reducer;