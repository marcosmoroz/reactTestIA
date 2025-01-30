import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return localStorage.getItem('token') ? children : null;
};

export default ProtectedRoute;