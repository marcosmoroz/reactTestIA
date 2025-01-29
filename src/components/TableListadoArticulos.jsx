import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(id, material, un, precioUnitario) {
  return { id, material, un, precioUnitario };
}

export default function TableListadoArticulos({articulosSeleccionados}) {

    const rows = articulosSeleccionados.map((articulo) => 
        createData(
            articulo.id,
            articulo.articulo_descripcion,
            articulo.unidad.unidad_descripcion,
            articulo.precioUnitario
        )
    );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell align="right">Unidad</TableCell>
            <TableCell align="right">Precio Unitario</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.material}
              </TableCell>
              <TableCell align="right">{row.un}</TableCell>
              <TableCell align="right">$ {row.precioUnitario}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}