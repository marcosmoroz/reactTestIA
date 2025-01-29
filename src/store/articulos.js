import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance';

export const useArticulosStore = create((set) => ({
  articulos: [],
  loading: false,
  errorKey: 0,

  obtenerArticulos: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.get('/articulos/ObtenerArticulos');

      if (!response.data.resultado) {
        throw new Error(response.data.errores);
      }

      set({ articulos: response.data.datos, loading: false });
    } catch (error) {
      set({ loading: false, errorKey: Math.random() });
      console.error('Error al obtener artículos:', error.message);
    }
  },

  agregarArticulo: async (nuevoArticulo) => {
    try {
      const response = await axiosInstance.post('/articulos/AgregarArticulo', nuevoArticulo);

      if (!response.data.resultado) {
        throw new Error(response.data.errores);
      }
    } catch (error) {
      console.error('Error al agregar artículo:', error.message);
    }
  },

  modificarArticulo: async (id, articuloModificado) => {
    try {
      const response = await axiosInstance.put(`/articulos/ModificarArticulo/${id}`, articuloModificado);

      if (!response.data.resultado) {
        throw new Error(response.data.errores);
      }
    } catch (error) {
      console.error('Error al modificar artículo:', error.message);
    }
  },

  eliminarArticulo: async (id) => {
    try {
      const response = await axiosInstance.delete(`/articulos/EliminarArticulo/${id}`);

      if (!response.data.resultado) {
        throw new Error(response.data.errores);
      }
    } catch (error) {
      console.error('Error al eliminar artículo:', error.message);
    }
  },
}));
