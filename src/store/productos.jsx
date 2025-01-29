import React, { useEffect } from 'react';
import { useProductosStore } from '../store/productosStore';
import { CircularProgress, Box, Typography } from '@mui/material';

const Productos = () => {
  const { productos, loading, obtenerProductos } = useProductosStore();

  useEffect(() => {
    obtenerProductos();
  }, []); // No es necesario incluir funciones del store en dependencias

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (productos.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6">No se encontraron productos.</Typography>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Productos
      </Typography>
      <Box>
        {productos.map((producto) => (
          <Box
            key={producto.id}
            p={2}
            mb={2}
            border="1px solid #ddd"
            borderRadius="4px"
            boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
          >
            <Typography variant="h6">{producto.nombre}</Typography>
            <Typography variant="body2">Descripción: {producto.descripcion}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Productos;
