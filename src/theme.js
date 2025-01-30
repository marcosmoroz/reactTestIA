import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { esES } from '@mui/material/locale';

// Función para generar los tokens de color
export const designTokens = (mode) => ({
  palette: {
    mode: mode,
    ...(mode === "dark"
      ? {
          // Dark mode
          primary: {
            main: "#141b2d",
            light: "#1F2A40",
            dark: "#0c101b",
          },
          secondary: {
            main: "#4cceac",
          },
          error: {
            main: "#db4f4a",
          },
          background: {
            default: "#141b2d",
            paper: "#1F2A40",
          },
          text: {
            primary: "#e0e0e0",
            secondary: "#a3a3a3",
          },
          grey: {
            100: "#e0e0e0",
            500: "#666666",
            900: "#141414",
          },
        }
      : {
          // Light mode
          primary: {
            main: "#fcfcfc",
            light: "#ffffff",
            dark: "#f2f0f0",
          },
          secondary: {
            main: "#4cceac",
          },
          error: {
            main: "#db4f4a",
          },
          background: {
            default: "#fcfcfc",
            paper: "#ffffff",
          },
          text: {
            primary: "#141414",
            secondary: "#666666",
          },
          grey: {
            100: "#141414",
            500: "#666666",
            900: "#e0e0e0",
          },
        }),
  },
});

// Configuración del tema principal
const themeSettings = (mode) => {
  const tokens = designTokens(mode);
  return createTheme({
    ...tokens,
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      h1: { fontSize: 40 },
      h2: { fontSize: 32 },
      h3: { fontSize: 24 },
      h4: { fontSize: 20 },
      h5: { fontSize: 16 },
      h6: { fontSize: 14 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "8px",
          },
        },
      },
    },
  }, esES);
};

// Contexto y hook para el modo de color
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => 
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => themeSettings(mode), [mode]);
  
  return [theme, colorMode];
};

export { designTokens as tokens };