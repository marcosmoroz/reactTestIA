import React, { createContext, useState, useEffect } from 'react';
import { mockDataProductos, mockDataCategorias, mockDataUnidades } from '../data/mockData';
import { getArticulos, getProductos, getCategorias, getUnidades} from '../api';

export const ElementosContext = createContext();

export const ElementosProvider = ({ children }) => {
  const [articulos, setArticulos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [unidades, setUnidades] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Para ejecutar en paralelo
        const [articulosResponse, productosResponse, categoriasResponse, unidadesResponse] = await Promise.all([
          getArticulos(),
          getProductos(),
          getCategorias(),
          getUnidades()
        ]);
        setArticulos(articulosResponse.datos);
        setProductos(productosResponse.datos);
        setCategorias(categoriasResponse.datos);
        setUnidades(unidadesResponse.datos)
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  /*const fetchArticulos = async () => {
    try {
      const response = await getArticulos(); // Debes implementar esta función para hacer la solicitud GET
      setArticulos(response.datos); // Actualizar el estado con los datos recibidos de la API
    } catch (error) {
      console.error('Error al obtener los artículos:', error);
      // Manejar cualquier error que ocurra al obtener los artículos
    }
  };

  const fetchProductos = async () => {
    try {
      const response = await getProductos(); 
      setProductos(response.datos); 
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await getCategorias(); 
      setCategorias(response.datos); 
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };*/

  //Lo que está dentro de value es lo que podemos acceder cuando llamamos al useContext(UsersContext)
  return (
    <ElementosContext.Provider value={{ articulos, setArticulos, productos, setProductos, categorias, setCategorias, unidades, setUnidades
     }}>
      {children}
    </ElementosContext.Provider>
  );
};

