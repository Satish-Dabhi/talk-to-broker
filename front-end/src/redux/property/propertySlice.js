import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ADD_PROPERTY_END_POINT, POST_API } from '../services/api';

export const createProperty = createAsyncThunk('services/createProperty', async (propertyData, thunkAPI) => {
  try {
    const resp = await POST_API(ADD_PROPERTY_END_POINT, propertyData);
    return resp;
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
});

const initialState = {
  properties: {},
};

const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {},
  extraReducers: {
    [createProperty.pending]: () => {
      console.log('Response Pending');
    },
    [createProperty.fulfilled]: (state, { payload }) => {
      console.log('Response Fulfilled');
      state.property = payload;
    },
    [createProperty.rejected]: () => {
      console.log('Response Rejected');
    },
  },
});

export default propertySlice.reducer;
