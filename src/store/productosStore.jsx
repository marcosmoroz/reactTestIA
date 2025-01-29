import { create } from 'zustand';

export const useProductosStore = create((set) => ({
  productos: [],
  loading: false,
  obtenerProductos: async () => {
    set({ loading: true });
    try {
      // Simula una llamada a un servicio
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve([
          { id: 1, nombre: "Producto 1", descripcion: "Descripción del producto 1" },
          { id: 2, nombre: "Producto 2", descripcion: "Descripción del producto 2" },
        ]), 1000)
      );
      set({ productos: response, loading: false });
    } catch (error) {
      console.error("Error obteniendo productos:", error);
      set({ loading: false });
    }
  },
}));
