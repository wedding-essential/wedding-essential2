import { ThemeOptions, createTheme } from "@mui/material/styles";

export const greenGoldThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#e3b957",
    },
    secondary: {
      main: "#1e7819",
    },
  },
  typography: {
    fontFamily: "Poppins",
    h1: {
      fontFamily: "Quattrocento",
    },
    h2: {
      fontFamily: "Quattrocento",
    },
  },
};

export const greenGoldTheme = createTheme(greenGoldThemeOptions);
