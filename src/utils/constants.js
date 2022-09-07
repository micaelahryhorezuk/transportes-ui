import { createTheme, responsiveFontSizes } from "@mui/material";

export const APIPrivate = `${process.env.REACT_APP_API_PRIVATE_HOST}:${process.env.REACT_APP_API_PRIVATE_PORT}`;

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      background: {
        default: "#FFFFFF",
        paper: "#FFFFFF",
      },
      primary: {
        main: "#009688",
        dark: "#00796B",
        light: "#B2DFDB"
      },
      secondary: {
        main: "#365CDF",
        dark: "#000000",
      },
      success: {
        main: "#0ec254",
        dark: "#0ec254",
      },
      warning: {
        main: "#FFD100",
        dark: "#F2BC00",
      },
      error: {
        main: "#D33939",
        dark: "#D33939",
      },
      info: {
        main: "#546e7a",
        dark: "#546e7a",
      },
    },
  })
);