import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import CheckboxList from "../../components/CheckboxList";
import { useContext, useEffect, useState } from "react";
import TableListadoProductos from "../../components/TableListadoProductos";
import {Button} from "@mui/material";
import useCostos from "../../custom-hooks/useCostos";
import { useProductosStore } from "../../store/productos";
import { useCategoriasStore } from "../../store/categorias";
import MensajeError from "../../components/MensajeError";
import {useMensajesStore} from '../../store/mensajes';

const CategoriaAcordion = ({nombreCategoria, productos, productosSeleccionados, setProductosSeleccionados,categoriasSeleccionadas, setCategoriasSeleccionadas }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Accordion sx={{ minWidth: '300px' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography color={colors.greenAccent[500]} variant="h5">
        {nombreCategoria}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <CheckboxList productos={productos} productosSeleccionados={productosSeleccionados} 
        setProductosSeleccionados={setProductosSeleccionados} 
        categoriasSeleccionadas={categoriasSeleccionadas} setCategoriasSeleccionadas={setCategoriasSeleccionadas}/>
      </AccordionDetails>
    </Accordion>
  )
}

const ComputoPersonalizado = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { productos, obtenerProductos } = useProductosStore();
  const {errores, agregarError, esconderError } = useMensajesStore();
  const { categorias, obtenerCategorias } = useCategoriasStore();
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const { 
    costoMateriales, 
    setCostoMateriales, 
    costoManoObra, 
    setCostoManoObra, 
    costoTotal, 
    calcularCostoTotal 
  } = useCostos();

  const [value, setValue] = useState(0);

  useEffect(() => {
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

   
    fetchProductos();
    fetchCategorias();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    calcularCostoTotal();
  }, [costoManoObra, costoMateriales])

  return (
    <Box sx={{display: 'flex', justifyContent:'space-between'}}>
      <Box m="20px" sx={{ minWidth:'400px', overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }}>
        <Header title="Cómputo personalizado" subtitle="A continuación se muestran las etapas de obra" />
        {
          categorias.map(categoria => {
            const productosConDichaCategoria = productos.filter(producto => producto.categoria.descripcion === categoria.descripcion);
            return (
              <CategoriaAcordion key={categoria.id} 
              nombreCategoria={categoria.descripcion} productos={productosConDichaCategoria} 
              productosSeleccionados={productosSeleccionados} setProductosSeleccionados={setProductosSeleccionados} 
              categoriasSeleccionadas={categoriasSeleccionadas} setCategoriasSeleccionadas={setCategoriasSeleccionadas}/>
            )
          })
        }
      </Box>
      <div style={{width: '100%', overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }}>
      
      <Box 
         display="flex"
         justifyContent="end"
         sx={{padding: "20px"}}
        >
          <Button
              sx={{
                border: `2px solid ${colors.blueAccent[700]}`,
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                "&:hover": {
                  backgroundColor: colors.grey[100], 
                  color: colors.blueAccent[700] 
                }
              }}
            >
              Ver listado de materiales
          </Button>
        </Box>
        

        <TableListadoProductos 
          productos={productosSeleccionados} 
          categoriasSeleccionadas={categoriasSeleccionadas}
          costoMateriales={costoMateriales} 
          setCostoMateriales={setCostoMateriales}
          costoManoObra={costoManoObra}
          setCostoManoObra={setCostoManoObra} 
          costoTotal={costoTotal} 
          calcularCostoTotal={calcularCostoTotal}
          />   

        <Box 
         display="flex"
         flexDirection="column"
         alignItems="end"
         sx={{
          marginTop:"32px",
          padding: "10px", 
          background: `${colors.blueAccent[600]}`,
          maxWidth: '95%'
        }}
        >
          <Typography sx={{fontSize:"22px"}} >Costo de Materiales $ {costoMateriales.toFixed(2)}</Typography>
          <Typography sx={{fontSize:"22px"}}>Costo de Mano de obra $ {costoManoObra.toFixed(2)}</Typography>
          <Typography sx={{fontSize:"22px", fontWeight: 'bold'}} >Costo Total $ {costoTotal.toFixed(2)}</Typography>
        </Box>  
        {
        errores.filter(error => error.visible).map((e, index) => (
          <MensajeError key={index} error={e} popUpAbrir={e.visible} handleClose={esconderError}/>
        ))
      }   
      </div>
    </Box>
  );
};

export default ComputoPersonalizado;