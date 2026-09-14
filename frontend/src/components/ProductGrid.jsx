import React from 'react';
import ProductCard from './ProductCard';
import LoadingSkeleton from './LoadingSkeleton';
import { PackageSearch, AlertTriangle, RefreshCw, RotateCcw } from 'lucide-react';

const ProductGrid = ({
  products,
  loading,
  error,
  onRetry,
  onResetFilters,
  hasActiveFilters,
  onAddToCart,
  loadingItems = {},
}) => {
  // 1. Loading state
  if (loading) {
    return <LoadingSkeleton count={8} />;
  }

  // 2. Error state
  if (error) {
    return (
      <div className="surface-card p-8 sm:p-12 text-center max-w-md mx-auto my-8 space-y-4 border-[#ff7272]/30 shadow-lg">
        <div className="w-14 h-14 rounded-2xl bg-[#ff7272]/15 border border-[#ff7272]/30 flex items-center justify-center text-[#ff7272] mx-auto">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <div className="space-y-1.5">
          <h3 className="text-xl font-bold text-[#f5f7f4]">Unable to load products</h3>
          <p className="text-sm text-[#a2b3ac]">
            Please check your connection and try again.
          </p>
        </div>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="btn-teal text-xs py-2.5 px-5 mt-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    );
  }

  // 3. Empty state
  if (!products || products.length === 0) {
    return (
      <div className="surface-card p-8 sm:p-12 text-center max-w-md mx-auto my-8 space-y-4 shadow-lg">
        <div className="w-14 h-14 rounded-2xl bg-[#102720] border border-[#19352d] flex items-center justify-center text-[#35d6b0] mx-auto">
          <PackageSearch className="w-7 h-7" />
        </div>
        <div className="space-y-1.5">
          <h3 className="text-xl font-bold text-[#f5f7f4]">No products found</h3>
          <p className="text-sm text-[#a2b3ac]">
            Try adjusting your search or price filters.
          </p>
        </div>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="btn-teal text-xs py-2.5 px-5 mt-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>
    );
  }

  // 4. Product Grid Layout
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
      {products.map((product) => {
        const prodId = product.id !== undefined ? product.id : product._id;
        return (
          <ProductCard
            key={prodId}
            product={product}
            onAddToCart={onAddToCart}
            isAdding={Boolean(loadingItems[prodId])}
          />
        );
      })}
    </div>
  );
};

export default ProductGrid;
