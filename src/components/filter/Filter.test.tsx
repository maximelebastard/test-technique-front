import React from "react";
import { shallow, render } from "enzyme";
import Filter from "./Filter";

it("renders without crashing", () => {
  shallow(<Filter selected={"watchlist"} onChange={filter => filter} />);
});

it("matches the snapshot", () => {
  expect(
    render(<Filter selected={"watchlist"} onChange={filter => filter} />).text()
  ).toMatchSnapshot();
});
