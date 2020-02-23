import React from "react";
import { shallow, render } from "enzyme";
import Grid from "./Grid";
import { Movie } from "domain/types";

const movies: Movie[] = [
  { id: "first_movie", title: "A First Movie", poster: "/some_image.jpg" },
  {
    id: "second_movie",
    title: "A Second Movie",
    poster: "/some_other_image.jpg"
  }
];

it("renders without crashing", () => {
  shallow(
    <Grid
      initializing={false}
      moviesFetching={false}
      onNextPage={jest.fn()}
      movies={movies}
    />
  );
});

it("matches the snapshot when initializing", () => {
  expect(
    render(
      <Grid
        initializing={true}
        moviesFetching={false}
        onNextPage={jest.fn()}
        movies={movies}
      />
    ).text()
  ).toMatchSnapshot();
});

it("matches the snapshot when fetching movies", () => {
  expect(
    render(
      <Grid
        initializing={false}
        moviesFetching={true}
        onNextPage={jest.fn()}
        movies={movies}
      />
    ).text()
  ).toMatchSnapshot();
});
