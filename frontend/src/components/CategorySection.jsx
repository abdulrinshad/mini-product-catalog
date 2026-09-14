import React from 'react';
import { Headphones, Mouse, Laptop, Watch, ArrowUpRight } from 'lucide-react';

const categories = [
  {
    id: 'Audio',
    name: 'Audio Gear',
    tagline: 'Sound for every moment',
    icon: Headphones,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop',
    count: '3 Products',
  },
  {
    id: 'Accessories',
    name: 'Accessories',
    tagline: 'Essential tech addons',
    icon: Mouse,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop',
    count: '5 Products',
  },
  {
    id: 'Office',
    name: 'Office & Desk',
    tagline: 'Ergonomic workspace tech',
    icon: Laptop,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop',
    count: '3 Products',
  },
  {
    id: 'Wearables',
    name: 'Wearables',
    tagline: 'Smart fitness & tracking',
    icon: Watch,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop',
    count: '2 Products',
  },
];

const CategorySection = ({ selectedCategory, onSelectCategory }) => {
  return (
    <section id="categories" className="py-12 border-b border-[#19352d]/60">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-wider text-[#35d6b0] uppercase">
              CATEGORIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f5f7f4]">
              Shop by Category
            </h2>
          </div>
          {selectedCategory && (
            <button
              onClick={() => onSelectCategory('')}
              className="text-xs text-[#dfff72] hover:underline font-semibold self-start"
            >
              Clear Category Filter ({selectedCategory})
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <div
                key={cat.id}
                role="button"
                tabIndex={0}
                aria-label={`Filter by ${cat.name}`}
                aria-pressed={isSelected}
                onClick={() => onSelectCategory(cat.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCategory(cat.id);
                  }
                }}
                className={`group cursor-pointer surface-card p-5 relative overflow-hidden flex flex-col justify-between h-48 transition-all ${
                  isSelected
                    ? 'border-[#35d6b0] ring-2 ring-[#35d6b0]/50 shadow-[0_0_20px_rgba(53,214,176,0.2)] bg-[#102720]/90'
                    : 'hover:border-[#35d6b0]/50'
                }`}
              >
                {/* Background Image Overlay with Gradient Fade */}
                <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-35 transition-opacity">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1e19] via-[#0c1e19]/80 to-transparent" />
                </div>

                {/* Top Header */}
                <div className="relative z-10 flex items-center justify-between">
                  <div
                    className={`p-2.5 rounded-xl border transition-colors ${
                      isSelected
                        ? 'bg-[#35d6b0]/25 border-[#35d6b0] text-[#35d6b0]'
                        : 'bg-[#102720]/90 border-[#19352d] text-[#35d6b0] group-hover:border-[#35d6b0]/40'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {isSelected && (
                      <span className="text-[10px] font-bold text-[#06110f] bg-[#35d6b0] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm animate-fadeIn">
                        Active
                      </span>
                    )}
                    <span className="text-[10px] font-semibold text-[#71847c] uppercase tracking-wider bg-[#081713]/80 px-2 py-1 rounded-md border border-[#19352d]">
                      {cat.count}
                    </span>
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="relative z-10 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`text-lg font-bold transition-colors ${
                        isSelected ? 'text-[#35d6b0]' : 'text-[#f5f7f4] group-hover:text-[#35d6b0]'
                      }`}
                    >
                      {cat.name}
                    </h3>
                    <ArrowUpRight
                      className={`w-4 h-4 transition-all ${
                        isSelected
                          ? 'text-[#35d6b0] translate-x-0.5 -translate-y-0.5'
                          : 'text-[#71847c] group-hover:text-[#35d6b0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                      }`}
                    />
                  </div>
                  <p className="text-xs text-[#a2b3ac]">{cat.tagline}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
