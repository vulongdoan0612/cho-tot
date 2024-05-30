import { getPostCheck } from "@/services/formPost";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  dataPost: any;
}
export const fetchDataPost = createAsyncThunk(
  "/get-data-post",
  async (id: any) => {
    const token = localStorage.getItem("access_token");
    if (id) {
      const res = await getPostCheck(String(token), { postId: id });
      return res?.data?.postCheck;
    }
  }
);
const initialState: IState = {
  dataPost: [],
};

const slicer = createSlice({
  name: "postSell",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
 
     builder.addCase(
       fetchDataPost.fulfilled,
       (state, action: PayloadAction<any>) => {
         state.dataPost = action.payload;
       }
     );

  },
});

export default slicer.reducer;
