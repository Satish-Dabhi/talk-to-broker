import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./property/propertySlice";
import emailReducer from "./email/emailSlice";

const store = configureStore({
  reducer: { 
    propertyHandler : propertyReducer,
    emailHandler : emailReducer,
  },
});

export default store;
