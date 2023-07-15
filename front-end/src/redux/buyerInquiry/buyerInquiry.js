import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ADD_BUYER_INQUIRY_END_POINT, ADD_PROPERTY_END_POINT, GET_API, GET_BUYER_INQUIRIES_BY_USER, GET_BUYER_INQUIRIES_END_POINT, GET_PROPERTIES_BY_TYPE, GET_PROPERTIES_BY_USER, GET_PROPERTIES_END_POINT, GET_PROPERTY_BY_ID, POST_API } from '../services/api';

const initialState = {
  buyerInquiry: {},
  buyerInquiryLoader: false,
  buyerInquiries: {},
  getBuyerInquiriesLoader: false,
  propertiesByType: {},
  getPropertiesByTypeLoader: false,
  propertyById: {},
  getPropertyByIdLoader: false,
  buyerInquiriesByUser: {},
  getBuyerInquiriesByUserLoader: false,
};


export const createBuyerInquiry = createAsyncThunk('services/createBuyerInquiry', async (buyerInquiryData, thunkAPI) => {
  try {
    const resp = await POST_API(ADD_BUYER_INQUIRY_END_POINT, buyerInquiryData);
    return resp;
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
});

export const getBuyerInquiries = createAsyncThunk('services/getBuyerInquiries', async (thunkAPI) => {
  try {
    const resp = await GET_API(GET_BUYER_INQUIRIES_END_POINT);
    return resp;
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
});

export const getPropertiesByType = createAsyncThunk('services/getPropertiesByType', async (propertyType, thunkAPI) => {
  try {
    const api = GET_PROPERTIES_BY_TYPE.replace('${type}', propertyType);
    const resp = await GET_API(api);
    return resp;
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
});

export const getPropertyById = createAsyncThunk('services/getPropertyById', async (propertyId, thunkAPI) => {
  try {
    const api = GET_PROPERTY_BY_ID.replace('${p_id}', propertyId);
    const resp = await GET_API(api);
    return resp;
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
});

export const getBuyerInquiriesByUser = createAsyncThunk('services/getBuyerInquiriesByUser', async (userId, thunkAPI) => {
  try {
    const api = GET_BUYER_INQUIRIES_BY_USER.replace('${u_id}', userId);
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
    [createBuyerInquiry.pending]: (state) => {
      state.buyerInquiryLoader = true;
    },
    [createBuyerInquiry.fulfilled]: (state, { payload }) => {
      state.buyerInquiryLoader = false;
      state.buyerInquiry = payload;
    },
    [createBuyerInquiry.rejected]: (state) => {
      state.buyerInquiryLoader = false;
    },
    [getBuyerInquiries.pending]: (state) => {
      state.getBuyerInquiriesLoader = true;
    },
    [getBuyerInquiries.fulfilled]: (state, action) => {
      state.getBuyerInquiriesLoader = false;
      state.buyerInquiries = action.payload;
    },
    [getBuyerInquiries.rejected]: (state) => {
      state.getBuyerInquiriesLoader = false;
    },
    [getPropertiesByType.pending]: (state) => {
      state.getPropertiesByTypeLoader = true;
    },
    [getPropertiesByType.fulfilled]: (state, action) => {
      state.getPropertiesByTypeLoader = false;
      state.propertiesByType = action.payload;
    },
    [getPropertiesByType.rejected]: (state) => {
      state.getPropertiesByTypeLoader = false;
    },
    [getPropertyById.pending]: (state) => {
      state.getPropertyByIdLoader = true;
    },
    [getPropertyById.fulfilled]: (state, action) => {
      state.getPropertyByIdLoader = false;
      state.propertyById = action.payload;
    },
    [getPropertyById.rejected]: (state) => {
      state.getPropertyByIdLoader = false;
    },
    [getBuyerInquiriesByUser.pending]: (state) => {
      state.getBuyerInquiriesByUserLoader = true;
    },
    [getBuyerInquiriesByUser.fulfilled]: (state, action) => {
      state.getBuyerInquiriesByUserLoader = false;
      state.buyerInquiriesByUser = action.payload;
    },
    [getBuyerInquiriesByUser.rejected]: (state) => {
      state.getBuyerInquiriesByUserLoader = false;
    },
  },
});

export default propertySlice.reducer;
