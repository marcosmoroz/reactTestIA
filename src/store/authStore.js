import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (datos) => {
        localStorage.setItem("token", datos);
        set({ isAuthenticated: true });
      },
      logout: () => {
        localStorage.removeItem("token");
        set({ isAuthenticated: false, user: null });
      }
    }),
    {
      name: "auth-storage",
    }
  )
);