import React from 'react';
import { CartProvider } from './hooks/useCart';
import Home from './pages/Home';
import Toast from './components/Toast';

function App() {
  return (
    <CartProvider>
      <Home />
      <Toast />
    </CartProvider>
  );
}

export default App;
