import { Box, Button, TextField, Typography, Select, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { FormControl } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import ArticulosPorProducto from '../../components/ArticulosPorProducto'
import { useArticulosStore } from "../../store/articulos";
import { useProductosStore } from "../../store/productos";
import { useCategoriasStore } from "../../store/categorias";
import CircularProgress from '@mui/material/CircularProgress';
import MensajeError from "../../components/MensajeError";
import Alert from '@mui/material/Alert';
import {useMensajesStore} from '../../store/mensajes';

const FormProducto = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { productos, obtenerProductos, agregarProducto, modificarProducto, modificarRelacion } = useProductosStore();
  const { articulos, obtenerArticulos, loading } = useArticulosStore();
  const { categorias, obtenerCategorias } = useCategoriasStore();
  const { agregarError, agregarAcierto, esconderAcierto } = useMensajesStore();
  const { id } = useParams();
  const [productoEditando, setProductoEditando] = useState({});
  const [initialValues, setInitialValues] = useState({})
  

  const [articulosSeleccionados, setArticulosSeleccionados] = useState([]);
  const [articulosConCantidad, setArticulosConCantidad] = useState([]);
  const precioUnitarioFinal = useMemo(() => {
    const articulosSeleccionadosConCantidad = articulosConCantidad.filter(articulo =>
      articulosSeleccionados?.includes(articulo.id)
    );
    return articulosSeleccionadosConCantidad.reduce((total, articulo) => {
      return total + (articulo.cantidad * articulo.precioUnitario);
    }, 0);
  }, [articulosConCantidad, articulosSeleccionados]);
  const cargaInicialConErroresSucedio = useRef(false);

  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    //console.log(cargaInicialConErroresSucedio)
    const fetchArticulos = async () => {
      try {
        await obtenerArticulos();
      } catch (error) {
        //console.log(error.message);
        if (!cargaInicialConErroresSucedio.current) {
          agregarError(error.message);
          cargaInicialConErroresSucedio.current = true;
        }
      }
    };

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
    // fetchArticulos();
    // fetchCategorias();
  }, []);

  useEffect(() => {
    const productoEditandoAux = productos.find(producto => producto.id === parseInt(id));
    console.log("productoEditandoAux",productoEditandoAux);
      setProductoEditando(productoEditandoAux);
      setInitialValues(productoEditandoAux ? productoEditandoAux : { descripcion: ''});
    if (id !== undefined) {
      const arrayIdsArticulosSeleccionados = productoEditando?.articulo?.map(articulo => articulo.id)
      const articulosCant = agregarCantidad(articulos, arrayIdsArticulosSeleccionados);
      setArticulosSeleccionados(arrayIdsArticulosSeleccionados);
      setArticulosConCantidad(articulosCant);
    } else {
      const articulosCant = agregarCantidad(articulos, []);
      setArticulosConCantidad(articulosCant);
    }
  }, [articulos, id, productos])

  // Función para agregar la columna de cantidad con la lógica especificada
  const agregarCantidad = (articulos, arrayAEvaluar) => {
    // Verifica si articulosSeleccionados ya ha sido instanciada
    if (arrayAEvaluar?.length > 0) {
      return articulos.map(articulo => {
        let cantidad = 0; // Por defecto, la cantidad es 0
        if (arrayAEvaluar.includes(articulo.id)) {
          const articuloDelProducto = productoEditando.articulo.find(art => art.id === parseInt(articulo.id))
          cantidad = articuloDelProducto.cantidad; // Si el ID del artículo está en articulosSeleccionados, la cantidad es 10
        }
        return {
          ...articulo,
          cantidad: cantidad
        };
      });
    } else {
      // Si articulosSeleccionados aún no ha sido instanciada, simplemente retorna los artículos sin modificar
      return articulos.map(articulo => {
        return {
          ...articulo,
          cantidad: 0
        }
      });
    }
  };

  const checkoutSchema = yup.object().shape({
    descripcion: yup.string().required("required")
  });

  const handleFormSubmit = async (values) => {

    if (!values.descripcion && articulosSeleccionados?.length === 0) {
      alert('El producto debe tener un nombre y se debe agregar al menos un artículo')
      return;
    }

    if (!values.descripcion) {
      alert('El producto debe tener un nombre')
      return;
    }

    if (articulosSeleccionados?.length === 0) {
      alert('Se debe agregar al menos un artículo')
      return;
    }

    try {
      if (productoEditando) {

        /*if(JSON.stringify(articuloEditando) === JSON.stringify(values)) {
          alert("No realizaste ninguna modificación")
          return;
        }*/

        const articulosSeleccionadosCompletos = articulosConCantidad.filter(articulo => articulosSeleccionados.includes(articulo.id));

        const tieneCantidadCero = articulosSeleccionadosCompletos.some(articulo => articulo.cantidad === 0);
        if(tieneCantidadCero){
          alert("No se pueden agregar productos con cantidad 0");
          return;
        }

        const productoAEnviar = {
          id_categoria: values.categoria.id,
          descripcion: values.descripcion
        }

        const relacionAEnviar = {
          id_producto: parseInt(id),
          articulos: articulosSeleccionadosCompletos.map(articulo => {
            return { id: articulo.id, cantidad: articulo.cantidad }
          })
        }

        // console.log("values", values);
        // console.log("productoAEnviar", productoAEnviar);
        // console.log("relacionAEnviar", relacionAEnviar);
        // return;

        await modificarProducto(parseInt(id), productoAEnviar);
        await modificarRelacion(relacionAEnviar);
        navigate("/productos");
        const idAciertoCreado = agregarAcierto("Se modificó el producto correctamente");
        setTimeout(() => {
          //console.log("Escondiendo acierto")
          esconderAcierto(idAciertoCreado)
        }, 4000);

      } else {

        const articulosSeleccionadosCompletos = articulosConCantidad.filter(articulo => articulosSeleccionados.includes(articulo.id));

        const tieneCantidadCero = articulosSeleccionadosCompletos.some(articulo => articulo.cantidad === 0);
        if(tieneCantidadCero){
          alert("No se pueden agregar articulos con cantidad 0 al producto");
          return;
        }

        const productoAEnviar = {
          idCategoria: values.categoria.id,
          descripcion: values.descripcion,
          articulos: articulosSeleccionadosCompletos.map(articulo => {
            return { id: articulo.id, cantidad: articulo.cantidad }
          })
        }

        await agregarProducto(productoAEnviar)
        navigate("/productos");
        const idAciertoCreado = agregarAcierto("Se agregó el producto correctamente");
        setTimeout(() => {
          //console.log("Escondiendo acierto")
          esconderAcierto(idAciertoCreado)
        }, 4000);
      }
    } catch (error) {
      navigate("/productos")
      agregarError(error.message)
    }

  };

  const handleSelection = (seleccion) => {
    const nuevosArticulosSeleccionados = seleccion.map(id => {
      // Encontrar el artículo con el ID actual en el array de artículos
      return articulos.find(articulo => articulo.id === parseInt(id));
    });

    setArticulosSeleccionados(nuevosArticulosSeleccionados)
  }

  const handleProcessRowUpdateError = (error) => {
    console.error(error)
  }

  return (
    <Box m="20px">
      <Header title={productoEditando ? "ACTUALIZAR PRODUCTO" : "CREAR PRODUCTO"} /*subtitle={productoEditando ? "Actualiza el producto con las nuevas propiedades" : "Crea un nuevo producto con sus propiedades adecuadas"}*/ />
      <Formik enableReinitialize onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                //span 4 siginifica que ocupa la linea entera
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nombre del producto"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.descripcion}
                name="descripcion"
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl  fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="categoria-label">Categoría</InputLabel>
                <Select
                  fullWidth
                  variant="filled"
                  label="Categoria"
                  onBlur={handleBlur}
                  onChange={(event) => {
                    const selectedCategoria = categorias.find(categoria => categoria.descripcion === event.target.value);
                    handleChange({
                      target: {
                        name: "categoria",
                        value: {id: selectedCategoria.idCategoria, descripcion: selectedCategoria.descripcion} // Aquí asignamos el objeto de categoría completo
                      }
                    });
                  }}
                  value={values.categoria?.descripcion || ''} // Asegurándonos de que el valor sea una cadena vacía si es `undefined`
                  name="categoria"
                  sx={{ gridColumn: "span 2" }}
                >
                  {
                    categorias.map((categoria) => (
                      <MenuItem key={categoria.idCategoria} value={categoria.descripcion}>{categoria.descripcion}</MenuItem>
                    ))
                  }
                </Select>

              </FormControl>
            </Box>
            <Box
              m="40px 0 0 0"
              
              sx={{
                paddingBottom: "5px",
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
              <Box display="flex" justifyContent="space-between" mt="20px" paddingBottom="10px">
                <Typography variant="h4" fontWeight="light" color={colors.greenAccent[500]} marginBottom="15px">
                  Agregá los artículos que componen a tu producto
                </Typography>

                <div>
                  <Typography variant="h4" fontWeight="light" color={colors.greenAccent[500]} marginBottom="15px">
                    Artículos agregados: {articulosSeleccionados?.length}
                  </Typography>
                </div>

              </Box>
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
                  <ArticulosPorProducto setArticulosConCantidad={setArticulosConCantidad} setArticulosSeleccionados={setArticulosSeleccionados}
                    articulosSeleccionados={articulosSeleccionados} articulosConCantidad={articulosConCantidad} />
                )
              }
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px" paddingBottom="10px">
              <Button type="submit" color="secondary" variant="contained">
                {
                  productoEditando ? "Actualizar producto" : "Crear nuevo producto"

                }
              </Button>
              <Typography variant="h4" fontWeight="bold" color={colors.greenAccent[500]} marginBottom="15px">
                Precio Unitario de tu producto: $ {precioUnitarioFinal.toFixed(2)}
              </Typography>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default FormProducto;