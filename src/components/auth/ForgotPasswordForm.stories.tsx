// Button.stories.ts|tsx

import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import ForgotPasswordForm from "./ForgotPasswordForm";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "ForgotPasswordForm",
  component: ForgotPasswordForm,
} as ComponentMeta<typeof ForgotPasswordForm>;

export const Primary: ComponentStory<typeof ForgotPasswordForm> = () => (
  <ForgotPasswordForm />
);
