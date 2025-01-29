import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance';

export const useCategoriasStore = create((set) => ({
  categorias: [],
  loading: false,

  obtenerCategorias: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.get('/categorias/ObtenerCategorias');

      if (!response.data.resultado) {
        throw new Error(response.data.errores);
      }

      set({ categorias: response.data.datos, loading: false });
    } catch (error) {
      set({ loading: false });
      console.error('Error al obtener categorías:', error.message);
    }
  },

  agregarCategoria: async (categoriaDescripcion) => {
    try {
      const response = await axiosInstance.post(
        `/categorias/AgregarCategoria`,
        null,
        {
          params: { descripcion: categoriaDescripcion },
        }
      );

      if (!response.data.resultado) {
        throw new Error(response.data.errores);
      }
    } catch (error) {
      console.error('Error al agregar categoría:', error.message);
    }
  },

  modificarCategoria: async (id, nuevoNombreCategoria) => {
    try {
      const response = await axiosInstance.put(
        `/categorias/ModificarCategoria/${id}`,
        null,
        {
          params: { descripcion: nuevoNombreCategoria },
        }
      );

      if (!response.data.resultado) {
        throw new Error(response.data.errores);
      }
    } catch (error) {
      console.error('Error al modificar categoría:', error.message);
    }
  },

  eliminarCategoria: async (id) => {
    try {
      const response = await axiosInstance.delete(`/categorias/EliminarCategoria/${id}`);

      if (!response.data.resultado) {
        throw new Error(response.data.errores);
      }
    } catch (error) {
      console.error('Error al eliminar categoría:', error.message);
    }
  },
}));
