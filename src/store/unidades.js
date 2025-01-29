import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance';

export const useUnidadesStore = create((set) => ({
  unidades: [],
  loading: false,

  obtenerUnidades: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.get('/unidades/ObtenerUnidades');

      if (!response.data.resultado) {
        throw new Error(response.data.errores);
      }

      set({ unidades: response.data.datos, loading: false });
    } catch (error) {
      set({ loading: false });
      console.error('Error al obtener unidades:', error.message);
    }
  },

  agregarUnidad: async (nuevaUnidad) => {
    try {
      const response = await axiosInstance.post(
        `/unidades/AgregarUnidad`,
        null,
        {
          params: { descripcion: nuevaUnidad },
        }
      );

      if (!response.data.resultado) {
        throw new Error(response.data.errores);
      }
    } catch (error) {
      console.error('Error al agregar unidad:', error.message);
    }
  },

  modificarUnidad: async (id, nuevoNombreUnidad) => {
    try {
      const response = await axiosInstance.put(
        `/unidades/ModificarUnidad/${id}`,
        null,
        {
          params: { descripcion: nuevoNombreUnidad },
        }
      );

      if (!response.data.resultado) {
        throw new Error(response.data.errores);
      }
    } catch (error) {
      console.error('Error al modificar unidad:', error.message);
    }
  },

  eliminarUnidad: async (id) => {
    try {
      const response = await axiosInstance.delete(`/unidades/EliminarUnidad/${id}`);

      if (!response.data.resultado) {
        throw new Error(response.data.errores);
      }
    } catch (error) {
      console.error('Error al eliminar unidad:', error.message);
    }
  },
}));
