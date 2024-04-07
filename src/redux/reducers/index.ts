import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import countDownLoading from "./countDownLoading";

const rootReducer = combineReducers({
  auth,
  countDownLoading,
});

export default rootReducer;
