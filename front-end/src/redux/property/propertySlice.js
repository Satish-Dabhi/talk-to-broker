import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ADD_PROPERTY_END_POINT, GET_API, GET_PROPERTIES_END_POINT, POST_API } from '../services/api';

const initialState = {
  addProperty: {},
  addPropertyLoader: false,
  properties: {},
  getPropertiesLoader: false,
};


export const createProperty = createAsyncThunk('services/createProperty', async (propertyData, thunkAPI) => {
  try {
    const resp = await POST_API(ADD_PROPERTY_END_POINT, propertyData);
    return resp;
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
});

export const getProperties = createAsyncThunk('services/getProperties', async (thunkAPI) => {
  try {
    const resp = await GET_API(GET_PROPERTIES_END_POINT);
    return resp;
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
});

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {},
  extraReducers: {
    [createProperty.pending]: (state) => {
      state.addPropertyLoader = true;
    },
    [createProperty.fulfilled]: (state, { payload }) => {
      state.addPropertyLoader = false;
      state.property = payload;
    },
    [createProperty.rejected]: (state) => {
      state.addPropertyLoader = false;
    },
    [getProperties.pending]: (state) => {
      state.getPropertiesLoader = true;
    },
    [getProperties.fulfilled]: (state, action) => {
      console.log("payload",action);
      state.getPropertiesLoader = false;
      state.properties = action.payload;
    },
    [getProperties.rejected]: (state) => {
      state.getPropertiesLoader = false;
    },
  },
});

export default propertySlice.reducer;
