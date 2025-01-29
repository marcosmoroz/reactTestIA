import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';

export default function CheckboxList({productos, productosSeleccionados, setProductosSeleccionados, categoriasSeleccionadas, setCategoriasSeleccionadas}) {

  const handleCheck = (id) => {
    const estaSeleccionado = productosSeleccionados !== undefined ? productosSeleccionados.some(item => item.id === id) : false;
    
    if(estaSeleccionado){
      const nuevosProductosSeleccionados = productosSeleccionados.filter(prod => prod.id !== id);
      setProductosSeleccionados(nuevosProductosSeleccionados)

      const categoriasSeleccionadasActualizadas = nuevosProductosSeleccionados.map(prod => prod.categoria.descripcion);
      const categoriasSinDuplicados = [...new Set(categoriasSeleccionadasActualizadas)];
      setCategoriasSeleccionadas(categoriasSinDuplicados);
    } else {
      const productoSeleccionado = productos.find(producto => producto.id === id);
      const newProductosArray = [...productosSeleccionados, productoSeleccionado]
      setProductosSeleccionados(newProductosArray)

      const categoriasSeleccionadasActualizadas = [...new Set([...categoriasSeleccionadas, productoSeleccionado.categoria.descripcion])];
      setCategoriasSeleccionadas(categoriasSeleccionadasActualizadas);
    }
  }

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {productos.map((producto) => {
        const labelId = `checkbox-list-label-${producto.id}`;

        return (
          <ListItem
            key={producto.id}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} dense>
              <ListItemIcon>
                <Checkbox 
                  onClick={() =>{
                    handleCheck(producto.id)
                  }}
                  edge="start"
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  color="secondary"
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={producto.descripcion} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}