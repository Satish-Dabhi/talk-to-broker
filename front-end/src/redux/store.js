import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./property/propertySlice";
import buyerInquiryReducer from "./buyerInquiry/buyerInquiry";
import userSlice from "./user/userSlice";
import snackBarSlice from "./common/snackBarSlice";

const store = configureStore({
  reducer: {
    propertyHandler: propertyReducer,
    buyerInquiryHandler: buyerInquiryReducer,
    userHandler: userSlice,
    snackbar: snackBarSlice
  },
});

export default store;
