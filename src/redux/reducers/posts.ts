import { getPosts } from "@/services/formPost";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  posts: any;
}
export const fetchDataPosts = createAsyncThunk(
  "/get-posts",
  async (arg: any) => {
    const {
      pageSize,
      current,
      price,
      form,
      sit,
      fuel,
      numberBox,
      city,
      district,
    } = arg;
    const res = await getPosts(
      pageSize,
      current,
      price,
      form,
      sit,
      fuel,
      numberBox,
      city,
      district
    );
    return res?.data;
  }
);
const initialState: IState = {
  posts: [],
};

const slicer = createSlice({
  name: "postsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDataPosts.fulfilled, (state, action: any) => {
      state.posts = action.payload;
    });
  },
});

export default slicer.reducer;
