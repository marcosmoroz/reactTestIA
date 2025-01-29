import { Box, IconButton, useTheme, Button } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  //Devuelve los colores por tema:
  const colors = tokens(theme.palette.mode);

  //Usa un contexto global para obtenerlo
  const colorMode = useContext(ColorModeContext);

  const isRootPath = location.pathname === '/';

  const handleClick = () => {
    console.log(location.pathname)
    navigate(-1)
  }

  return (
    //Box es como un div pero de MUI. Le podes pasar las propiedades mas facil

    <Box display="flex" justifyContent="space-between" p={2}>
      
      {/* SEARCH BAR */}
      <Box
        display="flex"
        //El 400 es como para darle la intensidad del color
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        {!isRootPath && (
        <Button
          sx={{ background: colors.greenAccent[500] }}
          onClick={handleClick}
          variant="contained"
          startIcon={<SkipPreviousIcon />}
        >
          Atrás
        </Button>
      )}
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
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

export default Topbar;