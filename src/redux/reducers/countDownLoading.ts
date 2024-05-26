import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  countdownDuration: number;
  loading: boolean;
}

const initialState: IState = {
  countdownDuration: 500,
  loading: true,
};

const slicer = createSlice({
  name: "countDownLoading",
  initialState,
  reducers: {
    countDownLoading: (state, action: PayloadAction<number>) => {
      state.countdownDuration = action.payload;
    },
    countdownComplete: (state) => {
      state.loading = true;
    },
  },
});

export const { countDownLoading, countdownComplete } = slicer.actions;

export default slicer.reducer;
