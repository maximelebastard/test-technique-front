import React from "react";
import { shallow, render } from "enzyme";
import Error from "./Error";

it("renders without crashing", () => {
  shallow(<Error />);
});

it("matches the snapshot", () => {
  expect(render(<Error />).text()).toMatchSnapshot();
});
