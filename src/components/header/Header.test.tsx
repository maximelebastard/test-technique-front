import React from "react";
import { shallow, render } from "enzyme";
import Header from "./Header";

it("renders without crashing", () => {
  shallow(<Header />);
});

it("matches the snapshot", () => {
  expect(render(<Header />).text()).toMatchSnapshot();
});
