import { getDetailProfileUser } from "@/services/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IState {
  detailProfileUser: any;
}

export const fetchDataUserProfile = createAsyncThunk("/get-posts", async (arg: any) => {
  const { userId, setSpin, setSpinFull } = arg;
  const postData = { userId: userId };
  const res = await getDetailProfileUser(postData);
  if (res.status === 200) {
    setSpinFull(false);
    setSpin(false);
  }
  return res?.data;
});

const initialState: IState = {
  detailProfileUser: [],
};

const slicer = createSlice({
  name: "detailProfileUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDataUserProfile.fulfilled, (state, action: any) => {
      state.detailProfileUser = action.payload;
    });
  },
});

export default slicer.reducer;
