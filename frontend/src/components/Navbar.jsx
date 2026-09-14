import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { ShoppingCart, Search, User, Heart, Menu, X, Cpu } from 'lucide-react';

const Navbar = ({
  cartCount,
  onCartClick,
  onSearchChange = () => {},
  searchValue = '',
  onCategorySelect = () => {},
}) => {
  const { totalItemCount: contextItemCount, openCart: contextOpenCart } = useCart();
  const itemCount = cartCount !== undefined ? cartCount : contextItemCount;
  const handleCartClick = onCartClick || contextOpenCart;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Shop', href: '#shop' },
    { name: 'Categories', href: '#categories' },
  ];

  const handleSearchInputChange = (val) => {
    onSearchChange(val);
    if (val.trim()) {
      const shopEl = document.getElementById('shop');
      if (shopEl) {
        shopEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#06110f]/85 backdrop-blur-md border-b border-[#19352d]/80 transition-all">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-4 md:gap-8">
        {/* Left: TECHORA Logo */}
        <a href="#home" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#102720] to-[#0c1e19] border border-[#19352d] flex items-center justify-center shadow-lg group-hover:border-[#35d6b0]/50 transition-all">
            <Cpu className="w-5 h-5 text-[#35d6b0] group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-wider text-[#f5f7f4] font-sans">
              TECH<span className="text-[#35d6b0]">ORA</span>
            </span>
            <span className="text-[9px] font-semibold tracking-widest text-[#dfff72] uppercase -mt-1">
              PREMIUM TECH
            </span>
          </div>
        </a>

        {/* Center: Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#a2b3ac]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-[#35d6b0] transition-colors relative py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Center: Search Field */}
        <div className="hidden md:flex flex-1 max-w-xs lg:max-w-md relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71847c] pointer-events-none" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => handleSearchInputChange(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="custom-input w-full pl-10 pr-8 text-xs py-2.5"
          />
          {searchValue && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71847c] hover:text-[#f5f7f4] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right: Actions (Wishlist, Account, Cart, Mobile Toggle) */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            type="button"
            className="hidden sm:flex p-2.5 rounded-xl border border-[#19352d] bg-[#0c1e19] text-[#a2b3ac] hover:text-[#35d6b0] hover:border-[#35d6b0]/40 transition-all"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4" />
          </button>

          <button
            type="button"
            className="hidden sm:flex p-2.5 rounded-xl border border-[#19352d] bg-[#0c1e19] text-[#a2b3ac] hover:text-[#35d6b0] hover:border-[#35d6b0]/40 transition-all"
            aria-label="User Account"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Cart Icon with Quantity Badge */}
          <button
            type="button"
            onClick={handleCartClick}
            className="relative p-2.5 rounded-xl border border-[#35d6b0]/30 bg-[#102720] text-[#35d6b0] hover:bg-[#143129] hover:border-[#35d6b0]/60 transition-all shadow-md flex items-center justify-center"
            aria-label="Open shopping cart"
          >
            <ShoppingCart className="w-4 h-4" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#dfff72] text-[#06110f] font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl border border-[#19352d] bg-[#0c1e19] text-[#a2b3ac] hover:text-[#f5f7f4]"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71847c] pointer-events-none" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => handleSearchInputChange(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="custom-input w-full pl-10 pr-8 text-xs py-2"
          />
          {searchValue && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71847c] hover:text-[#f5f7f4] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Navigation Panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#19352d] bg-[#081713] px-6 py-6 space-y-4 animate-fadeIn">
          <nav className="flex flex-col space-y-3 font-medium text-[#a2b3ac]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 border-b border-[#19352d]/40 hover:text-[#35d6b0] text-base"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-2 flex items-center justify-between text-xs text-[#71847c]">
            <span>© 2026 TECHORA</span>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleCartClick();
              }}
              className="btn-teal text-xs py-2 px-4"
            >
              Open Cart ({itemCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
