import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  ADD_PROPERTY_END_POINT,
  ADD_USER_END_POINT,
  GET_API,
  GET_PROPERTIES_BY_TYPE,
  GET_PROPERTIES_END_POINT,
  GET_USER_BY_EMAIL,
  POST_API,
} from '../services/api';

const initialState = {
  addUser: {},
  addUserLoader: false,
  properties: {},
  getPropertiesLoader: false,
  userByEmail: {},
  userByEmailLoader: false,
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

export const getUserByEmail = createAsyncThunk('services/getPropertiesByType', async (email, thunkAPI) => {
  try {
    const api = GET_USER_BY_EMAIL.replace('${email}', email);
    const resp = await GET_API(api);
    return resp;
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
});

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
    [getUserByEmail.pending]: (state) => {
      state.userByEmailLoader = true;
    },
    [getUserByEmail.fulfilled]: (state, action) => {
      state.userByEmailLoader = false;
      state.userByEmail = action.payload;
    },
    [getUserByEmail.rejected]: (state) => {
      state.userByEmailLoader = false;
    },
  },
});

export default userSlice.reducer;
