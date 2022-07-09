// Button.stories.ts|tsx

import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import GoogleSocialLogin from "./GoogleSocialLogin";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "GoogleSocialLogin",
  component: GoogleSocialLogin,
} as ComponentMeta<typeof GoogleSocialLogin>;

export const Primary: ComponentStory<typeof GoogleSocialLogin> = () => (
  <GoogleSocialLogin>Google</GoogleSocialLogin>
);
