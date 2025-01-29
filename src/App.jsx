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

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const cargaInicialConErroresSucedio = useRef(false);
  const { obtenerArticulos } = useArticulosStore();
  const { obtenerProductos } = useProductosStore();
  const { obtenerCategorias } = useCategoriasStore();
  const { obtenerUnidades } = useUnidadesStore();

  const location = useLocation();

  const fetchArticulos = async () => {
    try {
      await obtenerArticulos();
    } catch (error) {
      if (!cargaInicialConErroresSucedio.current) {
        agregarError(error.message);
        cargaInicialConErroresSucedio.current = true;
      }
    }
  };

  const fetchProductos = async () => {
    try {
      await obtenerProductos();
    } catch (error) {
      if (!cargaInicialConErroresSucedio.current) {
        agregarError(error.message);
        cargaInicialConErroresSucedio.current = true;
      }
    }
  };

  const fetchUnidades = async () => {
    try {
      await obtenerUnidades();
    } catch (error) {
      if (!cargaInicialConErroresSucedio.current) {
        agregarError(error.message);
        cargaInicialConErroresSucedio.current = true;
      }
    }
  };

  const fetchCategorias = async () => {
    try {
      await obtenerCategorias();
    } catch (error) {
      if (!cargaInicialConErroresSucedio.current) {
        agregarError(error.message);
        cargaInicialConErroresSucedio.current = true;
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchArticulos(), fetchProductos(), fetchUnidades(), fetchCategorias()]);
      } catch (error) {
        agregarError(error.message);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // Componente de rutas protegidas
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // Componente que envuelve el layout principal
  const MainLayout = ({ children }) => (
    <div className="app">
      <Sidebar isSidebar={isSidebar} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className={`content ${isCollapsed ? 'sidebar-closed' : 'sidebar-open'}`}>
        <Topbar setIsSidebar={setIsSidebar} />
        {children}
      </main>
    </div>
  );

  // No mostrar el layout en la página de login
  const shouldShowLayout = location.pathname !== '/login';

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {shouldShowLayout ? (
          <Routes>
            <Route path="/login" element={
              isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <Login onLogin={() => setIsAuthenticated(true)} />
            } />
            
            <Route path="/" element={
              isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <Navigate to="/login" replace />
            } />

            <Route path="/dashboard" element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/articulos" element={
              <ProtectedRoute>
                <MainLayout>
                  <Articulos />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/categorias" element={
              <ProtectedRoute>
                <MainLayout>
                  <Categorias />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/productos" element={
              <ProtectedRoute>
                <MainLayout>
                  <Productos />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/invoices" element={
              <ProtectedRoute>
                <MainLayout>
                  <Invoices />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/nuevo-articulo/:id?" element={
              <ProtectedRoute>
                <MainLayout>
                  <FormArticulo />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/nueva-categoria/:id?" element={
              <ProtectedRoute>
                <MainLayout>
                  <FormCategoria />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/nuevo-producto/:id?" element={
              <ProtectedRoute>
                <MainLayout>
                  <FormProducto />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/computo-personalizado" element={
              <ProtectedRoute>
                <MainLayout>
                  <ComputoPersonalizado />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/unidades" element={
              <ProtectedRoute>
                <MainLayout>
                  <Unidades />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/nueva-unidad/:id?" element={
              <ProtectedRoute>
                <MainLayout>
                  <FormUnidad />
                </MainLayout>
              </ProtectedRoute>
            } />
          </Routes>
        ) : (
          <Routes>
            <Route path="/login" element={
              <Login onLogin={() => setIsAuthenticated(true)} />
            } />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;