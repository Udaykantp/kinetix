import React, { useState } from 'react';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Plus,
  Minus,
  ShoppingBag,
  Zap,
  Heart,
  GitCompare,
  ArrowRight,
  Maximize2,
  MapPin,
  Clock,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';

export const ProductDetailPage: React.FC = () => {
  const {
    pageParams,
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToComparison,
    isInComparison,
    checkPincode,
    showToast,
    navigate,
  } = useStore();

  const productId = pageParams?.productId || products[0].id;
  const product = products.find((p) => p.id === productId) || products[0];

  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [exchangeScrap, setExchangeScrap] = useState(false);

  // Pincode state
  const [pincode, setPincode] = useState('400050');
  const [pinResult, setPinResult] = useState<{
    deliverable: boolean;
    city: string;
    state: string;
    estimateDays: number;
    expressAvailable: boolean;
  } | null>(() => checkPincode('400050'));

  // Review form state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState([
    {
      id: 'rev-1',
      author: 'Sameer Verma',
      rating: 5,
      date: 'March 04, 2026',
      title: 'Unbelievable cranking power in extreme morning cold',
      comment:
        'Installed in my Hyundai Creta Diesel. The cranking sound is instantaneous. The technician arrived in Bandra with a digital CCA meter and verified charging before bolting down.',
      vehicle: 'Hyundai Creta 1.5 Diesel',
    },
    {
      id: 'rev-2',
      author: 'Rohit Khandelwal',
      rating: 5,
      date: 'February 19, 2026',
      title: 'Flawless build quality and premium terminals',
      comment:
        'The dark graphite casing and titanium top plate look exceptionally high-end. Zero acid smell and voltage holds steady at 12.8V.',
      vehicle: 'Kia Seltos GT Line',
    },
  ]);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const res = checkPincode(pincode);
    setPinResult(res);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewAuthor.trim() && newReviewComment.trim()) {
      const review = {
        id: `rev-${Date.now()}`,
        author: newReviewAuthor.trim(),
        rating: newReviewRating,
        date: 'Today',
        title: 'Verified Customer Experience',
        comment: newReviewComment.trim(),
        vehicle: 'Verified Purchaser',
      };
      setReviewsList([review, ...reviewsList]);
      setNewReviewAuthor('');
      setNewReviewComment('');
      showToast('Thank you! Your verified technical review has been posted.');
    }
  };

  // Scrap exchange rebate (up to ₹1,200 discount)
  const scrapDiscount = exchangeScrap ? Math.min(1200, Math.round(product.price * 0.12)) : 0;
  const effectivePrice = product.price - scrapDiscount;

  // Frequently bought together bundle
  const accessory = products.find((p) => p.category === 'accessories') || products[10];

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('checkout');
  };

  return (
    <div className="bg-[#17191C] min-h-screen py-10 border-b border-[#25282D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#8E959E] font-mono mb-8">
          <button onClick={() => navigate('home')} className="hover:text-[#F2F0EA]">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigate('shop')} className="hover:text-[#F2F0EA]">
            Batteries
          </button>
          <span>/</span>
          <button
            onClick={() => navigate('category', { category: product.category })}
            className="hover:text-[#F2F0EA] capitalize"
          >
            {product.category}
          </button>
          <span>/</span>
          <span className="text-[#D6B98C] truncate max-w-xs">{product.name}</span>
        </div>

        {/* Contiguous PDP Grid: Left Gallery + Right Purchase Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: Image Gallery & Zoom */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] bg-[#101214] border border-[#25282D] rounded-2xl overflow-hidden group">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 group-hover:scale-105"
                onClick={() => setZoomOpen(true)}
              />
              <button
                onClick={() => setZoomOpen(true)}
                className="absolute top-4 right-4 p-2 bg-[#17191C]/80 backdrop-blur-md text-[#B7BCC2] hover:text-[#F2F0EA] rounded-lg border border-[#343940] transition-colors"
                aria-label="Enlarge image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-4 bg-[#17191C]/90 text-[10px] font-mono text-[#D6B98C] px-2.5 py-1 rounded border border-[#D6B98C]/30">
                100% FACTORY FRESH · DIRECT WARRANTY
              </div>
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === idx
                        ? 'border-[#D6B98C]'
                        : 'border-[#25282D] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Highlights bullet list */}
            <div className="bg-[#101214] border border-[#25282D] rounded-xl p-5 mt-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#D6B98C] mb-3">
                Engineering Highlights
              </h4>
              <ul className="space-y-2 text-xs text-[#B7BCC2]">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#D6B98C] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT: Contiguous Purchase Module */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#101214] border border-[#25282D] rounded-2xl p-6 sm:p-8 space-y-6">
              {/* Brand & Title */}
              <div>
                <div className="flex items-center gap-2 text-xs text-[#8E959E] uppercase font-mono tracking-wider">
                  <span>{product.brand}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.technology}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#D6B98C]">SKU: {product.id.toUpperCase()}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-[#F2F0EA] tracking-tight mt-1.5 leading-snug">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-3 text-xs">
                  <div className="flex items-center text-[#D6B98C]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-current'
                            : 'text-[#343940]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-[#F2F0EA]">{product.rating}</span>
                  <span className="text-[#8E959E]">({product.reviewCount} verified reviews)</span>
                  <span className="text-[#343940]">|</span>
                  <span className="text-[#D6B98C] font-mono">In Stock ({product.stockCount} units)</span>
                </div>
              </div>

              {/* Pricing Box */}
              <div className="p-4 bg-[#17191C] border border-[#25282D] rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#F2F0EA] font-mono tabular-nums">
                    ₹{effectivePrice.toLocaleString('en-IN')}
                    {exchangeScrap && (
                      <span className="text-xs text-[#D6B98C] font-normal ml-2">
                        (with ₹{scrapDiscount} Old Scrap Rebate)
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#8E959E] mt-0.5">
                    <span className="line-through font-mono">
                      MRP: ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[#A87555] font-semibold">
                      Save {product.discountPercent}%
                    </span>
                    <span>(Inclusive of all 18% GST)</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono bg-[#25282D] text-[#D6B98C] px-2.5 py-1 rounded border border-[#343940]">
                    {product.warrantyMonths} Months Warranty
                  </span>
                </div>
              </div>

              {/* Scrap Exchange Toggle */}
              <div className="p-4 bg-[#17191C] border border-[#343940] rounded-xl">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exchangeScrap}
                    onChange={(e) => setExchangeScrap(e.target.checked)}
                    className="mt-1 rounded bg-[#25282D] border-[#343940] text-[#D6B98C] focus:ring-0"
                  />
                  <div>
                    <span className="text-xs font-semibold text-[#F2F0EA] block">
                      Opt for Old Dead Battery Scrap Exchange (-₹{Math.min(1200, Math.round(product.price * 0.12))})
                    </span>
                    <span className="text-[11px] text-[#8E959E] mt-0.5 block">
                      Our certified technician tests and carries away your old battery upon doorstep delivery. Instant cashback credited on the spot!
                    </span>
                  </div>
                </label>
              </div>

              {/* Key Specs Matrix Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div className="p-2.5 bg-[#17191C] border border-[#25282D] rounded-lg">
                  <span className="text-[10px] text-[#8E959E] block">CAPACITY</span>
                  <span className="text-[#F2F0EA] font-semibold">{product.capacityAh} Ah</span>
                </div>
                <div className="p-2.5 bg-[#17191C] border border-[#25282D] rounded-lg">
                  <span className="text-[10px] text-[#8E959E] block">VOLTAGE</span>
                  <span className="text-[#F2F0EA] font-semibold">{product.voltage}</span>
                </div>
                <div className="p-2.5 bg-[#17191C] border border-[#25282D] rounded-lg">
                  <span className="text-[10px] text-[#8E959E] block">WEIGHT</span>
                  <span className="text-[#F2F0EA] font-semibold">{product.weightKg} kg</span>
                </div>
                <div className="p-2.5 bg-[#17191C] border border-[#25282D] rounded-lg">
                  <span className="text-[10px] text-[#8E959E] block">CCA CRANKING</span>
                  <span className="text-[#D6B98C] font-semibold">
                    {product.coldCrankingAmps ? `${product.coldCrankingAmps} CCA` : 'Deep Cycle'}
                  </span>
                </div>
              </div>

              {/* Doorstep Delivery & Pincode Checker */}
              <div className="pt-2">
                <div className="text-xs font-mono uppercase text-[#8E959E] mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D6B98C]" />
                  <span>Check Delivery & Free Doorstep Fitment</span>
                </div>
                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-digit PIN (e.g. 400050, 560001)"
                    className="flex-1 bg-[#17191C] border border-[#343940] text-xs text-[#F2F0EA] px-3.5 py-2 rounded-lg focus:outline-none focus:border-[#D6B98C] font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#25282D] hover:bg-[#343940] text-xs text-[#F2F0EA] font-semibold rounded-lg border border-[#343940]"
                  >
                    Check
                  </button>
                </form>

                {pinResult && (
                  <div className="mt-2.5 text-xs text-[#B7BCC2] bg-[#17191C] border border-[#25282D] p-3 rounded-lg flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#D6B98C]" />
                      <span>
                        Delivery to <strong className="text-[#F2F0EA]">{pinResult.city}</strong> in{' '}
                        {pinResult.estimateDays === 1
                          ? 'Today / Within 4 Hours'
                          : `${pinResult.estimateDays} Business Days`}
                      </span>
                    </span>
                    <span className="text-[#D6B98C] font-semibold font-mono">Free Installation</span>
                  </div>
                )}
              </div>

              {/* Quantity and Actions */}
              <div className="pt-4 border-t border-[#25282D] space-y-3">
                <div className="flex items-center gap-4">
                  {/* Quantity Stepper */}
                  <div className="flex items-center bg-[#17191C] border border-[#343940] rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2.5 text-[#B7BCC2] hover:text-[#F2F0EA]"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-bold font-mono text-[#F2F0EA]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2.5 text-[#B7BCC2] hover:text-[#F2F0EA]"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={() => addToCart(product, quantity)}
                    className="flex-1 py-3 px-5 bg-[#D6B98C] hover:bg-[#E3CDA7] text-[#17191C] rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  {/* Buy Now */}
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-3 px-5 bg-[#25282D] hover:bg-[#343940] text-[#F2F0EA] border border-[#343940] rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4 text-[#D6B98C]" />
                    <span>Buy Now</span>
                  </button>
                </div>

                {/* Secondary Wishlist / Compare buttons */}
                <div className="flex items-center justify-between text-xs text-[#8E959E] pt-2">
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="flex items-center gap-1.5 hover:text-[#F2F0EA]"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isInWishlist(product.id) ? 'text-[#A87555] fill-current' : ''
                      }`}
                    />
                    <span>{isInWishlist(product.id) ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                  </button>

                  <button
                    onClick={() => addToComparison(product)}
                    className="flex items-center gap-1.5 hover:text-[#F2F0EA]"
                  >
                    <GitCompare
                      className={`w-4 h-4 ${
                        isInComparison(product.id) ? 'text-[#D6B98C]' : ''
                      }`}
                    />
                    <span>Compare with Other Models</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Technical Specs Table */}
        <div className="mt-16 bg-[#101214] border border-[#25282D] rounded-2xl p-6 sm:p-8">
          <h3 className="text-xl font-bold text-[#F2F0EA] mb-6">Complete Technical Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-xs">
            {Object.entries(product.technicalSpecs).map(([key, val], idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-2.5 border-b border-[#25282D]"
              >
                <span className="text-[#8E959E] font-mono">{key}</span>
                <span className="text-[#F2F0EA] font-semibold text-right">{val}</span>
              </div>
            ))}
            <div className="flex items-center justify-between py-2.5 border-b border-[#25282D]">
              <span className="text-[#8E959E] font-mono">Dimensions (L × W × H)</span>
              <span className="text-[#F2F0EA] font-semibold">{product.dimensions}</span>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-[#25282D]">
              <span className="text-[#8E959E] font-mono">Total Filled Weight</span>
              <span className="text-[#F2F0EA] font-semibold">{product.weightKg} kg</span>
            </div>
          </div>
        </div>

        {/* Compatible Vehicles / Appliances */}
        {product.compatibleVehicles && (
          <div className="mt-8 bg-[#101214] border border-[#25282D] rounded-2xl p-6 sm:p-8">
            <h3 className="text-base font-bold text-[#F2F0EA] mb-4">
              Verified OEM Vehicle Compatibility
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {product.compatibleVehicles.map((veh, i) => (
                <span
                  key={i}
                  className="bg-[#17191C] text-[#B7BCC2] border border-[#25282D] px-3 py-1.5 rounded-lg"
                >
                  {veh}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Frequently Bought Together Bundle */}
        <div className="mt-12 bg-[#101214] border border-[#343940] rounded-2xl p-6 sm:p-8">
          <div className="text-xs font-mono text-[#D6B98C] uppercase tracking-wider mb-1">
            Engineered Bundle & Save
          </div>
          <h3 className="text-lg font-bold text-[#F2F0EA] mb-4">Frequently Bought Together</h3>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 bg-[#17191C] border border-[#25282D] p-3 rounded-xl">
                <img
                  src={product.images[0]}
                  alt=""
                  className="w-14 h-14 object-cover rounded bg-[#25282D]"
                />
                <div>
                  <div className="text-xs font-semibold text-[#F2F0EA] line-clamp-1">
                    {product.name}
                  </div>
                  <div className="text-xs font-mono text-[#D6B98C]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <span className="text-xl font-bold text-[#8E959E]">+</span>

              <div className="flex items-center gap-3 bg-[#17191C] border border-[#25282D] p-3 rounded-xl">
                <img
                  src={accessory.images[0]}
                  alt=""
                  className="w-14 h-14 object-cover rounded bg-[#25282D]"
                />
                <div>
                  <div className="text-xs font-semibold text-[#F2F0EA] line-clamp-1">
                    {accessory.name}
                  </div>
                  <div className="text-xs font-mono text-[#D6B98C]">
                    ₹{accessory.price.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right flex items-center gap-4">
              <div>
                <div className="text-base font-bold text-[#F2F0EA] font-mono tabular-nums">
                  ₹{(product.price + accessory.price - 500).toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-[#8E959E]">
                  Combo Discount: Save ₹500
                </div>
              </div>
              <button
                onClick={() => {
                  addToCart(product);
                  addToCart(accessory);
                  showToast('Bundle added to cart with combo discount!');
                }}
                className="px-4 py-2.5 bg-[#D6B98C] hover:bg-[#E3CDA7] text-[#17191C] font-semibold text-xs rounded-lg transition-colors"
              >
                Buy Both Together
              </button>
            </div>
          </div>
        </div>

        {/* Customer Reviews & Add Review Form */}
        <div className="mt-16 bg-[#101214] border border-[#25282D] rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-xl font-bold text-[#F2F0EA]">Customer Technical Feedback</h3>
              <p className="text-xs text-[#8E959E] mt-1">
                Real performance logs from vehicle owners and field engineers
              </p>
            </div>
          </div>

          {/* Reviews list */}
          <div className="space-y-4 mb-10">
            {reviewsList.map((rev) => (
              <div key={rev.id} className="bg-[#17191C] border border-[#25282D] p-5 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#F2F0EA]">{rev.author}</span>
                    <span className="text-[10px] bg-[#25282D] text-[#D6B98C] px-2 py-0.5 rounded font-mono">
                      Verified Fitment
                    </span>
                  </div>
                  <span className="text-xs text-[#8E959E] font-mono">{rev.date}</span>
                </div>
                <div className="flex items-center gap-1 text-[#D6B98C] mb-2">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <h4 className="text-xs font-semibold text-[#F2F0EA] mb-1">{rev.title}</h4>
                <p className="text-xs text-[#B7BCC2] leading-relaxed">{rev.comment}</p>
                {rev.vehicle && (
                  <div className="text-[11px] font-mono text-[#8E959E] mt-2">
                    Vehicle: {rev.vehicle}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add Review Box */}
          <div className="border-t border-[#25282D] pt-6">
            <h4 className="text-sm font-bold text-[#F2F0EA] mb-4">Submit Your Battery Review</h4>
            <form onSubmit={handleAddReview} className="space-y-4 max-w-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  className="bg-[#17191C] border border-[#343940] text-xs text-[#F2F0EA] px-3 py-2 rounded-lg focus:outline-none focus:border-[#D6B98C]"
                  required
                />
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="bg-[#17191C] border border-[#343940] text-xs text-[#F2F0EA] px-3 py-2 rounded-lg focus:outline-none focus:border-[#D6B98C]"
                >
                  <option value={5}>5 Stars (Exceptional Performance)</option>
                  <option value={4}>4 Stars (Very Good)</option>
                  <option value={3}>3 Stars (Satisfactory)</option>
                </select>
              </div>
              <textarea
                rows={3}
                placeholder="Share your experience (cranking performance, backup duration, technician installation)..."
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                className="w-full bg-[#17191C] border border-[#343940] text-xs text-[#F2F0EA] p-3 rounded-lg focus:outline-none focus:border-[#D6B98C]"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#D6B98C] hover:bg-[#E3CDA7] text-[#17191C] text-xs font-semibold rounded-lg transition-colors"
              >
                Post Review
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      {zoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setZoomOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            <button
              onClick={() => setZoomOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-[#D6B98C] text-xs font-mono"
            >
              [CLICK TO CLOSE]
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
