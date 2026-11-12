import React, { useState } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  SlidersHorizontal,
  User as UserIcon,
  Menu,
  X,
  Shield,
  Layers,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Navbar: React.FC = () => {
  const {
    page,
    navigate,
    cartItemCount,
    wishlist,
    comparisonList,
    user,
    setIsCartOpen,
    setIsAuthModalOpen,
    searchQuery,
    setSearchQuery,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('shop', { search: searchQuery.trim() });
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#17191C]/95 backdrop-blur-md border-b border-[#25282D]">
      {/* Strict Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (4-5 text links) - Zone 3 (Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single element, display typography) */}
        <button
          onClick={() => navigate('home')}
          className="text-xl sm:text-2xl font-bold tracking-tight text-[#F2F0EA] hover:text-[#D6B98C] transition-colors whitespace-nowrap shrink-0 text-left flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 bg-[#D6B98C] rounded-sm transform rotate-45 inline-block"></span>
          <span>KINETIX</span>
        </button>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#B7BCC2]">
          <button
            onClick={() => navigate('shop')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              page === 'shop'
                ? 'text-[#D6B98C] border-b-2 border-[#D6B98C]'
                : 'hover:text-[#F2F0EA]'
            }`}
          >
            All Batteries
          </button>
          <button
            onClick={() => navigate('category', { category: 'car' })}
            className="whitespace-nowrap shrink-0 hover:text-[#F2F0EA] transition-colors py-1"
          >
            Automotive
          </button>
          <button
            onClick={() => navigate('category', { category: 'inverter' })}
            className="whitespace-nowrap shrink-0 hover:text-[#F2F0EA] transition-colors py-1"
          >
            Inverters
          </button>
          <button
            onClick={() => navigate('category', { category: 'lithium' })}
            className="whitespace-nowrap shrink-0 hover:text-[#F2F0EA] transition-colors py-1"
          >
            Lithium & Solar
          </button>
          <button
            onClick={() => navigate('compare')}
            className={`whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors py-1 ${
              page === 'compare'
                ? 'text-[#D6B98C] border-b-2 border-[#D6B98C]'
                : 'hover:text-[#F2F0EA]'
            }`}
          >
            <span>Compare</span>
            {comparisonList.length > 0 && (
              <span className="text-xs bg-[#25282D] text-[#D6B98C] px-1.5 py-0.2 rounded font-mono">
                {comparisonList.length}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: Primary Actions & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
          {/* Quick search input or toggle */}
          <div className="relative">
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  placeholder="Search battery model, car, Ah..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="bg-[#25282D] text-[#F2F0EA] placeholder-[#8E959E] text-xs px-3 py-1.5 rounded-md border border-[#343940] focus:border-[#D6B98C] focus:outline-none w-44 sm:w-60"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-[#8E959E] hover:text-[#F2F0EA] ml-1 p-1"
                  aria-label="Close search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search batteries"
                className="p-2 text-[#B7BCC2] hover:text-[#F2F0EA] hover:bg-[#25282D] rounded-lg transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={() => navigate('account', { tab: 'wishlist' })}
            aria-label="View Wishlist"
            className="relative p-2 text-[#B7BCC2] hover:text-[#F2F0EA] hover:bg-[#25282D] rounded-lg transition-colors"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#A87555] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Bag */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Open Shopping Cart"
            className="relative p-2 text-[#B7BCC2] hover:text-[#F2F0EA] hover:bg-[#25282D] rounded-lg transition-colors flex items-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4 text-[#D6B98C]" />
            {cartItemCount > 0 && (
              <span className="bg-[#D6B98C] text-[#17191C] text-[11px] font-bold px-1.5 py-0.5 rounded-full font-mono">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* User Profile / Admin Switch */}
          {user ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => navigate('account')}
                className="hidden sm:flex items-center gap-2 text-xs text-[#F2F0EA] bg-[#25282D] hover:bg-[#343940] px-3 py-1.5 rounded-lg border border-[#343940] transition-colors"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#D6B98C]" />
                <span className="max-w-[100px] truncate">{user.name}</span>
              </button>
              {/* Admin Portal Button */}
              <button
                onClick={() => navigate('admin')}
                title="Admin Control Panel"
                className="flex items-center gap-1 text-xs text-[#D6B98C] bg-[#25282D] hover:bg-[#343940] p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-[#D6B98C]/30 transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                <span className="hidden sm:inline font-mono">Admin</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="text-xs font-medium text-[#17191C] bg-[#D6B98C] hover:bg-[#E3CDA7] px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Sign In
            </button>
          )}

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#B7BCC2] hover:text-[#F2F0EA] hover:bg-[#25282D] rounded-lg"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#17191C] border-b border-[#25282D] px-4 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm pt-2">
            <button
              onClick={() => {
                navigate('shop');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 bg-[#25282D] text-[#F2F0EA] rounded-md font-medium"
            >
              All Batteries
            </button>
            <button
              onClick={() => {
                navigate('category', { category: 'car' });
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 bg-[#25282D] text-[#F2F0EA] rounded-md font-medium"
            >
              Car Batteries
            </button>
            <button
              onClick={() => {
                navigate('category', { category: 'bike' });
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 bg-[#25282D] text-[#F2F0EA] rounded-md font-medium"
            >
              Bike Batteries
            </button>
            <button
              onClick={() => {
                navigate('category', { category: 'inverter' });
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 bg-[#25282D] text-[#F2F0EA] rounded-md font-medium"
            >
              Inverter Batteries
            </button>
            <button
              onClick={() => {
                navigate('category', { category: 'lithium' });
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 bg-[#25282D] text-[#F2F0EA] rounded-md font-medium"
            >
              Lithium LiFePO4
            </button>
            <button
              onClick={() => {
                navigate('category', { category: 'solar' });
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 bg-[#25282D] text-[#F2F0EA] rounded-md font-medium"
            >
              Solar Energy
            </button>
            <button
              onClick={() => {
                navigate('category', { category: 'industrial' });
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 bg-[#25282D] text-[#F2F0EA] rounded-md font-medium"
            >
              Industrial
            </button>
            <button
              onClick={() => {
                navigate('category', { category: 'accessories' });
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 bg-[#25282D] text-[#F2F0EA] rounded-md font-medium"
            >
              Accessories
            </button>
          </div>

          <div className="border-t border-[#25282D] pt-3 flex flex-col gap-2 text-sm text-[#B7BCC2]">
            <button
              onClick={() => {
                navigate('compare');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 flex items-center justify-between"
            >
              <span>Product Comparison</span>
              <span className="font-mono text-[#D6B98C]">{comparisonList.length} items</span>
            </button>
            <button
              onClick={() => {
                navigate('tracking');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 hover:text-[#F2F0EA]"
            >
              Track Your Order
            </button>
            <button
              onClick={() => {
                navigate('buying-guide');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 hover:text-[#F2F0EA]"
            >
              Battery Buying Guide
            </button>
            <button
              onClick={() => {
                navigate('admin');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 text-[#D6B98C] flex items-center gap-2 font-mono"
            >
              <Shield className="w-4 h-4" /> Admin Console
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
