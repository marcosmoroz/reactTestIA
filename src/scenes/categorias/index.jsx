import { Box, Typography, useTheme, Button, Toolbar } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useState, useRef, useEffect } from "react";
import { useCategoriasStore } from "../../store/categorias";
import CircularProgress from '@mui/material/CircularProgress';
import MensajeError from "../../components/MensajeError";
import Alert from '@mui/material/Alert';
import {useMensajesStore} from '../../store/mensajes';
import { propsDataGrid } from "../../local-string/index";

const Categorias = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [popUpEliminar, setPopUpEliminar] = useState(false)
  const [categoriaABorrar, setCategoriaABorrar] = useState(null)
  const { categorias, loading, obtenerCategorias, eliminarCategoria } = useCategoriasStore();
  const {errores, agregarError, esconderError, agregarAcierto, esconderAcierto, aciertos } = useMensajesStore();
  const cargaInicialConErroresSucedio = useRef(false);

  useEffect(() => {
    //console.log(cargaInicialConErroresSucedio)
    const fetchCategorias = async () => {
      try {
        await obtenerCategorias();
      } catch (error) {
        //console.log(error.message);
        if (!cargaInicialConErroresSucedio.current) {
          agregarError(error.message);
          cargaInicialConErroresSucedio.current = true;
        }
      }
    };

    fetchCategorias();
  }, []);

  //Se crea este array de columns para pasarle al dataGrid obtenido de mui
  const columns = [
    { field: "idCategoria", headerName: "ID", headerClassName: 'header-data-grid', cellClassName: "cell-data-grid" },
    {
      field: "descripcion",
      headerName: "Descripción",
      headerClassName: 'header-data-grid',
      cellClassName: "cell-data-grid",
      flex: 1
    },
    {
      field: "",
      headerClassName: 'header-data-grid',
      headerName: "Acción",
      headerAlign: "left",
      flex: 1,
      //access es la propiedad del objeto
      renderCell: ({ row: { idCategoria } }) => {
        return (
          <Box display="flex" justifyContent="space-between">
            <Button
              onClick={() => handleClickEditar(idCategoria)}
              sx={{
                cursor: "pointer",
                width: "calc(50% - 5px)",
                backgroundColor: colors.greenAccent[600],
                borderRadius: "4px"
              }}
            >
              <EditIcon sx={{ mr: 1 }} />
              Editar
            </Button>
            <Button
              onClick={() => handleClickBorrar(idCategoria)}
              sx={{
                cursor: "pointer",
                width: "calc(50% - 5px)",
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
    },
  ];

  const handleClose = () => {
    setPopUpEliminar(false);
  };

  const handleClick = () => {
    navigate("/nueva-categoria");
  }

  const handleBorrarDefinitivo = async () => {
    try {
      console.log(categoriaABorrar)
      await eliminarCategoria(categoriaABorrar.idCategoria);
      await obtenerCategorias();
      setPopUpEliminar(false);
      const idAciertoCreado = agregarAcierto("Se eliminó la cateogría correctamente");
      setTimeout(() => {
        //console.log("Escondiendo acierto")
        esconderAcierto(idAciertoCreado)
      }, 4000);
    } catch (error) {
      agregarError(error.message);
    }
  };

  const handleClickEditar = (id) => {
    navigate(`/nueva-categoria/${id}`);
  }

  const handleClickBorrar = (id) => {
    const cat = categorias.find(categoria => categoria.idCategoria === id)
    setCategoriaABorrar(cat)
    setPopUpEliminar(true);
  }

  function getRowId(row) {
    return row.idCategoria;
  }

  return (
    <>
      <Box m="20px">
        <Box
          display="flex"
          justifyContent="space-between"
        >
          <Typography sx={{ color: `${colors.greenAccent[600]}`, fontWeight: 'bold' }} variant="h2">Categorías</Typography>
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
            Agregar categoría
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
                getRowId={getRowId}
                slots={{
                  toolbar: () => (
                    <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between', padding: '8px', marginBottom: '10px', backgroundColor: `${colors.blueAccent[600]}` }} /*style={{ backgroundColor: `${colors.greenAccent[600]}`, padding: '8px', marginBottom: '8px' }}*/>
                      <div>
                        <GridToolbarFilterButton sx={{ fontSize: '16px', color: '#FFFFFF' }} />
                      </div>
                      <FilterAltIcon></FilterAltIcon>
                    </GridToolbarContainer>
                  )
                }}
                rows={categorias} columns={columns} />
            )
          }
        </Box>
      </Box>
      {/*DIALOG PARA BORRAR*/}
      <Dialog
        open={popUpEliminar}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Estás a punto de borrar esta categoría"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {
              categoriaABorrar?.descripcion
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
          <MensajeError key={index} error={e} popUpAbrir={e.visible} handleClose={esconderError} />
        ))
      }
    </>
  );
};

export default Categorias;