import { useEffect, useState } from 'react';
import { useArticulosStore } from "../store/articulos";

const useErrorHandlerArticulos = () => {
  const [popUpAbrir, setPopUpAbrir] = useState(false); // Nuevo estado para controlar el Dialog
  const { setError } = useArticulosStore();

  const showError = () => {
    setPopUpAbrir(true); // Abrir el Dialog cuando hay un error
  };

  const hideError = () => {
    setPopUpAbrir(false); 
    setError(null)// Cerrar el Dialog cuando se oculta el error
  };

  useEffect(() => {
    return () => {
      setPopUpAbrir(false); // Cerrar el Dialog cuando el componente se desmonte
    };
  }, []);

  return { showError, hideError, popUpAbrir }; // Devuelve el nuevo estado popUpEliminar
};

export default useErrorHandlerArticulos;
