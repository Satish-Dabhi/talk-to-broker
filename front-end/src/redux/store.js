import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./property/propertySlice";
import userSlice from "./user/userSlice";
import snackBarSlice from "./common/snackBarSlice";

const store = configureStore({
  reducer: {
    propertyHandler: propertyReducer,
    userHandler: userSlice,
    snackbar: snackBarSlice
  },
});

export default store;
