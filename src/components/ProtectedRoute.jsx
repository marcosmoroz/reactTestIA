// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated); // Para debugging
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default ProtectedRoute;