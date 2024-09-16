import React, { ReactNode } from "react";
import { ThemeProvider as MUIThemeProvider, createTheme } from "@mui/material";
import { darkTheme } from "../../themes/themes";

const theme = createTheme({
  palette: {
    primary: {
      main: darkTheme.primaryColor,
    },
    secondary: {
      main: darkTheme.primaryComplementary,
    },
  },
  components: {
    MuiFormLabel: {
        styleOverrides: {
        }
    },
    MuiTextField: {
      },
  },
});


const ThemeProvider = ({children}: { children: ReactNode }) => {
    return (
        <MUIThemeProvider theme={theme}>
            {children}
        </MUIThemeProvider>
    )
}

export default ThemeProvider