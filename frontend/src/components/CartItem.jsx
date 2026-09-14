import React from 'react';
import { useCart } from '../hooks/useCart';
import { Plus, Minus, Trash2, Loader2 } from 'lucide-react';

const CartItem = ({ item }) => {
  const { updateItem, removeItem, loadingItems } = useCart();
  const isItemLoading = Boolean(loadingItems[item.productId]);

  const isMinQuantity = item.quantity <= 1;
  const isMaxStock = item.quantity >= item.stock;

  const handleDecrease = () => {
    if (isItemLoading || isMinQuantity) return;
    updateItem(item.productId, item.quantity - 1);
  };

  const handleIncrease = () => {
    if (isItemLoading || isMaxStock) return;
    updateItem(item.productId, item.quantity + 1);
  };

  const handleRemove = () => {
    if (isItemLoading) return;
    removeItem(item.productId);
  };

  const formatPriceVal = (val) => {
    if (typeof val !== 'number' || isNaN(val)) return '0';
    const hasDecimals = val % 1 !== 0;
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: hasDecimals ? 2 : 0,
    }).format(val);
  };

  const priceDisplay = formatPriceVal(item.price);
  const subtotalDisplay = formatPriceVal(item.subtotal !== undefined ? item.subtotal : item.price * item.quantity);

  return (
    <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-[#19352d] bg-[#081713] hover:border-[#35d6b0]/30 transition-all relative">
      {/* Product Image Container */}
      <div className="w-16 h-16 rounded-lg bg-[#0c1e19] border border-[#19352d] p-1.5 flex items-center justify-center shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Item Info & Quantity Controls */}
      <div className="flex-1 min-w-0 space-y-1">
        <h4 className="text-xs font-bold text-[#f5f7f4] truncate leading-tight">{item.name}</h4>
        
        <div className="flex items-center gap-2 text-[11px] text-[#71847c]">
          <span>₹{priceDisplay}</span>
          {isMaxStock && (
            <span className="text-[10px] text-[#dfff72] font-semibold bg-[#102720] px-1.5 py-0.5 rounded border border-[#19352d]">
              Max Stock
            </span>
          )}
        </div>

        {/* Quantity Controls & Remove */}
        <div className="flex items-center gap-2 pt-1">
          <div className="flex items-center border border-[#19352d] bg-[#0c1e19] rounded-lg p-0.5">
            <button
              type="button"
              onClick={handleDecrease}
              disabled={isItemLoading || isMinQuantity}
              aria-label="Decrease quantity"
              className="p-1 text-[#71847c] hover:text-[#f5f7f4] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>

            <span className="px-2 text-xs font-extrabold text-[#f5f7f4] min-w-[20px] text-center">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={handleIncrease}
              disabled={isItemLoading || isMaxStock}
              aria-label="Increase quantity"
              className="p-1 text-[#71847c] hover:text-[#f5f7f4] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            disabled={isItemLoading}
            aria-label={`Remove ${item.name} from cart`}
            className="p-1.5 text-[#71847c] hover:text-[#ff7272] hover:bg-[#ff7272]/10 transition-colors rounded-lg disabled:opacity-30"
          >
            {isItemLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#35d6b0]" />
            ) : (
              <Trash2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Item Subtotal from Backend */}
      <div className="text-right shrink-0">
        <span className="text-[10px] text-[#71847c] block uppercase tracking-wider font-medium">Subtotal</span>
        <span className="text-sm font-extrabold text-[#35d6b0]">
          ₹{subtotalDisplay}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
