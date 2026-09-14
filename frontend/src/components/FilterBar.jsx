import React from 'react';
import { Search, SlidersHorizontal, RotateCcw, ArrowUpDown, AlertCircle } from 'lucide-react';

const categoriesList = [
  { id: 'Audio', name: 'Audio Gear' },
  { id: 'Accessories', name: 'Accessories' },
  { id: 'Office', name: 'Office & Desk' },
  { id: 'Wearables', name: 'Wearables' },
];

const FilterBar = ({
  search,
  onSearchChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  sort,
  onSortChange,
  selectedCategory = '',
  onCategorySelect,
  onResetFilters,
  hasActiveFilters,
  validationError,
}) => {
  return (
    <div className="surface-card p-4 sm:p-5 mb-8 border border-[#19352d] rounded-2xl w-full">
      {/* Category Pills Row */}
      <div className="flex items-center gap-2 mb-4 pb-3.5 border-b border-[#19352d]/60 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        <span className="text-xs text-[#a2b3ac] font-medium mr-1 shrink-0">Category:</span>
        <button
          type="button"
          onClick={() => onCategorySelect && onCategorySelect('')}
          className={`px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 min-h-[36px] flex items-center ${
            !selectedCategory
              ? 'bg-[#35d6b0] text-[#06110f] font-bold shadow-sm'
              : 'bg-[#102720] text-[#a2b3ac] border border-[#19352d] hover:text-[#f5f7f4] hover:border-[#35d6b0]/40'
          }`}
        >
          All Products
        </button>
        {categoriesList.map((cat) => {
          const isCatSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategorySelect && onCategorySelect(isCatSelected ? '' : cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 min-h-[36px] flex items-center ${
                isCatSelected
                  ? 'bg-[#35d6b0] text-[#06110f] font-bold shadow-sm'
                  : 'bg-[#102720] text-[#a2b3ac] border border-[#19352d] hover:text-[#f5f7f4] hover:border-[#35d6b0]/40'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="flex-1 relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71847c] pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="custom-input w-full pl-10 text-xs py-2.5 min-h-[44px]"
          />
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 text-xs w-full lg:w-auto">
          {/* Price Range Inputs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 text-[#35d6b0] font-medium shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="text-[#a2b3ac]">Price:</span>
            </div>

            <div className="grid grid-cols-2 sm:flex items-center gap-2 w-full sm:w-auto">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => onMinPriceChange(e.target.value)}
                placeholder="Min Price"
                aria-label="Minimum price"
                min="0"
                className="custom-input w-full sm:w-24 text-xs py-2 px-3 min-h-[44px]"
              />

              <div className="hidden sm:flex items-center justify-center">
                <span className="text-[#71847c] font-bold">-</span>
              </div>

              <input
                type="number"
                value={maxPrice}
                onChange={(e) => onMaxPriceChange(e.target.value)}
                placeholder="Max Price"
                aria-label="Maximum price"
                min="0"
                className="custom-input w-full sm:w-24 text-xs py-2 px-3 min-h-[44px]"
              />
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#35d6b0] shrink-0" />
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              aria-label="Sort products"
              className="custom-select w-full sm:w-auto text-xs py-2 px-3 cursor-pointer min-h-[44px]"
            >
              <option value="recommended">Recommended</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              aria-label="Clear all filters"
              className="btn-ghost-dark text-xs py-2 px-3 text-[#dfff72] hover:text-[#ffffff] flex items-center justify-center gap-1.5 w-full sm:w-auto min-h-[44px]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Price Range / Validation Error Message */}
      {validationError && (
        <div className="mt-3 pt-3 border-t border-[#ff7272]/20 flex items-center gap-2 text-xs text-[#ff7272] font-medium animate-fadeIn">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}
    </div>
  );
};

export default FilterBar;

