import React, { useState } from 'react';
import { ShoppingBag, Eye, Heart, GitCompare, Star, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';

export const FeaturedProducts: React.FC = () => {
  const {
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToComparison,
    isInComparison,
    setQuickViewProduct,
    navigate,
  } = useStore();

  const [activeFilter, setActiveFilter] = useState<'bestseller' | 'new' | 'inverter' | 'lithium'>('bestseller');

  const filteredProducts = products.filter((p) => {
    if (activeFilter === 'bestseller') return p.isBestSeller || p.rating >= 4.8;
    if (activeFilter === 'new') return p.isNewArrival || p.category === 'lithium';
    if (activeFilter === 'inverter') return p.category === 'inverter';
    if (activeFilter === 'lithium') return p.category === 'lithium';
    return true;
  });

  return (
    <section className="py-20 bg-[#17191C] border-b border-[#25282D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Segmented Filter Control */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono text-[#D6B98C] uppercase tracking-wider mb-2">
              Verified Benchmark Reliability
            </div>
            <h2 className="text-3xl font-bold text-[#F2F0EA] tracking-tight">
              Featured Energy Units
            </h2>
          </div>

          {/* Interactive filter segmented buttons */}
          <div className="flex items-center gap-1 p-1 bg-[#25282D] rounded-lg border border-[#343940] overflow-x-auto">
            <button
              onClick={() => setActiveFilter('bestseller')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                activeFilter === 'bestseller'
                  ? 'bg-[#D6B98C] text-[#17191C] shadow-sm'
                  : 'text-[#B7BCC2] hover:text-[#F2F0EA]'
              }`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setActiveFilter('new')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                activeFilter === 'new'
                  ? 'bg-[#D6B98C] text-[#17191C] shadow-sm'
                  : 'text-[#B7BCC2] hover:text-[#F2F0EA]'
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setActiveFilter('inverter')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                activeFilter === 'inverter'
                  ? 'bg-[#D6B98C] text-[#17191C] shadow-sm'
                  : 'text-[#B7BCC2] hover:text-[#F2F0EA]'
              }`}
            >
              Inverter Series
            </button>
            <button
              onClick={() => setActiveFilter('lithium')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                activeFilter === 'lithium'
                  ? 'bg-[#D6B98C] text-[#17191C] shadow-sm'
                  : 'text-[#B7BCC2] hover:text-[#F2F0EA]'
              }`}
            >
              Lithium LiFePO4
            </button>
          </div>
        </div>

        {/* 3-Column / 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product) => {
            const inWish = isInWishlist(product.id);
            const inComp = isInComparison(product.id);

            return (
              <div
                key={product.id}
                className="group relative bg-[#17191C] hover:bg-[#25282D] border border-[#25282D] hover:border-[#343940] rounded-xl overflow-hidden transition-all duration-200 flex flex-col justify-between"
              >
                {/* Visual Area */}
                <div className="relative aspect-[4/3] bg-[#25282D] overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Subtle single text badge */}
                  {product.isBestSeller && (
                    <div className="absolute top-3 left-3 bg-[#17191C]/90 text-[#D6B98C] text-[10px] font-mono tracking-wider px-2 py-0.5 rounded border border-[#D6B98C]/30">
                      TOP DEMAND
                    </div>
                  )}

                  {/* Quick Action Floating Controls */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => toggleWishlist(product)}
                      aria-label="Save to Wishlist"
                      className={`p-2 rounded-lg backdrop-blur-md transition-colors ${
                        inWish
                          ? 'bg-[#A87555] text-white'
                          : 'bg-[#17191C]/80 text-[#B7BCC2] hover:text-[#F2F0EA]'
                      }`}
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      aria-label="Quick View"
                      className="p-2 rounded-lg bg-[#17191C]/80 backdrop-blur-md text-[#B7BCC2] hover:text-[#F2F0EA] transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => addToComparison(product)}
                      aria-label="Compare Product"
                      className={`p-2 rounded-lg backdrop-blur-md transition-colors ${
                        inComp
                          ? 'bg-[#D6B98C] text-[#17191C]'
                          : 'bg-[#17191C]/80 text-[#B7BCC2] hover:text-[#F2F0EA]'
                      }`}
                    >
                      <GitCompare className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card Metadata & Information */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Brand / Category with typographic separators */}
                    <div className="flex items-center gap-2 text-xs text-[#8E959E] uppercase tracking-wider font-mono">
                      <span>{product.brand}</span>
                      <span aria-hidden="true">·</span>
                      <span>{product.category}</span>
                    </div>

                    {/* Product Title */}
                    <h3
                      onClick={() => navigate('product-detail', { productId: product.id })}
                      className="text-sm font-semibold text-[#F2F0EA] hover:text-[#D6B98C] cursor-pointer mt-1.5 line-clamp-1 transition-colors"
                    >
                      {product.name}
                    </h3>

                    {/* Unboxed technical specs */}
                    <div className="flex items-center gap-2 text-xs text-[#B7BCC2] mt-2">
                      {product.capacityAh > 0 && <span>{product.capacityAh} Ah</span>}
                      {product.capacityAh > 0 && <span aria-hidden="true">·</span>}
                      <span>{product.voltage}</span>
                      <span aria-hidden="true">·</span>
                      <span>{product.warrantyMonths}M Warranty</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mt-2.5 text-xs text-[#D6B98C]">
                      <div className="flex items-center">
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <span className="font-semibold text-[#F2F0EA]">{product.rating}</span>
                      <span className="text-[#8E959E]">({product.reviewCount})</span>
                    </div>
                  </div>

                  {/* Pricing and Action row */}
                  <div className="mt-5 pt-4 border-t border-[#25282D] flex items-center justify-between gap-2">
                    <div>
                      <div className="text-base font-bold text-[#F2F0EA] font-mono tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </div>
                      {product.discountPercent > 0 && (
                        <div className="text-[11px] text-[#8E959E] line-through font-mono">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#D6B98C] hover:bg-[#E3CDA7] text-[#17191C] rounded-lg text-xs font-semibold transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
