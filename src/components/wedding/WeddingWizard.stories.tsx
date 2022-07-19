import React from "react";
import { ComponentMeta } from "@storybook/react";

import WeddingWizard from "./WeddingWizard";

export default {
  title: "WeddingWizard",
  component: WeddingWizard,
} as ComponentMeta<typeof WeddingWizard>;

const Template = (args) => <WeddingWizard {...args} />;

export const FirstStep = Template.bind({});
/* export const SecondStep = Template.bind({});
SecondStep.args.initialStep = 1; */
