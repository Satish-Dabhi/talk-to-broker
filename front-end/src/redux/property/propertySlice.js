import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ADD_PROPERTY_END_POINT, GET_API, GET_PROPERTIES_BY_TYPE, GET_PROPERTIES_END_POINT, POST_API } from '../services/api';

const initialState = {
  addProperty: {},
  addPropertyLoader: false,
  properties: {},
  getPropertiesLoader: false,
  propertiesByType: {},
  getPropertiesByTypeLoader: false,
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

export const getPropertiesByType = createAsyncThunk('services/getPropertiesByType', async (propertyType, thunkAPI) => {
  try {
    const api = GET_PROPERTIES_BY_TYPE.replace('${type}', propertyType);
    console.log(".......",api);
    const resp = await GET_API(api);
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
    [getPropertiesByType.pending]: (state) => {
      state.getPropertiesByTypeLoader = true;
    },
    [getPropertiesByType.fulfilled]: (state, action) => {
      console.log("payload",action);
      state.getPropertiesByTypeLoader = false;
      state.propertiesByType = action.payload;
    },
    [getPropertiesByType.rejected]: (state) => {
      state.getPropertiesByTypeLoader = false;
    },
  },
});

export default propertySlice.reducer;
