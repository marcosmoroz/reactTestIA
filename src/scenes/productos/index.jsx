import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useState, useRef, useEffect } from "react";
import ListadoArticulos from "../listado-articulos";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DialogTitle from '@mui/material/DialogTitle'
import { useArticulosStore } from "../../store/articulos";
import { useProductosStore } from "../../store/productos";
import CircularProgress from '@mui/material/CircularProgress';
import MensajeError from "../../components/MensajeError";
import Alert from '@mui/material/Alert';
import {useMensajesStore} from '../../store/mensajes';
import { propsDataGrid } from "../../local-string/index";

const Productos = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [abrirDialog, setAbrirDialog] = useState(false)

  const { articulos } = useArticulosStore();
  const { productos, loading, obtenerProductos, eliminarProducto } = useProductosStore();
  const cargaInicialConErroresSucedio = useRef(false);
  const [productoABorrar, setProductoABorrar] = useState(null)
  const [articulosDelProducto, setArticulosDelproducto] = useState([]);
  const {errores, agregarError, esconderError, agregarAcierto, esconderAcierto, aciertos } = useMensajesStore();

  const [popUpEliminar, setPopUpEliminar] = useState(false);

  useEffect(() => {
    //console.log(cargaInicialConErroresSucedio)
    const fetchProductos = async () => {
      try {
        await obtenerProductos();
      } catch (error) {
        //console.log(error.message);
        if (!cargaInicialConErroresSucedio.current) {
          agregarError(error.message);
          cargaInicialConErroresSucedio.current = true;
        }
      }
    };

    fetchProductos();
  }, []);

  const columns = [
    {
      field: "id", headerName: "ID", headerClassName: 'header-data-grid',
      cellClassName: "cell-data-grid", width: 100
    },
    {
      field: "descripcion",
      headerName: "Descripción",
      headerClassName: 'header-data-grid',
      cellClassName: "cell-data-grid",
      flex: 0.75
    },
    {
      field: "categoria",
      headerName: "Categoría",
      headerClassName: 'header-data-grid',
      cellClassName: "cell-data-grid",
      flex: 0.5,
      valueGetter: (params) => params.row.categoria?.descripcion || "Sin categoría"
    },
    {
      field: "precio_unitario",
      headerName: "Precio unitario",
      headerClassName: 'header-data-grid',
      cellClassName: "cell-data-grid",
      flex: 0.75
    },
    {
      field: "",
      headerName: "Acción",
      headerClassName: 'header-data-grid',
      headerAlign: "left",
      flex: 1,
      //access es la propiedad del objeto
      renderCell: ({ row: { id } }) => {
        return (
          <Box display="flex" justifyContent="space-between">
            <Button
              onClick={() => {
                handleClickVerListadoArticulos(id)
              }}
              sx={{
                cursor: "pointer",
                marginRight: "10px",
                width: 50,
                backgroundColor: colors.blueAccent[600],
                borderRadius: "4px"
              }}
            >
              <FormatListBulletedIcon sx={{ mr: 1 }} />
            </Button>
            <Button
              onClick={() => handleClickEditar(id)}
              sx={{
                cursor: "pointer",
                width: 100,
                backgroundColor: colors.greenAccent[600],
                borderRadius: "4px",
                marginRight: "10px"
              }}
            >
              <EditIcon sx={{ mr: 1 }} />
              Editar
            </Button>
            <Button
              onClick={() => handleClickBorrar(id)}
              sx={{
                cursor: "pointer",
                width: 100,
                backgroundColor: colors.redAccent[600],
                borderRadius: "4px"
              }}
            >
              <DeleteIcon sx={{ mr: 1 }} />
              Borrar
            </Button>
          </Box>

        );
      },
    }
  ];

  const handleClickVerListadoArticulos = (id) => {

    const producto = productos.find(producto => producto.id === parseInt(id));

    const articulosSeleccionadosIds = producto.articulo.map(articulo => articulo.id);

    const articulosSeleccionados = articulos.filter(articulo => articulosSeleccionadosIds.includes(articulo.id));
    setArticulosDelproducto(articulosSeleccionados)

    setAbrirDialog(true)

  }

  const handleClick = () => {
    navigate("/nuevo-producto");
  }

  const handleClickEditar = (id) => {
    navigate(`/nuevo-producto/${id}`);
  }

  const handleClose = () => {
    setPopUpEliminar(false);
  };

  const handleClickBorrar = (id) => {
    const prod = productos.find(prod => prod.id === id)
    setProductoABorrar(prod)
    setPopUpEliminar(true);
  }

  const handleBorrarDefinitivo = async () => {

    try {
      //console.log("HandleBorrar")
      await eliminarProducto(productoABorrar.id);
      await obtenerProductos();
      setPopUpEliminar(false);
      const idAciertoCreado = agregarAcierto("Se eliminó el artículo correctamente");
      setTimeout(() => {
        //console.log("Escondiendo acierto")
        esconderAcierto(idAciertoCreado)
      }, 4000);
    } catch (error) {
      agregarError(error.message);
    }
  };

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
      >
        <Typography sx={{ color: `${colors.greenAccent[600]}`, fontWeight: 'bold' }} variant="h2">Productos</Typography>
        <Button
          onClick={handleClick}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          Agregar producto
        </Button>
      </Box>
      {
        aciertos.filter(acierto => acierto.visible).map((a, index) => (
          <Box key={index} sx={{ marginTop: '15px' }}>
            <Alert variant="filled" severity="success" sx={{ color: "white", fontSize: '18px' }}>
              {a.mensaje}
            </Alert>
          </Box>
        ))
      }
      <Box
        m="20px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {loading &&
          <Box
            display="flex"
            justifyContent="center"
          >
            <CircularProgress color="secondary" />
          </Box>
        }
        {
          !loading && (
            <DataGrid
            localeText={propsDataGrid}
              rows={productos} columns={columns}
              slots={{
                toolbar: () => (
                  <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between', padding: '8px', marginBottom: '10px', backgroundColor: `${colors.blueAccent[600]}` }}>
                    <div>
                      <GridToolbarFilterButton sx={{ fontSize: '16px', color: '#FFFFFF' }} />
                    </div>
                    <FilterAltIcon></FilterAltIcon>
                  </GridToolbarContainer>
                )
              }}
            />
          )
        }

      </Box>
      <ListadoArticulos articulosSeleccionados={articulosDelProducto} open={abrirDialog} setOpen={setAbrirDialog} />

      <Dialog
        open={popUpEliminar}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Estás a punto de borrar este artículo"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {
              productoABorrar?.descripcion
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ backgroundColor: colors.blueAccent[600], color: '#ffffff' }} onClick={handleClose}>Cancelar</Button>
          <Button sx={{ backgroundColor: colors.redAccent[600], color: '#ffffff' }} onClick={handleBorrarDefinitivo} autoFocus>
            Borrar
          </Button>
        </DialogActions>
      </Dialog>
      {
        errores.filter(error => error.visible).map((e, index) => (
          <MensajeError key={index} error={e} popUpAbrir={e.visible} handleClose={esconderError}/>
        ))
      }
    </Box>
  );
};

export default Productos;