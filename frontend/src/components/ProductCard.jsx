import React, { useState } from 'react';
import { ShoppingCart, Heart, CheckCircle2, AlertTriangle, XCircle, Package } from 'lucide-react';

/**
 * Formats numeric price into Indian Rupees format.
 * Examples: 599 -> ₹599, 2499 -> ₹2,499, 4499.5 -> ₹4,499.50
 */
const formatPrice = (price) => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '₹0';
  }
  const hasDecimals = price % 1 !== 0;
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: hasDecimals ? 2 : 0,
  }).format(price);
  return `₹${formatted}`;
};

const ProductCard = ({ product, onAddToCart, isAdding = false }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Safe destructuring & fallbacks
  const {
    id,
    name = 'Unnamed Product',
    category = 'General',
    price = 0,
    image = '',
    stock = 0,
  } = product || {};

  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 5;
  const isInStock = stock > 5;

  const handleAddToCartClick = () => {
    if (isOutOfStock || isAdding) return;
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <article className="surface-card flex flex-col justify-between p-5 relative group transition-all duration-300 hover:-translate-y-1 hover:border-[#35d6b0]/40 hover:shadow-lg hover:shadow-[#35d6b0]/5">
      {/* Top Header: Stock Status Badge & Wishlist Button */}
      <div className="flex items-center justify-between gap-2 mb-3 z-10">
        <div>
          {isOutOfStock && (
            <span className="badge badge-out-of-stock">
              <XCircle className="w-3.5 h-3.5" />
              <span>OUT OF STOCK</span>
            </span>
          )}
          {isLowStock && (
            <span className="badge badge-low-stock">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>LOW STOCK</span>
            </span>
          )}
          {isInStock && (
            <span className="badge badge-in-stock">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>IN STOCK</span>
            </span>
          )}
        </div>

        {/* Wishlist Heart Icon (Visual Only) */}
        <button
          type="button"
          onClick={() => setIsLiked(!isLiked)}
          className={`p-2 rounded-xl border border-[#19352d] bg-[#081713] transition-colors focus:outline-none focus:ring-2 focus:ring-[#35d6b0] ${
            isLiked ? 'text-[#ff7272] border-[#ff7272]/40 bg-[#ff7272]/10' : 'text-[#71847c] hover:text-[#f5f7f4] hover:border-[#265246]'
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Image Container */}
      <div className="relative h-48 sm:h-52 w-full my-2 flex items-center justify-center overflow-hidden rounded-xl bg-[#081713] border border-[#19352d]/80 group-hover:border-[#35d6b0]/40 transition-all duration-300 p-4">
        {/* Subtle radial emerald background spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(53,214,176,0.12)_0%,_rgba(16,39,32,0.4)_50%,_transparent_70%)] pointer-events-none z-0" />
        <div className="absolute w-32 h-32 rounded-full bg-[#35d6b0]/10 blur-xl group-hover:bg-[#35d6b0]/20 transition-all duration-500 pointer-events-none z-0" />
        <div className="absolute w-44 h-44 rounded-full border border-[#35d6b0]/10 pointer-events-none z-0" />

        {!imageError && image ? (
          <img
            src={image}
            alt={name}
            onError={() => setImageError(true)}
            className="max-h-44 sm:max-h-48 max-w-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-[1.04] filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.45)] group-hover:drop-shadow-[0_14px_25px_rgba(53,214,176,0.15)]"
            loading="lazy"
          />
        ) : (
          /* Fallback image area if image fails or missing */
          <div className="flex flex-col items-center justify-center text-[#71847c] space-y-2 z-10">
            <Package className="w-10 h-10 text-[#35d6b0]/50" />
            <span className="text-xs text-[#a2b3ac]">Image unavailable</span>
          </div>
        )}
      </div>

      {/* Product Info Section */}
      <div className="mt-3 space-y-2 flex-grow flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-[#35d6b0] uppercase">
            {category}
          </span>

          <h3 className="text-base font-bold text-[#f5f7f4] line-clamp-2 mt-1 group-hover:text-[#35d6b0] transition-colors leading-snug">
            {name}
          </h3>
        </div>

        {/* Price & Action Button */}
        <div className="pt-3 border-t border-[#19352d]/60 flex items-center justify-between gap-2 mt-2">
          <div className="flex flex-col">
            <span className="text-[11px] text-[#71847c]">Price</span>
            <span className="text-lg sm:text-xl font-extrabold text-[#f5f7f4] tracking-tight">
              {formatPrice(price)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCartClick}
            disabled={isOutOfStock || isAdding}
            aria-disabled={isOutOfStock || isAdding}
            className={`btn-teal text-xs py-2.5 px-3.5 sm:px-4 transition-all duration-200 ${
              isOutOfStock || isAdding ? 'btn-disabled-dark' : 'group-hover:shadow-[#35d6b0]/30'
            }`}
          >
            <ShoppingCart className={`w-3.5 h-3.5 ${isAdding ? 'animate-spin' : ''}`} />
            <span>{isOutOfStock ? 'Out of Stock' : isAdding ? 'Adding...' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
