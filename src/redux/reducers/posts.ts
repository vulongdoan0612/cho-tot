import { checkFavPost, getFavPost, getFavPostMain } from "@/services/favPost";
import { getCurrentPosts, getPost, getPostService, getPosts } from "@/services/formPost";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IState {
  posts: any;
  post: any;
  favPostList: any;
  favPostListMain: any;
  checkFavPost: boolean;
  currentPosts: any;
  postService: any;
}
export const fetchDataPosts = createAsyncThunk("/get-posts", async (arg: any) => {
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
    date,
    km,
    color,
    country,
    model,
    brand,
    status,
    post,
    keySearch,
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
    district,
    date,
    km,
    color,
    country,
    model,
    brand,
    status,
    post,
    keySearch
  );
  return res?.data;
});
export const fetchDataPost = createAsyncThunk("/get-post", async (arg: any) => {
  const accessToken: any = localStorage.getItem("access_token");

  const { postId } = arg;
  const getPostId = { postId: postId };
  const res = await getPost(accessToken, getPostId);
  return res?.data;
});
export const fetchDataPostService = createAsyncThunk("/get-post-service", async (arg: any) => {
  const accessToken: any = localStorage.getItem("access_token");

  const { postId } = arg;
  const getPostId = { postId: postId };
  const res = await getPostService(accessToken, getPostId);
  return res?.data;
});
export const fetchDataCurrentPost = createAsyncThunk("/get-current-post", async () => {
  const res = await getCurrentPosts();
  return res?.data;
});
export const fetchDataFavList = createAsyncThunk("/get-fav-list", async () => {
  const accessToken: any = localStorage.getItem("access_token");

  const res = await getFavPost(accessToken);
  return res?.data;
});
export const fetchDataFavListMain = createAsyncThunk("/get-fav-list-main", async () => {
  const accessToken: any = localStorage.getItem("access_token");

  const res = await getFavPostMain(accessToken);
  return res?.data;
});
export const fetchCheckFavPost = createAsyncThunk("/check-fav-post", async (arg: any) => {
  const accessToken: any = localStorage.getItem("access_token");
  const { postId } = arg;
  const data = {
    postId: postId,
  };
  const res = await checkFavPost(accessToken, data);
  return res?.data;
});
const initialState: IState = {
  posts: [],
  post: [],
  favPostList: [],
  favPostListMain: [],
  currentPosts: [],
  postService: [],
  checkFavPost: false,
};

const slicer = createSlice({
  name: "postsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDataPosts.fulfilled, (state, action: any) => {
      state.posts = action.payload;
    });
    builder.addCase(fetchDataPost.fulfilled, (state, action: any) => {
      state.post = action.payload;
    });
    builder.addCase(fetchDataPostService.fulfilled, (state, action: any) => {
      state.postService = action.payload;
    });
    builder.addCase(fetchDataFavList.fulfilled, (state, action: any) => {
      state.favPostList = action.payload;
    });
    builder.addCase(fetchDataFavListMain.fulfilled, (state, action: any) => {
      state.favPostListMain = action.payload;
    });
    builder.addCase(fetchCheckFavPost.fulfilled, (state, action: any) => {
      state.checkFavPost = action.payload;
    });
    builder.addCase(fetchDataCurrentPost.fulfilled, (state, action: any) => {
      state.currentPosts = action.payload;
    });
  },
});

export default slicer.reducer;
