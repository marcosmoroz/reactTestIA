import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCategoriasStore } from "../../store/categorias";
import {useMensajesStore} from '../../store/mensajes';

const FormCategoria = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { categorias, agregarCategoria, modificarCategoria } = useCategoriasStore();
  const { agregarError, agregarAcierto, esconderAcierto } = useMensajesStore();
  const navigate = useNavigate();

  const checkoutSchema = yup.object().shape({
    descripcion: yup.string().required("required")
  });
  const { id } = useParams();

  const categoriaEditando = categorias.find(categoria => categoria.idCategoria === parseInt(id));

  const initialValues = categoriaEditando || {
   descripcion: ''
  };

  const handleFormSubmit = async (values) => {

    if(values.descripcion.length > 30){
      alert("No se puede agregar una categpría con más de 30 caracteres");
      return;
    }
    
    try {
      if(categoriaEditando){

        const categoriaAEnviarAlServidor = values.descripcion;
        await modificarCategoria(parseInt(id), categoriaAEnviarAlServidor);
        navigate("/categorias");
        const idAciertoCreado = agregarAcierto("Se modificó la categoría correctamente");
        setTimeout(() => {
          //console.log("Escondiendo acierto")
          esconderAcierto(idAciertoCreado)
        }, 4000);

      } else {
        const categoriaAEnviarAlServidor = values.descripcion;
        await agregarCategoria(categoriaAEnviarAlServidor);
        navigate("/categorias");
        const idAciertoCreado = agregarAcierto("Se agregó la categoría correctamente");
        setTimeout(() => {
          //console.log("Escondiendo acierto")
          esconderAcierto(idAciertoCreado)
        }, 4000);
      
      }
    } catch(error) {
      navigate("/categorias")
      agregarError(error.message)
    }
    
  };

  return (
    <Box m="20px">
      <Header title={categoriaEditando ? "ACTUALIZAR CATEGORÍA" : "CREAR CATEGORÍA"} subtitle={categoriaEditando ? "Actualiza la categoría con su nuevo nombre" : "Crea una nueva categoría con nombre adecuado"} />

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
                  categoriaEditando ? "Actualizar categoría" : "Crear nueva categoría"
                  
                }
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default FormCategoria;