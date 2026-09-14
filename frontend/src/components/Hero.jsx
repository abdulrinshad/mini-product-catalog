import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Layers, Award } from 'lucide-react';

const Hero = ({ onShopNowClick }) => {
  return (
    <section id="home" className="relative overflow-hidden pt-6 sm:pt-10 pb-12 sm:pb-20 md:py-24 bg-gradient-to-b from-[#06110f] via-[#081713] to-[#06110f] border-b border-[#19352d]/60 w-full">
      {/* Ambient Radial Illumination Layer */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#35d6b0]/10 rounded-full blur-[100px] sm:blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-[#dfff72]/5 rounded-full blur-[90px] sm:blur-[120px]" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Subheading, CTAs, Stats */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-8 text-left">
            {/* Collection Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full border border-[#35d6b0]/30 bg-[#102720]/80 backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#dfff72] shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-[#35d6b0] uppercase">
                NEW COLLECTION 2026
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#f5f7f4] leading-[1.1] sm:leading-[1.08]">
              Elevate Your <br className="hidden sm:inline" />
              <span className="text-gradient-teal">Everyday</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base md:text-lg text-[#a2b3ac] max-w-xl font-normal leading-relaxed">
              Premium technology designed for the way you live, work, and play. Precision craftsmanship meets next-gen acoustics.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              <button
                type="button"
                onClick={onShopNowClick}
                className="group btn-teal text-sm py-3.5 px-7 shadow-lg shadow-[#35d6b0]/20 w-full sm:w-auto"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <a
                href="#categories"
                className="btn-secondary-dark text-sm py-3.5 px-6 w-full sm:w-auto"
              >
                <Layers className="w-4 h-4 text-[#35d6b0]" />
                <span>Explore Collection</span>
              </a>
            </div>

            {/* Trust Stat Bar */}
            <div className="pt-4 sm:pt-6 border-t border-[#19352d]/60 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 sm:gap-1.5 text-base sm:text-lg font-bold text-[#f5f7f4]">
                  <span>15+</span>
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#dfff72] shrink-0" />
                </div>
                <span className="text-[11px] sm:text-xs text-[#71847c] font-medium leading-tight">Curated Products</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1 sm:gap-1.5 text-base sm:text-lg font-bold text-[#f5f7f4]">
                  <span>4</span>
                  <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#35d6b0] shrink-0" />
                </div>
                <span className="text-[11px] sm:text-xs text-[#71847c] font-medium leading-tight">Tech Categories</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1 sm:gap-1.5 text-base sm:text-lg font-bold text-[#f5f7f4]">
                  <span>100%</span>
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#35d6b0] shrink-0" />
                </div>
                <span className="text-[11px] sm:text-xs text-[#71847c] font-medium leading-tight">Quality Focus</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Visual */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-2 lg:pt-0 min-h-[280px] sm:min-h-[400px] lg:min-h-[440px] overflow-hidden sm:overflow-visible">
            {/* 1. Ambient Green/Teal Radial Glow */}
            <div className="absolute w-[260px] h-[260px] sm:w-[440px] sm:h-[440px] rounded-full bg-[radial-gradient(circle,_rgba(53,214,176,0.18)_0%,_rgba(16,39,32,0.4)_50%,_transparent_70%)] blur-2xl pointer-events-none z-0 animate-pulse-slow" />

            {/* 2. Glowing Circular Rings */}
            <div className="absolute w-[240px] h-[240px] sm:w-[410px] sm:h-[410px] rounded-full border border-[#35d6b0]/25 bg-[#35d6b0]/[0.015] shadow-[0_0_40px_rgba(53,214,176,0.12),inset_0_0_30px_rgba(53,214,176,0.08)] pointer-events-none z-0 animate-ring-glow" />
            <div className="absolute w-[180px] h-[180px] sm:w-[310px] sm:h-[310px] rounded-full border border-dashed border-[#35d6b0]/20 pointer-events-none z-0" />

            {/* 3. Subtle Decorative Particles */}
            <div className="absolute inset-0 pointer-events-none z-0 max-w-xs sm:max-w-md mx-auto">
              <div className="absolute top-6 left-4 w-2 h-2 rounded-full bg-[#35d6b0]/70 shadow-[0_0_8px_#35d6b0] animate-float-subtle" />
              <div className="absolute top-12 right-6 w-1.5 h-1.5 rounded-full bg-[#dfff72]/80 shadow-[0_0_6px_#dfff72] animate-float-subtle-delayed" />
              <div className="absolute bottom-12 left-6 w-2 h-2 rounded-full bg-[#35d6b0]/50 shadow-[0_0_6px_#35d6b0]" />
              <div className="absolute bottom-8 right-8 w-1.5 h-1.5 rounded-full bg-[#dfff72]/60" />
            </div>

            {/* 4. Soft Floor Light Glow */}
            <div className="absolute bottom-2 sm:bottom-4 w-[200px] sm:w-[340px] h-[20px] sm:h-[36px] rounded-[100%] bg-[radial-gradient(ellipse_at_center,_rgba(53,214,176,0.35)_0%,_rgba(53,214,176,0.08)_50%,_transparent_75%)] blur-md pointer-events-none z-0" />

            {/* 5. Headphone Image & Floating Feature Badges */}
            <div className="relative z-10 group w-full max-w-[260px] sm:max-w-md mx-auto flex items-center justify-center">
              <img
                src="/images/hero-headphones.png"
                alt="Black Over-Ear Headphones Pro"
                className="w-full max-h-[260px] sm:max-h-[380px] lg:max-h-[440px] object-contain transition-transform duration-500 group-hover:scale-[1.03] filter drop-shadow-[0_16px_30px_rgba(0,0,0,0.75)] relative z-10"
              />

              {/* Floating Feature Card 1 */}
              <div className="absolute bottom-0 left-0 sm:-bottom-4 sm:left-0 z-20 glass-panel p-2.5 sm:p-3.5 flex items-center gap-2.5 border border-[#35d6b0]/30 shadow-xl max-w-[180px] sm:max-w-[220px]">
                <div className="p-1.5 sm:p-2 rounded-lg bg-[#35d6b0]/15 text-[#35d6b0] shrink-0">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-bold text-[#f5f7f4] leading-tight">Immersive Audio</h4>
                  <p className="text-[9px] sm:text-[10px] text-[#a2b3ac]">Active Noise Cancellation</p>
                </div>
              </div>

              {/* Floating Feature Card 2 */}
              <div className="absolute top-0 right-0 sm:-top-4 sm:-right-2 z-20 glass-panel p-2 sm:p-3 flex items-center gap-1.5 border border-[#dfff72]/30 shadow-xl">
                <span className="w-2 h-2 rounded-full bg-[#dfff72] animate-pulse shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-semibold text-[#dfff72]">30h Playtime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

