import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import countDownLoading from "./countDownLoading";
import postSell from "./postSell";
import postsData from "./posts";

const rootReducer = combineReducers({
  auth,
  countDownLoading,
  postSell,
  postsData,
});

export default rootReducer;
