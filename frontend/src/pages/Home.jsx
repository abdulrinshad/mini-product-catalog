import React, { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../services/api';
import { useCart } from '../hooks/useCart';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import FilterBar from '../components/FilterBar';
import ProductGrid from '../components/ProductGrid';
import CartDrawer from '../components/CartDrawer';
import Footer from '../components/Footer';
import { Sparkles } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cart Hook Integration
  const { addItem, loadingItems, openCart, totalItemCount } = useCart();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('recommended');
  const [validationError, setValidationError] = useState(null);

  // Debounce search input by 400ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Check if any filter is currently applied
  const hasActiveFilters = Boolean(
    (search && search.trim() !== '') ||
    minPrice !== '' ||
    maxPrice !== '' ||
    (sort && sort !== 'recommended') ||
    (selectedCategory && selectedCategory !== '')
  );

  // Reset all filters to default state
  const handleResetFilters = useCallback(() => {
    setSelectedCategory('');
    setSearch('');
    setDebouncedSearch('');
    setMinPrice('');
    setMaxPrice('');
    setSort('recommended');
    setValidationError(null);
  }, []);

  // Fetch products calling GET /products with active query parameters
  const loadProducts = useCallback(async () => {
    // Validate min and max price values before calling API
    const minNum = minPrice !== '' ? Number(minPrice) : null;
    const maxNum = maxPrice !== '' ? Number(maxPrice) : null;

    if (minNum !== null && (isNaN(minNum) || minNum < 0)) {
      setValidationError('Minimum price must be a valid non-negative number.');
      return;
    }

    if (maxNum !== null && (isNaN(maxNum) || maxNum < 0)) {
      setValidationError('Maximum price must be a valid non-negative number.');
      return;
    }

    if (minNum !== null && maxNum !== null && minNum > maxNum) {
      setValidationError('Minimum price cannot be greater than maximum price.');
      return;
    }

    setValidationError(null);

    try {
      setLoading(true);
      setError(null);
      const data = await getProducts({
        category: selectedCategory,
        search: debouncedSearch,
        minPrice,
        maxPrice,
        sort,
      });
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch products:', err.message);
      setError(err.message || 'Unable to load products');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, debouncedSearch, minPrice, maxPrice, sort]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const scrollToShop = () => {
    const el = document.getElementById('shop');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategorySelect = (catId) => {
    setSelectedCategory((prev) => (prev === catId ? '' : catId));
    scrollToShop();
  };

  const getProductCountLabel = () => {
    if (products.length === 0) return 'No products';
    if (products.length === 1) return '1 product';
    return `${products.length} products`;
  };

  const categoryDisplayNames = {
    Audio: 'Audio Gear',
    Accessories: 'Accessories',
    Office: 'Office & Desk',
    Wearables: 'Wearables',
  };

  const getSectionTitle = () => {
    if (selectedCategory && categoryDisplayNames[selectedCategory]) {
      return `Explore ${categoryDisplayNames[selectedCategory]}`;
    }
    return 'Explore Our Products';
  };

  const getSectionSubtitle = () => {
    if (selectedCategory && categoryDisplayNames[selectedCategory]) {
      return `Showing curated products in ${categoryDisplayNames[selectedCategory]}.`;
    }
    return 'Premium tech essentials for work, entertainment and everyday life.';
  };

  const handleAddToCart = (product) => {
    if (product && product.id !== undefined) {
      addItem(product.id, 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#06110f] text-[#f5f7f4] font-sans flex flex-col justify-between">
      <div>
        {/* Top Utility Bar */}
        <TopBar />

        {/* Main Navbar */}
        <Navbar
          cartCount={totalItemCount}
          onCartClick={openCart}
          searchValue={search}
          onSearchChange={setSearch}
          onCategorySelect={handleCategorySelect}
        />

        {/* Hero Section */}
        <Hero onShopNowClick={scrollToShop} />

        {/* Category Section */}
        <CategorySection
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* Main Product Catalog Section */}
        <section id="shop" className="py-12 max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Product Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-[#19352d]/60 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-4 h-4 text-[#35d6b0]" />
                <span className="text-xs font-semibold tracking-wider text-[#35d6b0] uppercase">
                  CURATED COLLECTION
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#f5f7f4] tracking-tight">
                {getSectionTitle()}
              </h2>
              <p className="text-xs sm:text-sm text-[#a2b3ac] mt-1.5 max-w-xl">
                {getSectionSubtitle()}
              </p>
            </div>

            {!loading && !error && (
              <div className="text-xs font-semibold text-[#35d6b0] bg-[#102720] border border-[#19352d] px-3.5 py-1.5 rounded-full flex items-center gap-1.5 self-start sm:self-auto shadow-sm">
                <span>{getProductCountLabel()}</span>
              </div>
            )}
          </div>

          {/* Filter Bar */}
          <FilterBar
            search={search}
            onSearchChange={setSearch}
            minPrice={minPrice}
            onMinPriceChange={setMinPrice}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
            sort={sort}
            onSortChange={setSort}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
            validationError={validationError}
          />

          {/* Product Grid */}
          <ProductGrid
            products={products}
            loading={loading}
            error={error}
            onRetry={loadProducts}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
            onAddToCart={handleAddToCart}
            loadingItems={loadingItems}
          />
        </section>
      </div>

      {/* Cart Drawer */}
      <CartDrawer onContinueShopping={scrollToShop} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
