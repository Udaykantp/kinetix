import React, { useState, useMemo } from 'react';
import {
  Grid3X3,
  List,
  SlidersHorizontal,
  X,
  Search,
  Star,
  ShoppingBag,
  Heart,
  GitCompare,
  Eye,
  Check,
  RotateCcw,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product, ProductCategory, BatteryTechnology } from '../../types';

export const ShopPage: React.FC = () => {
  const {
    products,
    pageParams,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToComparison,
    isInComparison,
    setQuickViewProduct,
    navigate,
  } = useStore();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>(
    pageParams?.category || 'all'
  );
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedVoltage, setSelectedVoltage] = useState<string>('all');
  const [selectedTechnology, setSelectedTechnology] = useState<string>('all');
  const [minAh, setMinAh] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchFilter, setSearchFilter] = useState<string>(pageParams?.search || '');

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedVoltage('all');
    setSelectedTechnology('all');
    setMinAh(0);
    setMaxPrice(200000);
    setInStockOnly(false);
    setSearchFilter('');
    setSortBy('featured');
  };

  // Distinct values for filter options
  const brands = useMemo(() => {
    const set = new Set(products.map((p) => p.brand));
    return Array.from(set);
  }, [products]);

  const technologies = useMemo(() => {
    const set = new Set(products.map((p) => p.technology));
    return Array.from(set);
  }, [products]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;
      if (selectedVoltage !== 'all' && !p.voltage.includes(selectedVoltage)) return false;
      if (selectedTechnology !== 'all' && p.technology !== selectedTechnology) return false;
      if (minAh > 0 && p.capacityAh < minAh) return false;
      if (p.price > maxPrice) return false;
      if (inStockOnly && !p.inStock) return false;
      if (searchFilter.trim()) {
        const query = searchFilter.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesBrand = p.brand.toLowerCase().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        const matchesTech = p.technology.toLowerCase().includes(query);
        const matchesVehicle = p.compatibleVehicles?.some((v) =>
          v.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesBrand && !matchesCat && !matchesTech && !matchesVehicle) {
          return false;
        }
      }
      return true;
    });

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }
    return result;
  }, [
    products,
    selectedCategory,
    selectedBrand,
    selectedVoltage,
    selectedTechnology,
    minAh,
    maxPrice,
    inStockOnly,
    searchFilter,
    sortBy,
  ]);

  return (
    <div className="bg-[#17191C] min-h-screen py-8 border-b border-[#25282D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-[#8E959E] font-mono mb-2">
            <button onClick={() => navigate('home')} className="hover:text-[#F2F0EA]">
              Home
            </button>
            <span>/</span>
            <span className="text-[#D6B98C]">Shop All Batteries</span>
            {selectedCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="capitalize">{selectedCategory}</span>
              </>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#F2F0EA] tracking-tight">
                All Energy Systems
              </h1>
              <p className="text-xs sm:text-sm text-[#8E959E] mt-1">
                Showing {filteredProducts.length} certified battery solutions
              </p>
            </div>

            {/* View Mode & Mobile Filter Trigger */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 bg-[#25282D] text-xs font-semibold text-[#F2F0EA] rounded-lg border border-[#343940]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#D6B98C]" />
                <span>Filters</span>
              </button>

              <div className="flex items-center gap-1 bg-[#25282D] p-1 rounded-lg border border-[#343940]">
                <button
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[#17191C] text-[#D6B98C]'
                      : 'text-[#8E959E] hover:text-[#F2F0EA]'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'list'
                      ? 'bg-[#17191C] text-[#D6B98C]'
                      : 'text-[#8E959E] hover:text-[#F2F0EA]'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Sort Selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#25282D] border border-[#343940] text-xs text-[#F2F0EA] px-3 py-2 rounded-lg focus:outline-none focus:border-[#D6B98C]"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
                <option value="newest">Newest Releases</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Bar within catalog */}
        <div className="relative mb-8">
          <Search className="w-4 h-4 text-[#8E959E] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by battery capacity (e.g. 150Ah), car model (e.g. Creta), or chemistry (e.g. LiFePO4)..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full bg-[#101214] border border-[#25282D] focus:border-[#D6B98C] text-xs sm:text-sm text-[#F2F0EA] pl-10 pr-10 py-3 rounded-xl focus:outline-none"
          />
          {searchFilter && (
            <button
              onClick={() => setSearchFilter('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8E959E] hover:text-[#F2F0EA]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 2-Column: Sidebar Filters (Desktop) + Product Catalog */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-6 bg-[#101214] border border-[#25282D] p-5 rounded-xl text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#25282D]">
              <span className="font-bold text-[#F2F0EA] uppercase tracking-wider font-mono">
                Technical Filters
              </span>
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-[11px] text-[#D6B98C] hover:text-[#E3CDA7]"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <label className="font-semibold text-[#F2F0EA] block mb-2 font-mono">
                Category
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'all', label: 'All Categories' },
                  { id: 'car', label: 'Car Batteries' },
                  { id: 'bike', label: 'Bike Batteries' },
                  { id: 'inverter', label: 'Inverter Batteries' },
                  { id: 'lithium', label: 'Lithium-Ion (LiFePO4)' },
                  { id: 'solar', label: 'Solar Storage' },
                  { id: 'industrial', label: 'Industrial Rack Banks' },
                  { id: 'ups', label: 'UPS Reserves' },
                  { id: 'accessories', label: 'Smart Accessories' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-[#25282D] text-[#D6B98C] font-semibold'
                        : 'text-[#B7BCC2] hover:text-[#F2F0EA]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="pt-4 border-t border-[#25282D]">
              <label className="font-semibold text-[#F2F0EA] block mb-2 font-mono">Brand</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-[#17191C] border border-[#343940] text-xs text-[#F2F0EA] px-2.5 py-1.5 rounded focus:outline-none focus:border-[#D6B98C]"
              >
                <option value="all">All Manufacturers</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Technology Filter */}
            <div className="pt-4 border-t border-[#25282D]">
              <label className="font-semibold text-[#F2F0EA] block mb-2 font-mono">
                Cell Chemistry
              </label>
              <select
                value={selectedTechnology}
                onChange={(e) => setSelectedTechnology(e.target.value)}
                className="w-full bg-[#17191C] border border-[#343940] text-xs text-[#F2F0EA] px-2.5 py-1.5 rounded focus:outline-none focus:border-[#D6B98C]"
              >
                <option value="all">All Chemistries</option>
                {technologies.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Voltage Filter */}
            <div className="pt-4 border-t border-[#25282D]">
              <label className="font-semibold text-[#F2F0EA] block mb-2 font-mono">
                System Voltage
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {['all', '12V', '24V', '48V'].map((volt) => (
                  <button
                    key={volt}
                    onClick={() => setSelectedVoltage(volt)}
                    className={`py-1 text-center rounded border text-xs font-mono transition-colors ${
                      selectedVoltage === volt
                        ? 'bg-[#25282D] border-[#D6B98C] text-[#D6B98C] font-semibold'
                        : 'border-[#343940] text-[#B7BCC2] hover:text-[#F2F0EA]'
                    }`}
                  >
                    {volt === 'all' ? 'Any' : volt}
                  </button>
                ))}
              </div>
            </div>

            {/* Capacity Ah Range */}
            <div className="pt-4 border-t border-[#25282D]">
              <div className="flex items-center justify-between mb-2">
                <label className="font-semibold text-[#F2F0EA] font-mono">Min Capacity</label>
                <span className="font-mono text-[#D6B98C]">{minAh} Ah</span>
              </div>
              <input
                type="range"
                min="0"
                max="220"
                step="10"
                value={minAh}
                onChange={(e) => setMinAh(Number(e.target.value))}
                className="w-full accent-[#D6B98C]"
              />
            </div>

            {/* Max Price Slider */}
            <div className="pt-4 border-t border-[#25282D]">
              <div className="flex items-center justify-between mb-2">
                <label className="font-semibold text-[#F2F0EA] font-mono">Max Budget</label>
                <span className="font-mono text-[#D6B98C]">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="200000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#D6B98C]"
              />
            </div>

            {/* In Stock Toggle */}
            <div className="pt-4 border-t border-[#25282D]">
              <label className="flex items-center gap-2 cursor-pointer text-[#F2F0EA]">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded bg-[#17191C] border-[#343940] text-[#D6B98C] focus:ring-0"
                />
                <span>Ready for 4-Hour Delivery Only</span>
              </label>
            </div>
          </aside>

          {/* Product Grid or List */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-[#101214] border border-[#25282D] rounded-xl p-12 text-center">
                <p className="text-sm text-[#F2F0EA] font-semibold">
                  No battery models match your exact combination of filters.
                </p>
                <p className="text-xs text-[#8E959E] mt-1">
                  Try lowering minimum Ah or clearing vehicle search parameters.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 bg-[#D6B98C] text-[#17191C] text-xs font-semibold rounded-lg"
                >
                  Clear All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const inWish = isInWishlist(product.id);
                  const inComp = isInComparison(product.id);

                  return (
                    <div
                      key={product.id}
                      className="group relative bg-[#101214] hover:bg-[#17191C] border border-[#25282D] hover:border-[#343940] rounded-xl overflow-hidden transition-all duration-200 flex flex-col justify-between"
                    >
                      {/* Image */}
                      <div className="relative aspect-[4/3] bg-[#25282D] overflow-hidden">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Hover Quick actions */}
                        <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => toggleWishlist(product)}
                            aria-label="Wishlist"
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
                            className="p-2 rounded-lg bg-[#17191C]/80 backdrop-blur-md text-[#B7BCC2] hover:text-[#F2F0EA]"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => addToComparison(product)}
                            aria-label="Compare"
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

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-xs text-[#8E959E] uppercase tracking-wider font-mono">
                            <span>{product.brand}</span>
                            <span aria-hidden="true">·</span>
                            <span>{product.category}</span>
                          </div>

                          <h3
                            onClick={() =>
                              navigate('product-detail', { productId: product.id })
                            }
                            className="text-sm font-semibold text-[#F2F0EA] hover:text-[#D6B98C] cursor-pointer mt-1.5 line-clamp-1 transition-colors"
                          >
                            {product.name}
                          </h3>

                          {/* Technical Unboxed Specs */}
                          <div className="flex items-center gap-2 text-xs text-[#B7BCC2] mt-2">
                            {product.capacityAh > 0 && <span>{product.capacityAh} Ah</span>}
                            {product.capacityAh > 0 && <span aria-hidden="true">·</span>}
                            <span>{product.voltage}</span>
                            <span aria-hidden="true">·</span>
                            <span>{product.warrantyMonths}M Warranty</span>
                          </div>

                          <div className="flex items-center gap-1.5 mt-2.5 text-xs text-[#D6B98C]">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span className="font-semibold text-[#F2F0EA]">{product.rating}</span>
                            <span className="text-[#8E959E]">({product.reviewCount})</span>
                          </div>
                        </div>

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
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#101214] border border-[#25282D] hover:border-[#343940] rounded-xl p-5 flex flex-col sm:flex-row gap-6 items-center justify-between transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-lg bg-[#25282D] shrink-0"
                      />
                      <div className="text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-[#8E959E] uppercase font-mono">
                          <span>{product.brand}</span>
                          <span aria-hidden="true">·</span>
                          <span>{product.technology}</span>
                        </div>
                        <h3
                          onClick={() =>
                            navigate('product-detail', { productId: product.id })
                          }
                          className="text-base font-bold text-[#F2F0EA] hover:text-[#D6B98C] cursor-pointer mt-1"
                        >
                          {product.name}
                        </h3>
                        <p className="text-xs text-[#8E959E] mt-1 line-clamp-1 max-w-lg">
                          {product.description}
                        </p>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-[#B7BCC2] mt-2">
                          {product.capacityAh > 0 && <span>Capacity: {product.capacityAh} Ah</span>}
                          <span>Voltage: {product.voltage}</span>
                          <span>Warranty: {product.warrantyMonths} Months</span>
                          <span className="text-[#D6B98C] flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" /> {product.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-3 shrink-0 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#25282D]">
                      <div className="text-center sm:text-right">
                        <div className="text-lg font-bold text-[#F2F0EA] font-mono tabular-nums">
                          ₹{product.price.toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs text-[#8E959E] line-through font-mono">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => addToCart(product)}
                          className="px-4 py-2 bg-[#D6B98C] hover:bg-[#E3CDA7] text-[#17191C] rounded-lg text-xs font-semibold transition-colors"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() =>
                            navigate('product-detail', { productId: product.id })
                          }
                          className="px-3 py-2 bg-[#25282D] hover:bg-[#343940] text-[#F2F0EA] border border-[#343940] rounded-lg text-xs transition-colors"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
