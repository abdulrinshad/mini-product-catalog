import React from 'react';

const LoadingSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-stretch w-full">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="surface-card p-4 sm:p-5 space-y-4 animate-pulse border border-[#19352d]/60 flex flex-col justify-between"
        >
          {/* Skeleton Header: Stock & Wishlist */}
          <div className="flex justify-between items-center">
            <div className="h-6 w-24 bg-[#102720] rounded-full" />
            <div className="h-8 w-8 bg-[#081713] border border-[#19352d] rounded-xl" />
          </div>

          {/* Skeleton Image Container */}
          <div className="h-44 sm:h-52 w-full bg-[#081713]/80 border border-[#19352d]/40 rounded-xl flex items-center justify-center">
            <div className="h-24 w-24 bg-[#102720] rounded-xl opacity-60" />
          </div>

          {/* Skeleton Info */}
          <div className="space-y-2.5 pt-1">
            <div className="h-3 w-16 bg-[#102720] rounded-full" />
            <div className="h-5 w-4/5 bg-[#102720] rounded-md" />
          </div>

          {/* Skeleton Footer */}
          <div className="pt-3 border-t border-[#19352d]/60 flex items-center justify-between">
            <div className="space-y-1">
              <div className="h-2.5 w-8 bg-[#102720] rounded-full" />
              <div className="h-6 w-20 bg-[#102720] rounded-md" />
            </div>
            <div className="h-10 w-28 bg-[#102720] rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;

