import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../slices/login/adminSlice";
import getAllReducer from "../slices/getAll/getAllSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    getAll: getAllReducer,
    // other reducers
  },
});
