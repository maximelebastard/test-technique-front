import React from "react";
import { shallow, render } from "enzyme";
import Thumbnail from "./Thumbnail";

it("renders without crashing", () => {
  shallow(
    <Thumbnail
      selected={false}
      title={"Back to the Future"}
      posterUrl="http://some.url/bttf.jpg"
    />
  );
});

it("matches the snapshot", () => {
  expect(
    render(
      <Thumbnail
        selected={true}
        title={"Back to the Future"}
        posterUrl="http://some.url/bttf.jpg"
      />
    ).text()
  ).toMatchSnapshot();
});
