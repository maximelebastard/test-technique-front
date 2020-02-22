import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Slice related to the actions performed on the grid
 */

interface State {
  selectedMovieId?: string;
}

export const initialState: State = {};
export const slice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    showMovieDetails: (state, action: PayloadAction<string | undefined>) => {
      state.selectedMovieId = action.payload;
    }
  }
});

export const { showMovieDetails } = slice.actions;

export default slice.reducer;
