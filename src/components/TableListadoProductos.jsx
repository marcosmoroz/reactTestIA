import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect, useMemo } from 'react';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import {Box} from '@mui/material';
import Typography from "@mui/material/Typography";
import { Input } from '@mui/base/Input';

function createData(id, descripcion, categoria, precio_unitario) {
    return { id, descripcion, categoria,  precio_unitario};
}

export default function TableListadoProductos(
    { 
        productos, 
        categoriasSeleccionadas,
        setCostoMateriales, 
        setCostoManoObra,
        calcularCostoTotal
    }
    ){
    const [categoriasAnteriores, setCategoriasAnteriores] = useState([]);
    const [valoresInput, setValoresInput] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const costoTotalMateriales = useMemo(() => {
        return valoresInput.reduce((total, valor) => {
            const producto = productos.find(producto => producto.id === valor.id);
            return total + ((producto ? producto.precio_unitario: 0) * valor.value);
        }, 0);
    }, [valoresInput, productos]);

    const costoTotalManoObra = useMemo(() => {
        return valoresInput.reduce((total, valor) => {
            const producto = productos.find(producto => producto.id === valor.id);
            return total + ( (producto ? producto.precio_unitario: 0) * valor.value);
        }, 0);
    }, [valoresInput, productos]);

    useEffect(() => {
        setCostoMateriales(costoTotalMateriales);
        setCostoManoObra(costoTotalManoObra);
    }, [costoTotalMateriales, costoTotalManoObra, setCostoMateriales, setCostoManoObra]);

    const rows = productos.map((producto) =>
        createData(
            producto.id,
            producto.descripcion,
            producto.categoria.descripcion,
            producto.precio_unitario,
            producto.precio_unitario
        )
    );

    const handleInputChange = (id, newValue) => {
        // Verificar si el id ya está presente en el array
        const index = valoresInput.findIndex(item => item.id === id);
        let costoTotalMateriales = 0;
        let costoTotalManoObra = 0;
    
        if (index !== -1) {
            // Si el id ya está presente, actualizar su valor
            setValoresInput(prevState => {
                const updatedArray = [...prevState];
                updatedArray[index] = { id, value: newValue };
                return updatedArray;
            });
        } else {
            // Si el id no está presente, agregar un nuevo objeto al array
            setValoresInput(prevState => [...prevState, { id, value: newValue }]);
        }
    };

    return (

        <TableContainer
            sx={{
                maxWidth: '95%', // Establece un ancho máximo para la tabla

            }}
            component={Paper}>
            <Table aria-label="simple table">
                    {
                        categoriasSeleccionadas.map((categoria) => (
                            <React.Fragment key={categoria}>
                                <TableHead sx={{background: colors.greenAccent[600]}}>
                                    <TableRow>
                                        <TableCell sx={{ minWidth: '190px', border: '1px solid white', fontWeight: 'bold', fontSize: '1.2rem' }}>{categoria}</TableCell>
                                        <TableCell sx={{border: '1px solid white'}}>Unidad</TableCell>
                                        <TableCell sx={{border: '1px solid white'}}>Cantidad</TableCell>
                                        <TableCell sx={{borderTop: '1px solid white', borderBottom: '1px solid white'}} display="flex">
                                            Materiales Unitario
                                        </TableCell >
                                        <TableCell sx={{borderRight: '1px solid white', borderTop: '1px solid white', borderBottom: '1px solid white'}} display="flex">
                                            Materiales Subtotal
                                        </TableCell >
                                        <TableCell sx={{borderTop: '1px solid white', borderBottom: '1px solid white'}} display="flex">
                                            Mano de obra Unitario
                                        </TableCell >
                                        <TableCell sx={{borderRight: '1px solid white', borderTop: '1px solid white', borderBottom: '1px solid white'}} display="flex">
                                            Mano de obra Subtotal
                                        </TableCell >
                                        <TableCell sx={{border: '1px solid white'}}>Subtotal</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {rows.map((row) => (
                                    row.categoria === categoria ? (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.descripcion}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                M²
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                <input 
                                                onChange={(e) => handleInputChange(row.id, e.target.value)}
                                                style={{border:"1px solid white", background: "transparent", color: 'white', width:"75px"}} 
                                                type="number" defaultValue="0" min="0"/>
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                $ {row.precio_unitario.toFixed(2)}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                $ { ((valoresInput.find(item => item.id === row.id)?.value || 0) * row.precio_unitario).toFixed(2)  }
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                $ {row.precio_unitario}
                                            </TableCell>
                                            <TableCell>$ {  ((valoresInput.find(item => item.id === row.id)?.value || 0) * row.precio_unitario).toFixed(2)  }</TableCell>
                                            <TableCell>$ {  (((valoresInput.find(item => item.id === row.id)?.value || 0) * row.precio_unitario)  +  (valoresInput.find(item => item.id === row.id)?.value || 0) * row.precio_unitario).toFixed(2)  }</TableCell>
                                        </TableRow>
                                    ) : null
                                ))}
                                </TableBody>
                            </React.Fragment>
                        ))}
            </Table>
        </TableContainer>
    );
}