import { useEffect, useState, useRef } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Articulos from "./scenes/articulos";
import FormProducto from "./scenes/nuevo-producto";
import Invoices from "./scenes/invoices";
import Productos from "./scenes/productos";
import FormArticulo from "./scenes/nuevo-articulo";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import ComputoPersonalizado from "./scenes/computo-personalizado";
import Categorias from "./scenes/categorias";
import FormCategoria from "./scenes/nueva-categoria";
import Unidades from "./scenes/unidades";
import FormUnidad from "./scenes/nueva-unidad";
import { useArticulosStore } from "./store/articulos";
import { useProductosStore } from "./store/productos";
import { useCategoriasStore } from "./store/categorias";
import { useUnidadesStore } from "./store/unidades";
import Login from './components/Login';
import { useAuthStore } from "./store/authStore"; // Asegúrate de tener este store

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isAuthenticated } = useAuthStore(); // Ahora viene del store
  const cargaInicialConErroresSucedio = useRef(false);
  const { obtenerArticulos } = useArticulosStore();
  const { obtenerProductos } = useProductosStore();
  const { obtenerCategorias } = useCategoriasStore();
  const { obtenerUnidades } = useUnidadesStore();
  const location = useLocation();

  // Componente de layout principal
  const MainLayout = ({ children }) => (
    <div className="app">
      <Sidebar isSidebar={isSidebar} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className={`content ${isCollapsed ? 'sidebar-closed' : 'sidebar-open'}`}>
        <Topbar setIsSidebar={setIsSidebar} />
        {children}
      </main>
    </div>
  );

  const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuthStore();
    const location = useLocation();
  
    if (!isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    return <MainLayout>{children}</MainLayout>;
  };

// En App.jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      await Promise.all([
        obtenerArticulos(),
        obtenerProductos(),
        obtenerUnidades(),
        obtenerCategorias()
      ]);
    } catch (error) {
      console.error("Error inicial:", error);
    }
  };

  if (isAuthenticated) {
    fetchData();
  }
}, [isAuthenticated]); // Asegúrate de incluir todas las dependencias necesarias

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login />
            )
          } />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/articulos" element={<Articulos />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/nuevo-articulo/:id?" element={<FormArticulo />} />
            <Route path="/nueva-categoria/:id?" element={<FormCategoria />} />
            <Route path="/nuevo-producto/:id?" element={<FormProducto />} />
            <Route path="/computo-personalizado" element={<ComputoPersonalizado />} />
            <Route path="/unidades" element={<Unidades />} />
            <Route path="/nueva-unidad/:id?" element={<FormUnidad />} />
          </Route>

          {/* Redirecciones */}
          <Route path="/" element={
            isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <Navigate to="/login" replace />
          } />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;