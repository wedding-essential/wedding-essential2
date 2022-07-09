// Button.stories.ts|tsx

import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import VerifyEmailBanner from "./VerifyEmailBanner";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "VerifyEmailBanner",
  component: VerifyEmailBanner,
} as ComponentMeta<typeof VerifyEmailBanner>;

export const Primary: ComponentStory<typeof VerifyEmailBanner> = () => (
  <VerifyEmailBanner />
);
