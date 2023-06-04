import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./property/propertySlice";
import emailReducer from "./email/emailSlice";
import userSlice from "./user/userSlice";
import snackBarSlice from "./common/snackBarSlice";
import trackLocalStorageSlice from "./common/trackLocalStorageSlice";

const store = configureStore({
  reducer: {
    propertyHandler: propertyReducer,
    emailHandler: emailReducer,
    userHandler: userSlice,
    snackbar: snackBarSlice,
    trackLocalStorage: trackLocalStorageSlice
  },
});

export default store;
