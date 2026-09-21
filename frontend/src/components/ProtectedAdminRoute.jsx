import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2, Cpu } from 'lucide-react';

const ProtectedAdminRoute = ({ children }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ffffff] text-[#000000] flex flex-col items-center justify-center p-4">
        <div className="flex items-center gap-2 text-[#000000] font-medium text-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Verifying admin permissions...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
