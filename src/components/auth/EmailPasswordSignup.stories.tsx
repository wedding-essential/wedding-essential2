// Button.stories.ts|tsx

import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import EmailPasswordSignup from "./EmailPasswordSignup";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "EmailPasswordSignup",
  component: EmailPasswordSignup,
} as ComponentMeta<typeof EmailPasswordSignup>;

export const Primary: ComponentStory<typeof EmailPasswordSignup> = () => (
  <EmailPasswordSignup />
);
