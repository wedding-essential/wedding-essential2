// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import EmailPasswordLogin from "./EmailPasswordLogin";

export default {
  title: "EmailPasswordLogin",
  component: EmailPasswordLogin,
} as ComponentMeta<typeof EmailPasswordLogin>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof EmailPasswordLogin> = (args: any) => (
  <EmailPasswordLogin {...args} />
);

export const Primary = Template.bind({});
