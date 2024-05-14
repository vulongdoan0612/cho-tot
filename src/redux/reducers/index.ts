import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import countDownLoading from "./countDownLoading";
import postSell from "./postSell";
import postsData from "./posts";
import detailProfileUser from "./profileUser";

const rootReducer = combineReducers({
  auth,
  countDownLoading,
  postSell,
  postsData,
  detailProfileUser,
});

export default rootReducer;
