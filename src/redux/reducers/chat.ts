import { getAllConversation, getConversation, getConversationSummary } from "@/services/chat";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IState {
  conversation: any;
  allConversation: any;
  postMessage: any;
  allConversationSummary: any;
}
export const fetchConversation = createAsyncThunk("/get-chat", async (arg?: any) => {
  const token = localStorage.getItem("access_token");
  const { idRoom, setSkeletonChat } = arg;
  const postData = { idRoom: idRoom };
  const res = await getConversation(String(token), postData);
  if (res.status === 200) {
    setSkeletonChat(false);
  }
  return res?.data;
});

export const fetchAllConversation = createAsyncThunk("/get-all-chat", async (arg: any) => {
  const { search, typeChat, setSkeleton } = arg;
  setSkeleton(true);
  const token = localStorage.getItem("access_token");
  const data = { search: search, typeChat: typeChat };
  const res = await getAllConversation(String(token), data);
  if (res.status === 200) {
    setSkeleton(false);
  }
  return res?.data;
});

export const fetchAllConversationSummary = createAsyncThunk("/get-all-chat-summary", async (typeChat: any) => {
  const token = localStorage.getItem("access_token");
  const res = await getConversationSummary(String(token), typeChat);
  return res?.data;
});

const initialState: IState = {
  conversation: [],
  allConversation: [],
  allConversationSummary: [],
  postMessage: [],
};

const slicer = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchConversation.fulfilled, (state, action: any) => {
      state.conversation = action.payload;
    });
    builder.addCase(fetchAllConversation.fulfilled, (state, action: any) => {
      state.allConversation = action.payload;
    });
    builder.addCase(fetchAllConversationSummary.fulfilled, (state, action: any) => {
      state.allConversationSummary = action.payload;
    });
  },
});

export default slicer.reducer;
