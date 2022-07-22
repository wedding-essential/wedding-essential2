import React from "react";
import { ComponentMeta } from "@storybook/react";

import WeddingWizard from "./WeddingWizard";

export default {
  title: "WeddingWizard",
  component: WeddingWizard,
} as ComponentMeta<typeof WeddingWizard>;

const Template = (args) => <WeddingWizard {...args} />;

export const FirstStep = Template.bind({});
export const SecondStep = Template.bind({});
SecondStep.args = { initialStep: 1 };
export const ThirdStep = Template.bind({});
ThirdStep.args = { initialStep: 2 };
export const FourthStep = Template.bind({});
FourthStep.args = { initialStep: 3 };
export const FifthStep = Template.bind({});
FifthStep.args = { initialStep: 4 };
export const SixthStep = Template.bind({});
SixthStep.args = { initialStep: 5 };
export const SeventhStep = Template.bind({});
SeventhStep.args = { initialStep: 6 };
