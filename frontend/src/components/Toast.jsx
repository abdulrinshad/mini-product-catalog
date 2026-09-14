import React, { useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = () => {
  const { toast, hideToast } = useCart();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      hideToast();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, hideToast]);

  if (!toast) return null;

  const isError = toast.type === 'error';
  const isInfo = toast.type === 'info';

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:bottom-6 z-50 animate-slide-up w-auto max-w-sm mx-auto sm:mx-0 pointer-events-auto"
    >
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl ${
          isError
            ? 'bg-[#1a0b0b]/95 border-[#ff7272]/40 text-[#ff7272]'
            : isInfo
            ? 'bg-[#0c1e19]/95 border-[#19352d] text-[#a2b3ac]'
            : 'bg-[#081f19]/95 border-[#35d6b0]/40 text-[#5de5c0]'
        }`}
      >
        {isError ? (
          <AlertCircle className="w-5 h-5 shrink-0" />
        ) : isInfo ? (
          <Info className="w-5 h-5 shrink-0" />
        ) : (
          <CheckCircle className="w-5 h-5 shrink-0 text-[#35d6b0]" />
        )}

        <p className="text-xs sm:text-sm font-medium text-[#f5f7f4] flex-1 leading-snug">{toast.message}</p>

        <button
          type="button"
          onClick={hideToast}
          className="w-8 h-8 flex items-center justify-center text-[#71847c] hover:text-[#f5f7f4] transition-colors rounded-lg focus:outline-none focus:ring-1 focus:ring-[#35d6b0] shrink-0 touch-target-44"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;

