import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  ADD_PROPERTY_END_POINT,
  ADD_USER_END_POINT,
  GET_API,
  GET_PROPERTIES_BY_TYPE,
  GET_PROPERTIES_END_POINT,
  POST_API,
} from '../services/api';

const initialState = {
  addUser: {},
  addUserLoader: false,
  properties: {},
  getPropertiesLoader: false,
  propertiesByType: {},
  getPropertiesByTypeLoader: false,
};

export const createUser = createAsyncThunk('services/createUser', async (userData, thunkAPI) => {
  try {
    const resp = await POST_API(ADD_USER_END_POINT, userData);
    return resp;
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
});

// export const getProperties = createAsyncThunk('services/getProperties', async (thunkAPI) => {
//   try {
//     const resp = await GET_API(GET_PROPERTIES_END_POINT);
//     return resp;
//   } catch (error) {
//     return thunkAPI.rejectWithValue('something went wrong');
//   }
// });

// export const getPropertiesByType = createAsyncThunk('services/getPropertiesByType', async (propertyType, thunkAPI) => {
//   try {
//     const api = GET_PROPERTIES_BY_TYPE.replace('${type}', propertyType);
//     const resp = await GET_API(api);
//     return resp;
//   } catch (error) {
//     return thunkAPI.rejectWithValue('something went wrong');
//   }
// });

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [createUser.pending]: (state) => {
      state.addUserLoader = true;
    },
    [createUser.fulfilled]: (state, { payload }) => {
      state.addUserLoader = false;
      state.addUser = payload;
    },
    [createUser.rejected]: (state) => {
      state.addUserLoader = false;
    },
    // },
    // [getProperties.pending]: (state) => {
    //   state.getPropertiesLoader = true;
    // },
    // [getProperties.fulfilled]: (state, action) => {
    //   state.getPropertiesLoader = false;
    //   state.properties = action.payload;
    // },
    // [getProperties.rejected]: (state) => {
    //   state.getPropertiesLoader = false;
    // },
    // [getPropertiesByType.pending]: (state) => {
    //   state.getPropertiesByTypeLoader = true;
    // },
    // [getPropertiesByType.fulfilled]: (state, action) => {
    //   state.getPropertiesByTypeLoader = false;
    //   state.propertiesByType = action.payload;
    // },
    // [getPropertiesByType.rejected]: (state) => {
    //   state.getPropertiesByTypeLoader = false;
    // },
  },
});

export default userSlice.reducer;
