import { getProfile } from "@/services/getProfile";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  isAuthenticated?: boolean;
  account?: any;
  loading?: boolean;
}
export const fetchDataUser = createAsyncThunk("/get-profile", async () => {
  const token = localStorage.getItem("access_token");
  const res = await getProfile(String(token));
  return res.data?.user;
});
const initialState: IState = {
  isAuthenticated: false,
  account: {},
  loading: false,
};

const slicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticate: (
      state,
      action: PayloadAction<{
        isAuthenticated?: boolean;
        account?: any;
        loading?: boolean;
      }>
    ) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.account = action.payload.account;
      state.loading = action.payload.loading;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDataUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDataUser.fulfilled, (state, action) => {
      state.loading = false;
      state.account = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(fetchDataUser.rejected, (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    });
  },
});

export const { setAuthenticate } = slicer.actions;

export default slicer.reducer;
