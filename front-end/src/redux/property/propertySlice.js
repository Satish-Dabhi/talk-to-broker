import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_PROPERTY_END_POINT, handlePostApi } from "../api";


export const createProperty = createAsyncThunk(
    'api/createProperty',
    async (propertyData) => {
        console.log("createProperty",createProperty);
        const response = await fetch(handlePostApi(ADD_PROPERTY_END_POINT, propertyData));
        if (!response.ok) {
            throw new Error('Failed to create user data');
        }
        const data = await response.json();
        return data;
    }
);

const initialState = {
    properties: {},
};

const propertySlice = createSlice({
    name: "properties",
    initialState,
    reducers: {},
    extraReducers: {
        [createProperty.pending]: () => {
            console.log("Response Pending");
        },
        [createProperty.fulfilled]: (state, { payload }) => {
            console.log("Response Fulfilled");
            state.property = payload;
        },
        [createProperty.rejected]: () => {
            console.log("Response Rejected");
        }
    },
});

export default propertySlice.reducer;
