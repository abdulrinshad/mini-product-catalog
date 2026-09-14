import React from 'react';
import { Truck, ShieldCheck, RotateCcw, HelpCircle } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="bg-[#040b0a] border-b border-[#19352d]/60 text-xs text-[#71847c] py-2 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        {/* Left Value Props */}
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-0.5">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Truck className="w-3.5 h-3.5 text-[#35d6b0]" />
            <span>Free shipping on orders over ₹999</span>
          </div>
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <ShieldCheck className="w-3.5 h-3.5 text-[#35d6b0]" />
            <span>Secure payments</span>
          </div>
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <RotateCcw className="w-3.5 h-3.5 text-[#35d6b0]" />
            <span>Easy 7-day returns</span>
          </div>
        </div>

        {/* Right Support Links */}
        <div className="hidden md:flex items-center gap-4 text-[#a2b3ac]">
          <a href="#support" className="hover:text-[#35d6b0] transition-colors">
            Support
          </a>
          <span className="text-[#19352d]">•</span>
          <a href="#track" className="hover:text-[#35d6b0] transition-colors">
            Track Order
          </a>
          <span className="text-[#19352d]">•</span>
          <a href="#help" className="hover:text-[#35d6b0] transition-colors flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-[#35d6b0]" /> Help
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
