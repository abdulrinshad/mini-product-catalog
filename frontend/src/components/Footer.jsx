import React from 'react';
import { Cpu, ShieldCheck, Truck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#040b0a] border-t border-[#19352d] text-[#a2b3ac] pt-12 sm:pt-16 pb-6 sm:pb-8 w-full">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-[#19352d]/60">
          {/* Brand Col */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#102720] to-[#0c1e19] border border-[#19352d] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-[#35d6b0]" />
              </div>
              <span className="text-xl font-extrabold tracking-wider text-[#f5f7f4]">
                TECH<span className="text-[#35d6b0]">ORA</span>
              </span>
            </div>
            <p className="text-xs text-[#71847c] max-w-sm leading-relaxed">
              Premium technology designed for everyday life. Curated electronics, acoustic gear, and ergonomic workspace tech built for performance.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#35d6b0] pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Authentic
              </span>
              <span className="text-[#19352d]">•</span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" /> Express Delivery
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#f5f7f4] uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs text-[#71847c]">
              <li><a href="#home" className="hover:text-[#35d6b0] transition-colors py-1 inline-block">Home</a></li>
              <li><a href="#shop" className="hover:text-[#35d6b0] transition-colors py-1 inline-block">Shop All Products</a></li>
              <li><a href="#categories" className="hover:text-[#35d6b0] transition-colors py-1 inline-block">Featured Categories</a></li>
              <li><a href="#new" className="hover:text-[#35d6b0] transition-colors py-1 inline-block">New Arrivals</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#f5f7f4] uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2 text-xs text-[#71847c]">
              <li><a href="#categories" className="hover:text-[#35d6b0] transition-colors py-1 inline-block">Audio Gear</a></li>
              <li><a href="#categories" className="hover:text-[#35d6b0] transition-colors py-1 inline-block">Accessories</a></li>
              <li><a href="#categories" className="hover:text-[#35d6b0] transition-colors py-1 inline-block">Office & Ergonomics</a></li>
              <li><a href="#categories" className="hover:text-[#35d6b0] transition-colors py-1 inline-block">Wearables</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#f5f7f4] uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-xs text-[#71847c]">
              <li><a href="#support" className="hover:text-[#35d6b0] transition-colors py-1 inline-block">Customer Support</a></li>
              <li><a href="#returns" className="hover:text-[#35d6b0] transition-colors py-1 inline-block">7-Day Easy Returns</a></li>
              <li><a href="#privacy" className="hover:text-[#35d6b0] transition-colors py-1 inline-block">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-[#35d6b0] transition-colors py-1 inline-block">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#71847c] gap-4 text-center sm:text-left">
          <p>© 2026 TECHORA. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#35d6b0] cursor-pointer py-1">Security</span>
            <span className="hover:text-[#35d6b0] cursor-pointer py-1">Cookies</span>
            <span className="hover:text-[#35d6b0] cursor-pointer py-1">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

