import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getCart as apiGetCart,
  addToCart as apiAddToCart,
  updateCartItem as apiUpdateCartItem,
  removeFromCart as apiRemoveFromCart,
} from '../services/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(true);
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

  // Fetch / Synchronize cart from API GET /cart
  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      setCartError(null);
      const data = await apiGetCart();
      setCart(data && Array.isArray(data.items) ? data : { items: [], totalPrice: 0 });
    } catch (err) {
      console.error('Failed to fetch cart:', err.message);
      setCartError('Unable to load your cart');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial cart fetch on application mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

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
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  // Add Item (POST /cart)
  const addItem = async (productId, quantity = 1) => {
    if (loadingItems[productId]) return;
    try {
      setLoadingItems((prev) => ({ ...prev, [productId]: true }));
      await apiAddToCart(productId, quantity);
      const updatedCart = await apiGetCart();
      setCart(updatedCart && Array.isArray(updatedCart.items) ? updatedCart : { items: [], totalPrice: 0 });
      showToast('Added to cart', 'success');
      openCart();
    } catch (err) {
      console.error('Add to cart error:', err.message);
      const userMessage = err.message && err.message.toLowerCase().includes('exceed')
        ? 'Maximum available stock reached.'
        : err.message || 'Unable to update cart';
      showToast(userMessage, 'error');
    } finally {
      setLoadingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  // Update Item Quantity (PATCH /cart/:id)
  const updateItem = async (productId, quantity) => {
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
      const userMessage = err.message && err.message.toLowerCase().includes('exceed')
        ? 'Maximum available stock reached.'
        : err.message || 'Unable to update cart';
      showToast(userMessage, 'error');
    } finally {
      setLoadingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  // Remove Item (DELETE /cart/:id)
  const removeItem = async (productId) => {
    if (loadingItems[productId]) return;
    try {
      setLoadingItems((prev) => ({ ...prev, [productId]: true }));
      await apiRemoveFromCart(productId);
      const updatedCart = await apiGetCart();
      setCart(updatedCart && Array.isArray(updatedCart.items) ? updatedCart : { items: [], totalPrice: 0 });
      showToast('Removed from cart', 'info');
    } catch (err) {
      console.error('Remove item error:', err.message);
      showToast(err.message || 'Unable to update cart', 'error');
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
