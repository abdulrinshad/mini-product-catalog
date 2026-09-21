import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './hooks/useCart';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPage from './pages/AdminPage';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import Toast from './components/Toast';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminPage />
                </ProtectedAdminRoute>
              }
            />
          </Routes>
          <Toast />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

