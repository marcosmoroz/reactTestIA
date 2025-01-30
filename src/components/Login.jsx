import { useState } from 'react';
import { useAuthStore } from "../store/authStore";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { tokens } from "../theme";
import { useTheme } from "@mui/material/styles";
import { Box, TextField, Button, Typography } from "@mui/material"; 

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/apigateway/v1/auth/login", {
        username,
        password
      });
      login(response.data.datos);
      navigate(location.state?.from?.pathname || "/dashboard");
    } catch (error) {
      console.error("Error en el login:", error);
      alert("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          backgroundColor: colors.primary,
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <Typography variant="h4" component="h1" textAlign="center" color={colors.grey}>
          Iniciar Sesión
        </Typography>
        
        <TextField
          fullWidth
          label="Usuario"
          value={username}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          sx={{
            backgroundColor: colors.primary,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: colors.grey,
              },
            },
            '& .MuiInputLabel-root': {
              color: colors.grey,
            },
            '& .MuiOutlinedInput-input': {
              color: colors.grey,
            },
          }}
        />
        
        <TextField
          fullWidth
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          sx={{
            backgroundColor: colors.primary,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: colors.grey,
              },
            },
            '& .MuiInputLabel-root': {
              color: colors.grey,
            },
            '& .MuiOutlinedInput-input': {
              color: colors.grey,
            },
          }}
        />
        
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: colors.blueAccent,
            color: colors.grey,
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            '&:hover': {
              backgroundColor: colors.blueAccent,
            },
          }}
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Iniciar Sesión'}
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
