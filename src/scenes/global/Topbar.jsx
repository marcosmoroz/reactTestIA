import React, { createContext, useContext, useState, useMemo } from "react";
import { Box, IconButton, useTheme, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { designTokens as tokens } from "../../theme"; // Asegúrate de que esta ruta sea correcta
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

// Crear el contexto directamente en este archivo
const ColorModeContext = createContext();

// Proveedor del contexto para manejar el tema
const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const colorMode = useMemo(
    () => ({ mode, toggleColorMode }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      {children}
    </ColorModeContext.Provider>
  );
};

const Topbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode); // Usa los colores según el tema actual
  const colorMode = useContext(ColorModeContext); // Obtén el contexto para manejar el tema
  const isRootPath = location.pathname === "/"; // Comprueba si estás en la raíz

  const handleClick = () => {
    console.log(location.pathname);
    navigate(-1); // Navega a la página anterior
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* Barra de búsqueda y botón "Atrás" */}
      <Box
        display="flex"
        backgroundColor={colors.primary} // Aplica colores personalizados
        borderRadius="3px"
      >
        {!isRootPath && (
          <Button
            sx={{ background: colors.greenAccent}}
            onClick={handleClick}
            variant="contained"
            startIcon={<SkipPreviousIcon />}
          >
            Atrás
          </Button>
        )}
      </Box>

      {/* Íconos */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

// Exportar el proveedor y el componente
const AppWithProvider = () => (
  <ColorModeProvider>
    <Topbar />
  </ColorModeProvider>
);

export default AppWithProvider;
