import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../context/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'customer';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole = 'admin' }) => {
  const { isAuthenticated, user } = useAuthStore();

  // Not authenticated at all
  if (!isAuthenticated || !user) {
    return <Navigate to="/admin-login" replace />;
  }

  // Check role if required
  if (requiredRole === 'admin' && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

