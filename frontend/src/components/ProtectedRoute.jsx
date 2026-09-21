import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2, Cpu } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#06110f] text-[#f5f7f4] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#102720] to-[#0c1e19] border border-[#19352d] flex items-center justify-center shadow-xl mb-4 animate-bounce">
          <Cpu className="w-6 h-6 text-[#35d6b0]" />
        </div>
        <div className="flex items-center gap-2 text-[#35d6b0] font-medium text-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Verifying authentication...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
