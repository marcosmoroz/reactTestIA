import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import foto from '../../assets/foto.jpg';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ArticleIcon from '@mui/icons-material/Article';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import CalculateIcon from '@mui/icons-material/Calculate';
import CategoryIcon from '@mui/icons-material/Category';
import BalanceIcon from '@mui/icons-material/Balance';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey,
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ isSidebar, isCollapsed, setIsCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        position: 'fixed', // Agrega esta línea para fijar la barra lateral
        height: '100%', // Ajusta la altura según tus necesidades
        zIndex: 1000, // Ajusta el índice Z según sea necesario
        "& .pro-sidebar-inner": {
          background: `${colors.primary} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey,
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey}>
                  Blues Building
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={foto}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  David Caputo
                </Typography>
                <Typography variant="h5" color={colors.greenAccent}>
                  Administrador
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Inicio"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey}
              sx={{ m: "15px 0 5px 20px" }}
            >
              ABMs
            </Typography>
            <Item
              title="Articulos"
              to="/articulos"
              icon={<ArticleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Categorías"
              to="/categorias"
              icon={<CategoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Productos"
              to="/productos"
              icon={<PrecisionManufacturingIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Proyectos"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Unidades"
              to="/unidades"
              icon={<BalanceIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Cálculos
            </Typography>
            <Item
              title="Cómputo personalizado"
              to="/computo-personalizado"
              icon={<CalculateIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;