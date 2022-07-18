import React from "react";
import { ComponentMeta } from "@storybook/react";

import WeddingTimeline from "./WeddingTimeline";

import { mockEvents } from "../../../mocks/mockEvents";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "WeddingTimeline",
  component: WeddingTimeline,
} as ComponentMeta<typeof WeddingTimeline>;

const Template = (args) => <WeddingTimeline {...args} />;

export const Empty = Template.bind({});
Empty.args = { events: [] };

export const Primary = Template.bind({});
Primary.args = { events: mockEvents };
