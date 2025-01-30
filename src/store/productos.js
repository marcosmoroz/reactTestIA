import { create } from 'zustand';

export const useProductosStore = create((set) => ({
  productos: [],
  loading: false,
  obtenerProductos: async () => {
    set({ loading: true });
    try {
      // Obtener el token del localStorage o de tu store de autenticación
      const token = localStorage.getItem('token'); // O desde useAuthStore.getState().token
      
      const response = await fetch('http://localhost:8080/apigateway/v1/productos/ObtenerProductos/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Error en la petición');
      
      const data = await response.json();
      set({ productos: data });
    } catch (error) {
      console.error("Error al obtener productos:", error);
      throw error; // Propagar el error para manejo en componentes
    } finally {
      set({ loading: false });
    }
  },
}));