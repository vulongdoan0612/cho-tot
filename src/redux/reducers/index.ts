import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import countDownLoading from "./countDownLoading";
import postSell from "./postSell";
import postsData from "./posts";
import detailProfileUser from "./profileUser";
import chat from "./chat";

const rootReducer = combineReducers({
  auth,
  countDownLoading,
  postSell,
  postsData,
  detailProfileUser,
  chat,
});

export default rootReducer;
