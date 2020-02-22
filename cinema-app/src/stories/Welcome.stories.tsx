import React from "react";
import Welcome from "../components/welcome/Welcome";

export default {
  title: "Welcome",
  component: Welcome
};

export const WaitingForRequestToken = () => (
  <Welcome currentUrl="http://mystorybook.com" />
);
