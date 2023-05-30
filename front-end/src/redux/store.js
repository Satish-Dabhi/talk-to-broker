import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./property/propertySlice";
import emailReducer from "./email/emailSlice";
import userSlice from "./user/userSlice";

const store = configureStore({
  reducer: { 
    propertyHandler : propertyReducer,
    emailHandler : emailReducer,
    userHandler : userSlice,
  },
});

export default store;
