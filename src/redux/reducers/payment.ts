import { historyPayment } from "@/services/payment";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IState {
  paymentHistory: any;
}
export const fetchHistory = createAsyncThunk("/history", async () => {
  const token = localStorage.getItem("access_token");
  const res = await historyPayment(String(token));
  return res?.data;
});

const initialState: IState = {
  paymentHistory: [],
};

const slicer = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHistory.fulfilled, (state, action: any) => {
      state.paymentHistory = action.payload;
    });
  },
});

export default slicer.reducer;
