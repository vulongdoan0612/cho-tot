import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  countdownDuration: number;
  loading: boolean;
}

const initialState: IState = {
  countdownDuration: 500,
  loading: false,
};

const slicer = createSlice({
  name: "countDownLoading",
  initialState,
  reducers: {
    countDownLoading: (state, action: PayloadAction<number>) => {
      state.countdownDuration = action.payload;
    },
    countdownComplete: (state) => {
      state.loading = false;
    },
  },
});

export const { countDownLoading, countdownComplete } = slicer.actions;

export default slicer.reducer;
