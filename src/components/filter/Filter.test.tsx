import React from "react";
import { shallow } from "enzyme";
import Filter from "./Filter";

it("renders without crashing", () => {
  shallow(<Filter selected={"watchlist"} onChange={filter => filter} />);
});

it("matches the snapshot", () => {
  expect(
    <Filter selected={"watchlist"} onChange={filter => filter} />
  ).toMatchSnapshot();
});
