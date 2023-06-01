import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  ADD_PROPERTY_END_POINT,
  ADD_USER_END_POINT,
  GET_API,
  GET_PROPERTIES_BY_TYPE,
  GET_PROPERTIES_END_POINT,
  GET_USER_BY_EMAIL_END_POINT,
  POST_API,
  UPDATE_USER_BY_EMAIL_END_POINT,
  VERIFY_VERIFICATION_CODE_END_POINT,
} from '../services/api';

const initialState = {
  addUser: {},
  addUserLoader: false,
  properties: {},
  getPropertiesLoader: false,
  userByEmail: {},
  userByEmailLoader: false,
  updatedUser: {},
  updatedUserLoader: false,
  verifyOtp: {},
  verifyOtpLoader: false,
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
    const api = GET_USER_BY_EMAIL_END_POINT.replace('${email}', email);
    const resp = await GET_API(api);
    return resp;
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
});

export const updateUser = createAsyncThunk('services/updateUser', async (userData, thunkAPI) => {
  try {
    const resp = await POST_API(UPDATE_USER_BY_EMAIL_END_POINT, userData);
    return resp;
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
});

export const verifyCode = createAsyncThunk('services/verifyCode', async (userData, thunkAPI) => {
  try {
    const resp = await POST_API(VERIFY_VERIFICATION_CODE_END_POINT, userData);
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
    [updateUser.pending]: (state) => {
      state.updatedUserLoader = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.updatedUserLoader = false;
      state.updatedUser = payload;
    },
    [updateUser.rejected]: (state) => {
      state.updatedUserLoader = false;
    },
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
    [verifyCode.pending]: (state) => {
      state.verifyOtpLoader = true;
    },
    [verifyCode.fulfilled]: (state, action) => {
      state.verifyOtpLoader = false;
      state.verifyOtp = action.payload;
    },
    [verifyCode.rejected]: (state) => {
      state.verifyOtpLoader = false;
    },
  },
});

export default userSlice.reducer;
