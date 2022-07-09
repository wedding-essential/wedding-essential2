import React from "react";
import { greenGoldTheme } from "../styles/muiTheme.ts";
import { ThemeProvider } from "@mui/material/styles";

export const decorators = [
  (Story) => (
    <ThemeProvider theme={greenGoldTheme}>
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
