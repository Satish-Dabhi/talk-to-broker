import { createSlice } from '@reduxjs/toolkit'

const initialState = [{
  open: false,
  message: '',
  severity: '',
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