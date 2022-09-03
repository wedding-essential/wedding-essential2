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
    h3: {
      fontFamily: "Quattrocento",
    },
    h4: {
      fontFamily: "Quattrocento",
    },
    h5: {
      fontFamily: "Quattrocento",
    },
    h6: {
      fontFamily: "Quattrocento",
    },
    body1: {
      fontFamily: "Poppins",
    },
  },
  components: {
    MuiStepper: {
      styleOverrides: {
        root: {
          width: "100%",
          "overflow-x": "scroll",
        },
      },
    },
  },
};

export const greenGoldTheme = createTheme(greenGoldThemeOptions);
