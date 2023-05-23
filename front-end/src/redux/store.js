import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./property/propertySlice";

const store = configureStore({
  reducer: { propertyHandler : propertyReducer },
});

export default store;
