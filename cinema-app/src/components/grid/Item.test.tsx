import React from "react";
import { shallow } from "enzyme";
import Item from "./Item";
import { Movie } from "domain/types";

const movie: Movie = {
  id: "some_movie",
  title: "Interstellar",
  poster: "/some_poster.jpg"
};

it("renders without crashing", () => {
  shallow(
    <Item
      movie={movie}
      showDetails={true}
      onMovieSelected={movieId => movieId}
    />
  );
});

it("matches the snapshot", () => {
  expect(
    <Item
      movie={movie}
      showDetails={true}
      onMovieSelected={movieId => movieId}
    />
  ).toMatchSnapshot();
});
