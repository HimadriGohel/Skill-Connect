import { configureStore } from "@reduxjs/toolkit";
import workerReducer from "./slices/workerSlice";

const store = configureStore({
  reducer: {
    workers: workerReducer,
  },
});

export default store;
