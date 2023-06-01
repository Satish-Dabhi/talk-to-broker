import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GET_API, GET_USER_BY_EMAIL_END_POINT, POST_API, SEND_EMAIL_END_POINT } from '../services/api';

const initialState = {
  sendEmailStatus: {},
  sendEmailLoader: false,
};

export const sendEmail = createAsyncThunk('services/sendEmail', async (mailOptions, thunkAPI) => {
  console.log('.,,,,,,,,,', mailOptions);
  try {
    const resp = await POST_API(SEND_EMAIL_END_POINT, mailOptions);
    return resp;
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
});


const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {},
  extraReducers: {
    [sendEmail.pending]: (state) => {
      state.sendEmailLoader = true;
    },
    [sendEmail.fulfilled]: (state, { payload }) => {
      console.log('payload', payload);
      state.sendEmailLoader = false;
      state.sendEmailStatus = payload.status;
    },
    [sendEmail.rejected]: (state) => {
      state.sendEmailLoader = false;
    },
  },
});

export default emailSlice.reducer;
