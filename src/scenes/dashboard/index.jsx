import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PaidIcon from '@mui/icons-material/Paid';
import MoneyIcon from '@mui/icons-material/Money';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="¡Bienvenido David!" subtitle="Nos alegra que hayas elegido Blues Building" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <AccountTreeIcon sx={{ mr: "10px" }} />
            Ver todos mis proyectos
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {<StatBox
            title="$ 12,361"
            subtitle="Ganancia neta último mes"
            progress="0.75"
            increase="+14%"
            icon={
              <PaidIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />}
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {<StatBox
            title="$ 30.582"
            subtitle="Ganancia bruta último mes"
            progress="0.50"
            increase="+21%"
            icon={
              <PaidIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />}
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {<StatBox
            title="$ 5.234"
            subtitle="Promedio de ganancia por proyecto"
            progress="0.30"
            increase="+5%"
            icon={
              <MoneyIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />}
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {<StatBox
            title="32"
            subtitle="Cantidad de proyectos totales"
            progress="0.80"
            increase="+43%"
            icon={
              <ProductionQuantityLimitsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />}
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                GANANCIA TOTAL
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <PaidIcon
              sx={{ color: colors.greenAccent[600], fontSize: "72px" }}
            />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Últimos Cómputos
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

      </Box>
    </Box>
  );
};

export default Dashboard;