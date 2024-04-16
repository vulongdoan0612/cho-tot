import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import countDownLoading from "./countDownLoading";
import postSell from "./postSell";

const rootReducer = combineReducers({
  auth,
  countDownLoading,
  postSell,
});

export default rootReducer;
