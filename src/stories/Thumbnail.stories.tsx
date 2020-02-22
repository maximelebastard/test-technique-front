import React from "react";
import { action } from "@storybook/addon-actions";
import Thumbnail from "../components/thumbnail/Thumbnail";

export default {
  title: "Thumbnail",
  component: Thumbnail
};

export const base = () => (
  <Thumbnail
    title="Life of cats"
    posterUrl="https://placekitten.com/g/200/300"
    onClick={action("clicked")}
    selected={false}
  />
);

export const selected = () => (
  <Thumbnail
    title="Life of cats"
    posterUrl="https://placekitten.com/g/200/300"
    selected={true}
  />
);
