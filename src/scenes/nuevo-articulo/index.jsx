import { Box, Button, TextField, Select, MenuItem } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FormControl } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import { useArticulosStore } from "../../store/articulos";
import {useUnidadesStore} from '../../store/unidades';
import {useMensajesStore} from '../../store/mensajes';

const FormArticulo = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { articulos, agregarArticulo, modificarArticulo } = useArticulosStore();
  const {agregarError, agregarAcierto, esconderAcierto } = useMensajesStore();
  const {unidades} = useUnidadesStore();
  const navigate = useNavigate();

  const { id } = useParams();

  const articuloEditando = articulos.find(articulo => articulo.id === parseInt(id));

  const initialValues = articuloEditando || {
    articulo_descripcion: '',
    unidad: {id:0, unidad_descripcion: ''},
    precioUnitario: 0
  };

  const handleFormSubmit = async (values) => {
   
    try {
      if(values.articulo_descripcion.length === 0 || values.unidad.id === 0 || 
        values.unidad.id === undefined || values.precioUnitario === 0 || 
        values.precioUnitario === undefined || values.precioUnitario === '') {
        alert("No se pueden agregar artículos con campos vacíos")
        return;
      }

      if(articuloEditando){

        if(JSON.stringify(articuloEditando) === JSON.stringify(values)) {
          alert("No realizaste ninguna modificación")
          return;
        }
        
        const articuloAEnviarAlServidor = {
          descripcion: values.articulo_descripcion,
          idUnidad: values.unidad.id,
          precioUnitario: values.precioUnitario
        };

        await modificarArticulo(parseInt(id), articuloAEnviarAlServidor);
        navigate("/articulos");
        const idAciertoCreado = agregarAcierto("Se modificó el artículo correctamente");
        setTimeout(() => {
          //console.log("Escondiendo acierto")
          esconderAcierto(idAciertoCreado)
        }, 4000);

      } else {
  
        const articuloAEnviar = {
          idUnidad: values.unidad.id,
          descripcion: values.articulo_descripcion,
          precioUnitario: values.precioUnitario
        };

        await agregarArticulo(articuloAEnviar);
        navigate("/articulos");
        const idAciertoCreado = agregarAcierto("Se agregó el artículo correctamente");
        setTimeout(() => {
          //console.log("Escondiendo acierto")
          esconderAcierto(idAciertoCreado)
        }, 4000);
      }
    } catch (error) {
      navigate("/articulos")
      agregarError(error.message)
    }  
  }

  return (
    <Box m="20px">
      <Header title={articuloEditando ? "ACTUALIZAR ARTÍCULO" : "CREAR ARTÍCULO"} subtitle={articuloEditando ? "Actualiza el artículo con las nuevas propiedades" : "Crea un nuevo artículo con sus propiedades adecuadas"} />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
      >
        {({
          values,
          errors,
          touched,
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
                label="Descripción"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.articulo_descripcion}
                name="articulo_descripcion"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
              <InputLabel id="unidad-label">Unidad</InputLabel>
              <Select
                fullWidth
                variant="filled"
                label="Unidad"
                onBlur={handleBlur}
                onChange={(event) => {
                  //console.log(event.target.value)
                  const selectedUnidad = unidades.find(unidad => unidad.descripcion === event.target.value);
                  handleChange({
                    target: {
                      name: "unidad",
                      value: {id: selectedUnidad.idUnidad, unidad_descripcion: selectedUnidad.descripcion}
                    }
                  });
                }}
                value={values.unidad?.unidad_descripcion || ''}
                name="unidad"
                sx={{ gridColumn: "span 2" }}
              >
                {unidades.map((unidad) => (
                  <MenuItem key={unidad.idUnidad} value={unidad.descripcion}>{unidad.descripcion}</MenuItem>
                ))}
              </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Precio unitario"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.precioUnitario}
                name="precioUnitario"
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="start" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {
                  articuloEditando ? "Actualizar artículo" : "Crear nuevo artículo"
                }
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      {/* <MensajeError contenido={error} popUpAbrir={popUpAbrir} handleClose={hideError}/> */}
    </Box>
  );
};

export default FormArticulo;