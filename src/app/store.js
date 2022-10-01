import { configureStore } from "@reduxjs/toolkit";
import changeReducer from "../features/noteApp/changeSlice";
export default configureStore({
  reducer: {
    // changeDetector: changeReducer,
    changeDetector: changeReducer,
  },
});
