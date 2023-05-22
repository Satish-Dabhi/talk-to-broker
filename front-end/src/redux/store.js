import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./property/propertySlice";

const store = configureStore({
  reducer: { propertyReducer },
});

export default store;
