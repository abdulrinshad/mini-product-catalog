import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getCart as apiGetCart,
  addToCart as apiAddToCart,
  updateCartItem as apiUpdateCartItem,
  removeFromCart as apiRemoveFromCart,
} from '../services/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(false);
  const [cartError, setCartError] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [loadingItems, setLoadingItems] = useState({});

  // Show Toast Notification
  const showToast = useCallback((message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
  }, []);

  // Hide Toast Notification
  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  // Handle 401 Unauthorized or Expired Session
  const handleAuthError = useCallback((err) => {
    const is401 = err.message && (
      err.message.includes('401') ||
      err.message.toLowerCase().includes('token') ||
      err.message.toLowerCase().includes('unauthorized') ||
      err.message.toLowerCase().includes('not logged in')
    );

    if (is401) {
      logout();
      setCart({ items: [], totalPrice: 0 });
      setIsCartOpen(false);
      showToast('Session expired. Please sign in again.', 'error');
      navigate('/login');
      return true;
    }
    return false;
  }, [logout, navigate, showToast]);

  // Fetch / Synchronize cart from API GET /cart
  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart({ items: [], totalPrice: 0 });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setCartError(null);
      const data = await apiGetCart();
      setCart(data && Array.isArray(data.items) ? data : { items: [], totalPrice: 0 });
    } catch (err) {
      console.error('Failed to fetch cart:', err.message);
      if (!handleAuthError(err)) {
        setCartError('Unable to load your cart');
      }
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, handleAuthError]);

  // React to changes in authentication state
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart({ items: [], totalPrice: 0 });
      setIsCartOpen(false);
      setLoading(false);
    }
  }, [isAuthenticated, fetchCart]);

  // Handle drawer body scroll locking & Escape key listener
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setIsCartOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isCartOpen]);

  // Drawer Controls
  const openCart = useCallback(() => {
    if (!isAuthenticated) {
      showToast('Please sign in to access your cart', 'info');
      navigate('/login');
      return;
    }
    setIsCartOpen(true);
  }, [isAuthenticated, navigate, showToast]);

  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => {
    if (!isAuthenticated) {
      showToast('Please sign in to access your cart', 'info');
      navigate('/login');
      return;
    }
    setIsCartOpen((prev) => !prev);
  }, [isAuthenticated, navigate, showToast]);

  // Add Item (POST /cart)
  const addItem = async (productId, quantity = 1) => {
    if (!isAuthenticated) {
      showToast('Please sign in to add items to your cart', 'info');
      navigate('/login');
      return;
    }

    if (loadingItems[productId]) return;

    try {
      setLoadingItems((prev) => ({ ...prev, [productId]: true }));
      await apiAddToCart(productId, quantity);
      const updatedCart = await apiGetCart();
      setCart(updatedCart && Array.isArray(updatedCart.items) ? updatedCart : { items: [], totalPrice: 0 });
      showToast('Added to cart', 'success');
      setIsCartOpen(true);
    } catch (err) {
      console.error('Add to cart error:', err.message);
      if (!handleAuthError(err)) {
        const userMessage = err.message && err.message.toLowerCase().includes('exceed')
          ? 'Maximum available stock reached.'
          : err.message || 'Unable to update cart';
        showToast(userMessage, 'error');
      }
    } finally {
      setLoadingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  // Update Item Quantity (PATCH /cart/:id)
  const updateItem = async (productId, quantity) => {
    if (!isAuthenticated) {
      showToast('Please sign in to modify your cart', 'info');
      navigate('/login');
      return;
    }

    if (loadingItems[productId]) return;
    if (quantity < 1) return; // Do not send 0 or negative quantities

    try {
      setLoadingItems((prev) => ({ ...prev, [productId]: true }));
      await apiUpdateCartItem(productId, quantity);
      const updatedCart = await apiGetCart();
      setCart(updatedCart && Array.isArray(updatedCart.items) ? updatedCart : { items: [], totalPrice: 0 });
      showToast('Cart updated', 'success');
    } catch (err) {
      console.error('Update cart item error:', err.message);
      if (!handleAuthError(err)) {
        const userMessage = err.message && err.message.toLowerCase().includes('exceed')
          ? 'Maximum available stock reached.'
          : err.message || 'Unable to update cart';
        showToast(userMessage, 'error');
      }
    } finally {
      setLoadingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  // Remove Item (DELETE /cart/:id)
  const removeItem = async (productId) => {
    if (!isAuthenticated) {
      showToast('Please sign in to modify your cart', 'info');
      navigate('/login');
      return;
    }

    if (loadingItems[productId]) return;

    try {
      setLoadingItems((prev) => ({ ...prev, [productId]: true }));
      await apiRemoveFromCart(productId);
      const updatedCart = await apiGetCart();
      setCart(updatedCart && Array.isArray(updatedCart.items) ? updatedCart : { items: [], totalPrice: 0 });
      showToast('Removed from cart', 'info');
    } catch (err) {
      console.error('Remove item error:', err.message);
      if (!handleAuthError(err)) {
        showToast(err.message || 'Unable to update cart', 'error');
      }
    } finally {
      setLoadingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  // Alias helper functions for backwards / flexible component compatibility
  const addToCart = addItem;
  const updateQuantity = updateItem;
  const removeFromCart = removeItem;

  // Total quantity of items in cart
  const totalItemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        cartError,
        loadingItems,
        isCartOpen,
        totalItemCount,
        openCart,
        closeCart,
        toggleCart,
        fetchCart,
        addItem,
        updateItem,
        removeItem,
        addToCart,
        updateQuantity,
        removeFromCart,
        toast,
        showToast,
        hideToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
