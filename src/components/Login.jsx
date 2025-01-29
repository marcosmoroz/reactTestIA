import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect para redirigir si hay un token
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/productos');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/apigateway/v1/auth/login', credentials);
      localStorage.setItem('token', response.data.datos);
      onLogin(); // Llamar aquí después de guardar el token
    } catch (error) {
      console.error('Error en el login:', error);
      alert('Error al iniciar sesión. Verifica tus credenciales.');
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
      bgcolor={colors.primary[400]}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          backgroundColor: colors.primary[400],
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <Typography variant="h4" component="h1" textAlign="center" color={colors.grey[100]}>
          Iniciar Sesión
        </Typography>
        
        <TextField
          fullWidth
          label="Usuario"
          value={credentials.username}
          onChange={(e) => setCredentials({...credentials, username: e.target.value})}
          required
          disabled={loading}
          sx={{
            backgroundColor: colors.primary[400],
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: colors.grey[100],
              },
            },
            '& .MuiInputLabel-root': {
              color: colors.grey[100],
            },
            '& .MuiOutlinedInput-input': {
              color: colors.grey[100],
            },
          }}
        />
        
        <TextField
          fullWidth
          label="Contraseña"
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          required
          disabled={loading}
          sx={{
            backgroundColor: colors.primary[400],
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: colors.grey[100],
              },
            },
            '& .MuiInputLabel-root': {
              color: colors.grey[100],
            },
            '& .MuiOutlinedInput-input': {
              color: colors.grey[100],
            },
          }}
        />
        
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            '&:hover': {
              backgroundColor: colors.blueAccent[800],
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
