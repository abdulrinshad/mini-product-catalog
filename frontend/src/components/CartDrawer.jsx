import React from 'react';
import { useCart } from '../hooks/useCart';
import CartItem from './CartItem';
import { X, ShoppingBag, ArrowRight, RefreshCw, AlertTriangle, Loader2 } from 'lucide-react';

const CartDrawer = ({ onContinueShopping }) => {
  const { cart, loading, cartError, isCartOpen, closeCart, totalItemCount, fetchCart } = useCart();

  if (!isCartOpen) return null;

  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  const handleContinueShoppingClick = () => {
    closeCart();
    if (onContinueShopping) {
      onContinueShopping();
    }
  };

  const formatTotal = (val) => {
    if (typeof val !== 'number' || isNaN(val)) return '0';
    const hasDecimals = val % 1 !== 0;
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: hasDecimals ? 2 : 0,
    }).format(val);
  };

  const formattedTotal = formatTotal(cart.totalPrice);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Background Overlay */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-[#040b0a]/80 backdrop-blur-sm transition-opacity animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-0">
        {/* Drawer Container */}
        <div
          onClick={handleContainerClick}
          className="w-screen max-w-full sm:max-w-md sm:w-[420px] h-full bg-[#06110f] border-l border-[#19352d] shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out relative z-10"
        >
          {/* Drawer Header */}
          <div className="p-4 sm:p-6 border-b border-[#19352d] flex items-center justify-between bg-[#081713] shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#102720] border border-[#19352d] text-[#35d6b0] shrink-0">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#f5f7f4] tracking-tight">Your Cart</h3>
                <p className="text-xs text-[#71847c]">
                  {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeCart}
              aria-label="Close shopping cart"
              className="w-10 h-10 flex items-center justify-center rounded-xl text-[#71847c] hover:text-[#f5f7f4] hover:bg-[#102720] transition-colors focus:outline-none focus:ring-2 focus:ring-[#35d6b0] touch-target-44 shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body: Loading State / Error State / Empty State / Cart Items */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-3 sm:space-y-4">
            {/* 1. Loading State */}
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <Loader2 className="w-8 h-8 text-[#35d6b0] animate-spin mx-auto" />
                <p className="text-xs text-[#a2b3ac]">Loading your cart...</p>
              </div>
            ) : cartError ? (
              /* 2. Error State */
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 my-auto">
                <div className="w-14 h-14 rounded-2xl bg-[#ff7272]/15 border border-[#ff7272]/30 flex items-center justify-center text-[#ff7272] mx-auto">
                  <AlertTriangle className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-[#f5f7f4]">Unable to load your cart</h4>
                  <p className="text-xs text-[#a2b3ac] max-w-xs">
                    We encountered an issue fetching your cart. Please try again.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={fetchCart}
                  className="btn-teal text-xs py-2.5 px-5 mt-2 min-h-[44px]"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Try Again</span>
                </button>
              </div>
            ) : !cart.items || cart.items.length === 0 ? (
              /* 3. Empty State */
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 my-auto">
                <div className="w-16 h-16 rounded-2xl bg-[#0c1e19] border border-[#19352d] flex items-center justify-center text-[#35d6b0]">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base sm:text-lg font-bold text-[#f5f7f4]">Your cart is empty</h4>
                  <p className="text-xs text-[#a2b3ac] max-w-xs leading-relaxed">
                    Add products from the catalog to see them here.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleContinueShoppingClick}
                  className="btn-teal text-xs py-2.5 px-5 mt-3 min-h-[44px]"
                >
                  <span>Continue Shopping</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* 4. Cart Items List */
              cart.items.map((item) => (
                <CartItem key={item.productId} item={item} />
              ))
            )}
          </div>

          {/* Drawer Footer: Total & Actions */}
          {!loading && !cartError && cart.items && cart.items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-[#19352d] bg-[#081713] space-y-3.5 shrink-0">
              <div className="flex justify-between items-center text-base font-extrabold text-[#f5f7f4] pt-1">
                <span className="text-xs sm:text-sm font-bold text-[#f5f7f4]">Total</span>
                <span className="text-lg sm:text-xl font-extrabold text-[#35d6b0]">
                  ₹{formattedTotal}
                </span>
              </div>

              <button
                type="button"
                className="btn-teal w-full py-3.5 text-sm font-bold shadow-lg shadow-[#35d6b0]/20 min-h-[44px]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;

