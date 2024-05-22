import { getProfile } from "@/services/getProfile";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

interface IState {
  isAuthenticated?: boolean;
  account?: any;
  loading?: boolean;
}
export const fetchDataUser = createAsyncThunk("/get-profile", async () => {
  const token = localStorage.getItem("access_token");
  const res = await getProfile(String(token));
  return res.data;
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
      state.isAuthenticated = action.payload.isAuthenticated ?? state.isAuthenticated;
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
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    });
  },
});

export const { setAuthenticate } = slicer.actions;

export default slicer.reducer;
