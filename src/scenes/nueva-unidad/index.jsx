import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useUnidadesStore } from "../../store/unidades";
import {useMensajesStore} from '../../store/mensajes';

const FormUnidad = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { unidades, agregarUnidad, modificarUnidad } = useUnidadesStore();
  const { agregarError, agregarAcierto, esconderAcierto } = useMensajesStore();
  const navigate = useNavigate();

  const checkoutSchema = yup.object().shape({
    descripcion: yup.string().required("required")
  });
  const { id } = useParams();

  const unidadEditando = unidades.find(unidad => unidad.idUnidad === parseInt(id));

  const initialValues = unidadEditando || {
   descripcion: ''
  };

  const handleFormSubmit = async (values) => {
    
    if(values.descripcion.length > 30){
      alert("No se puede agregar una unidad con más de 30 caracteres")
      return;
    }
  
    try {
      if(unidadEditando){
        await modificarUnidad(parseInt(id), values.descripcion);
        navigate("/unidades");
        const idAciertoCreado = agregarAcierto("Se modificó la unidad correctamente");
        setTimeout(() => {
          //console.log("Escondiendo acierto")
          esconderAcierto(idAciertoCreado)
        }, 4000);
      } else {
        await agregarUnidad(values.descripcion);
        navigate("/unidades");
        const idAciertoCreado = agregarAcierto("Se agregó la unidad correctamente");
        setTimeout(() => {
          //console.log("Escondiendo acierto")
          esconderAcierto(idAciertoCreado)
        }, 4000);
      }
    } catch(error) {
      navigate("/unidades")
      agregarError(error.message)
    }
    
  };

  return (
    <Box m="20px">
      <Header title={unidadEditando ? "ACTUALIZAR UNIDAD" : "CREAR UNIDAD"} subtitle={unidadEditando ? "Actualiza la unidad con su nuevo nombre" : "Crea una nueva unidad con nombre adecuado"} />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
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
                value={values.descripcion}
                name="descripcion"
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="start" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {
                  unidadEditando ? "Actualizar unidad" : "Crear nueva unidad"
                  
                }
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default FormUnidad;