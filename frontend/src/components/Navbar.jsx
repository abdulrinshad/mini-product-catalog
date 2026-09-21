import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Search, User, Heart, Menu, X, Cpu, LogOut, LogIn, UserPlus, ChevronDown } from 'lucide-react';

const Navbar = ({
  cartCount,
  onCartClick,
  onSearchChange = () => {},
  searchValue = '',
  onCategorySelect = () => {},
}) => {
  const { totalItemCount: contextItemCount, openCart: contextOpenCart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const itemCount = cartCount !== undefined ? cartCount : contextItemCount;
  const handleCartClick = onCartClick || contextOpenCart;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Shop', href: '/#shop' },
    { name: 'Categories', href: '/#categories' },
  ];

  // Close user dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchInputChange = (val) => {
    onSearchChange(val);
    if (val.trim()) {
      const shopEl = document.getElementById('shop');
      if (shopEl) {
        shopEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#06110f]/90 backdrop-blur-md border-b border-[#19352d]/80 transition-all w-full">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3 md:gap-8">
        {/* Left: TECHORA Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0 py-1">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#102720] to-[#0c1e19] border border-[#19352d] flex items-center justify-center shadow-lg group-hover:border-[#35d6b0]/50 transition-all">
            <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-[#35d6b0] group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-extrabold tracking-wider text-[#f5f7f4] font-sans leading-none">
              TECH<span className="text-[#35d6b0]">ORA</span>
            </span>
            <span className="text-[8px] sm:text-[9px] font-semibold tracking-widest text-[#dfff72] uppercase mt-0.5">
              PREMIUM TECH
            </span>
          </div>
        </Link>

        {/* Center: Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#a2b3ac]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-[#35d6b0] transition-colors relative py-2"
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
            className="custom-input w-full pl-10 pr-9 text-xs py-2.5"
          />
          {searchValue && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-[#71847c] hover:text-[#f5f7f4] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right: Actions (Wishlist, Account / Auth, Cart, Mobile Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="hidden sm:flex w-11 h-11 items-center justify-center rounded-xl border border-[#19352d] bg-[#0c1e19] text-[#a2b3ac] hover:text-[#35d6b0] hover:border-[#35d6b0]/40 transition-all touch-target-44"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4" />
          </button>

          {/* User Account / Auth Control */}
          <div className="relative" ref={userMenuRef}>
            {isAuthenticated && user ? (
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#35d6b0]/30 bg-[#102720] text-[#f5f7f4] hover:bg-[#143129] hover:border-[#35d6b0]/60 transition-all shadow-md touch-target-44"
                aria-label="User Account Menu"
                aria-expanded={isUserMenuOpen}
              >
                <div className="w-6 h-6 rounded-full bg-[#35d6b0]/20 border border-[#35d6b0]/40 text-[#35d6b0] flex items-center justify-center font-bold text-xs">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="hidden sm:inline-block text-xs font-semibold max-w-[100px] truncate">
                  {user.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#a2b3ac]" />
              </button>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#19352d] bg-[#0c1e19] text-xs font-semibold text-[#35d6b0] hover:border-[#35d6b0]/50 hover:bg-[#102720] transition-all touch-target-44"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            )}

            {/* User Dropdown Menu */}
            {isUserMenuOpen && isAuthenticated && user && (
              <div className="absolute right-0 mt-2 w-56 bg-[#091a15] border border-[#19352d] rounded-xl shadow-2xl py-2 z-50 animate-fadeIn">
                <div className="px-4 py-3 border-b border-[#19352d]/60">
                  <p className="text-xs font-bold text-[#f5f7f4] truncate">{user.name}</p>
                  <p className="text-[11px] text-[#71847c] truncate mt-0.5">{user.email}</p>
                </div>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-[#ff808b] hover:bg-[#2a1317]/60 flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cart Icon with Quantity Badge */}
          <button
            type="button"
            onClick={handleCartClick}
            className="relative w-11 h-11 rounded-xl border border-[#35d6b0]/30 bg-[#102720] text-[#35d6b0] hover:bg-[#143129] hover:border-[#35d6b0]/60 transition-all shadow-md flex items-center justify-center touch-target-44"
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
            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl border border-[#19352d] bg-[#0c1e19] text-[#a2b3ac] hover:text-[#f5f7f4] touch-target-44"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 sm:px-6 pb-3 pt-1">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71847c] pointer-events-none" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => handleSearchInputChange(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="custom-input w-full pl-10 pr-9 text-xs py-2.5"
          />
          {searchValue && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#71847c] hover:text-[#f5f7f4] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Navigation Panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#19352d] bg-[#081713] px-4 sm:px-6 py-5 space-y-4 animate-fadeIn">
          {/* User Status Bar in Mobile Menu */}
          {isAuthenticated && user ? (
            <div className="p-3 rounded-xl bg-[#102720] border border-[#19352d] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#35d6b0]/20 border border-[#35d6b0]/40 text-[#35d6b0] flex items-center justify-center font-bold text-xs">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#f5f7f4]">{user.name}</p>
                  <p className="text-[10px] text-[#71847c]">{user.email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs font-semibold text-[#ff808b] hover:underline flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-[#19352d] bg-[#0c1e19] text-xs font-semibold text-[#35d6b0]"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-teal flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold rounded-xl"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register</span>
              </Link>
            </div>
          )}

          <nav className="flex flex-col space-y-1 font-medium text-[#a2b3ac]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 px-2 border-b border-[#19352d]/40 hover:text-[#35d6b0] text-base flex items-center min-h-[44px]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-3 flex items-center justify-between text-xs text-[#71847c]">
            <span>© 2026 TECHORA</span>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleCartClick();
              }}
              className="btn-teal text-xs py-2 px-4 min-h-[40px]"
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


