import * as Slice from "./GridSlice";

describe("GridSlice", () => {
  describe("Reducers", () => {
    it("Shows a movie id", () => {
      const action = Slice.slice.actions.showMovieDetails("SOME_MOVIE");
      const outputState = Slice.slice.reducer(Slice.initialState, action);
      expect(outputState.selectedMovieId).toEqual("SOME_MOVIE");
    });

    it("Unshows a movie", () => {
      const action = Slice.slice.actions.showMovieDetails(undefined);
      const outputState = Slice.slice.reducer(Slice.initialState, action);
      expect(outputState.selectedMovieId).toEqual(undefined);
    });
  });
});
