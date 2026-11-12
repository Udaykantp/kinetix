import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  ProductCategory,
  CartItem,
  Coupon,
  Order,
  OrderStatus,
  User,
  Address,
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_COUPONS } from '../data/products';

export type PageType =
  | 'home'
  | 'shop'
  | 'category'
  | 'product-detail'
  | 'compare'
  | 'cart'
  | 'checkout'
  | 'account'
  | 'tracking'
  | 'about'
  | 'contact'
  | 'blog'
  | 'blog-detail'
  | 'faq'
  | 'buying-guide'
  | 'maintenance-guide'
  | 'policy'
  | 'admin';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface StoreContextType {
  // Navigation
  page: PageType;
  pageParams: Record<string, any>;
  navigate: (newPage: PageType, params?: Record<string, any>) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  getProductById: (productId: string) => Product | undefined;

  // Search & Filters
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTax: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;
  cartItemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Coupon
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  // Comparison
  comparisonList: Product[];
  addToComparison: (product: Product) => boolean;
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;
  isInComparison: (productId: string) => boolean;

  // User & Auth
  user: User | null;
  login: (email: string, role?: 'customer' | 'admin') => void;
  logout: () => void;
  registerUser: (name: string, email: string, phone: string) => void;
  updateSavedAddresses: (addresses: Address[]) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  // Orders
  orders: Order[];
  placeOrder: (details: {
    shippingAddress: Address;
    paymentMethod: 'UPI' | 'Card' | 'Net Banking' | 'Cash on Delivery';
    deliverySpeed?: string;
    notes?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  getOrderById: (orderId: string) => Order | undefined;

  // Quick View
  quickViewProduct: Product | null;
  setQuickViewProduct: (p: Product | null) => void;

  // Toast
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;

  // Utilities
  checkPincode: (pin: string) => {
    deliverable: boolean;
    city: string;
    state: string;
    estimateDays: number;
    expressAvailable: boolean;
  };
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const SEED_ORDERS: Order[] = [
  {
    id: 'KTX-89214',
    date: '2026-03-01T10:15:00Z',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        priceAtPurchase: 9499,
      },
    ],
    subtotal: 9499,
    tax: 1709,
    discount: 1424,
    shipping: 0,
    total: 9784,
    status: 'Delivered',
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    shippingAddress: {
      fullName: 'Vikram Malhotra',
      phone: '+91 98201 44521',
      email: 'vikram.m@example.com',
      addressLine1: 'Flat 402, Titanium Palms, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pinCode: '400050',
    },
    trackingNumber: 'BLUEDART-KTX-90812',
    carrier: 'Blue Dart Smart Velocity',
    estimatedDelivery: 'Delivered on March 02, 2026',
    statusHistory: [
      {
        status: 'Order Placed',
        timestamp: 'March 01, 2026 - 10:15 AM',
        note: 'Payment verified via Razorpay UPI.',
      },
      {
        status: 'Quality Testing',
        timestamp: 'March 01, 2026 - 11:30 AM',
        note: 'Terminal voltage tested at 12.82V. Impedance verified.',
      },
      {
        status: 'Dispatched',
        timestamp: 'March 01, 2026 - 02:45 PM',
        note: 'Handed to express logistics hub with tamper-proof foam crate.',
      },
      {
        status: 'Out for Delivery',
        timestamp: 'March 02, 2026 - 09:20 AM',
        note: 'Technician Rajesh assigned with digital installation kit.',
      },
      {
        status: 'Delivered',
        timestamp: 'March 02, 2026 - 11:45 AM',
        note: 'Installed in Hyundai Creta with 60M warranty registered.',
      },
    ],
  },
  {
    id: 'KTX-94812',
    date: '2026-03-08T14:30:00Z',
    items: [
      {
        product: INITIAL_PRODUCTS[5],
        quantity: 1,
        priceAtPurchase: 16899,
      },
      {
        product: INITIAL_PRODUCTS[11],
        quantity: 1,
        priceAtPurchase: 1299,
      },
    ],
    subtotal: 18198,
    tax: 3275,
    discount: 2500,
    shipping: 0,
    total: 18973,
    status: 'Dispatched',
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    shippingAddress: {
      fullName: 'Ananya Deshmukh',
      phone: '+91 98450 12894',
      email: 'ananya.d@example.com',
      addressLine1: 'Villa 18, Green Meadows, Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560066',
    },
    trackingNumber: 'DELHIVERY-KTX-33109',
    carrier: 'Delhivery Heavy Cargo Express',
    estimatedDelivery: 'Tomorrow by 4:00 PM',
    statusHistory: [
      {
        status: 'Order Placed',
        timestamp: 'March 08, 2026 - 02:30 PM',
        note: 'Order placed with HDFC Platinum Credit Card.',
      },
      {
        status: 'Processing',
        timestamp: 'March 08, 2026 - 03:00 PM',
        note: 'Electrolyte gravity verified at 1.250 specific gravity.',
      },
      {
        status: 'Dispatched',
        timestamp: 'March 08, 2026 - 06:15 PM',
        note: 'Departed from Bengaluru Hub in specialized heavy cargo vehicle.',
      },
    ],
  },
];

const DEFAULT_USER: User = {
  id: 'usr_premium_1',
  name: 'Udaykant Patel',
  email: 'udaykantp9199@gmail.com',
  phone: '+91 98210 55432',
  role: 'customer',
  addresses: [
    {
      id: 'addr-1',
      fullName: 'Udaykant Patel',
      phone: '+91 98210 55432',
      email: 'udaykantp9199@gmail.com',
      addressLine1: 'B-702, Prestige Titanium Towers, Outer Ring Road',
      addressLine2: 'Near Marathahalli Junction',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560103',
      isDefault: true,
    },
    {
      id: 'addr-2',
      fullName: 'Udaykant Patel (Office / Lab)',
      phone: '+91 98210 55432',
      email: 'udaykantp9199@gmail.com',
      addressLine1: 'Suite 404, Tech Park Sigma, Electronic City Phase 1',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560100',
      isDefault: false,
    },
  ],
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation state
  const [page, setPage] = useState<PageType>('home');
  const [pageParams, setPageParams] = useState<Record<string, any>>({});

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('kinetix_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('kinetix_products', JSON.stringify(products));
  }, [products]);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kinetix_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      { product: INITIAL_PRODUCTS[0], quantity: 1 },
      { product: INITIAL_PRODUCTS[11], quantity: 1 },
    ];
  });

  useEffect(() => {
    localStorage.setItem('kinetix_cart', JSON.stringify(cart));
  }, [cart]);

  // Coupon
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(INITIAL_COUPONS[0]);

  // Wishlist
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('kinetix_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [INITIAL_PRODUCTS[5], INITIAL_PRODUCTS[7]];
  });

  useEffect(() => {
    localStorage.setItem('kinetix_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Comparison
  const [comparisonList, setComparisonList] = useState<Product[]>([
    INITIAL_PRODUCTS[0],
    INITIAL_PRODUCTS[1],
  ]);

  // User
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('kinetix_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_USER;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('kinetix_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('kinetix_user');
    }
  }, [user]);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('kinetix_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return SEED_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('kinetix_orders', JSON.stringify(orders));
  }, [orders]);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigate = (newPage: PageType, params: Record<string, any> = {}) => {
    setPage(newPage);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart calculations
  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // 18% GST calculation (standard Indian GST for industrial storage batteries)
  const cartTax = Math.round(cartSubtotal * 0.18);

  let rawDiscount = 0;
  if (appliedCoupon) {
    rawDiscount = Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
    if (appliedCoupon.maxDiscount && rawDiscount > appliedCoupon.maxDiscount) {
      rawDiscount = appliedCoupon.maxDiscount;
    }
  }
  const cartDiscount = rawDiscount;

  // Free shipping above ₹2,500
  const cartShipping = cartSubtotal >= 2500 || cartSubtotal === 0 ? 0 : 350;
  const cartTotal = Math.max(0, cartSubtotal + cartTax - cartDiscount + cartShipping);

  // Cart operations
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to cart`);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    if (item) {
      showToast(`Removed "${item.product.name}" from cart`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  // Coupon handling
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = INITIAL_COUPONS.find((c) => c.code === cleanCode);
    if (!found) {
      return { success: false, message: 'Invalid coupon code. Try VOLT15 or TITANIUM.' };
    }
    if (found.minOrder && cartSubtotal < found.minOrder) {
      return {
        success: false,
        message: `This coupon requires a minimum subtotal of ₹${found.minOrder.toLocaleString('en-IN')}`,
      };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Wishlist operations
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed from Wishlist`, 'info');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved to Wishlist`, 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  // Comparison operations (up to 4 products)
  const addToComparison = (product: Product) => {
    if (comparisonList.some((p) => p.id === product.id)) {
      showToast('Product already in comparison list', 'info');
      return false;
    }
    if (comparisonList.length >= 4) {
      showToast('You can compare up to 4 batteries at a time.', 'error');
      return false;
    }
    setComparisonList((prev) => [...prev, product]);
    showToast(`Added ${product.name} to comparison`, 'success');
    return true;
  };

  const removeFromComparison = (productId: string) => {
    setComparisonList((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  const isInComparison = (productId: string) => {
    return comparisonList.some((p) => p.id === productId);
  };

  // User auth actions
  const login = (email: string, role: 'customer' | 'admin' = 'customer') => {
    const dummyUser: User = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0],
      email,
      phone: '+91 98210 55432',
      role,
      addresses: DEFAULT_USER.addresses,
    };
    setUser(dummyUser);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${dummyUser.name}! (${role === 'admin' ? 'Admin Access' : 'Verified'})`);
  };

  const logout = () => {
    setUser(null);
    showToast('Logged out successfully', 'info');
  };

  const registerUser = (name: string, email: string, phone: string) => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email,
      phone,
      role: 'customer',
      addresses: [],
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    showToast(`Account created! Welcome to KINETIX Power, ${name}.`);
  };

  const updateSavedAddresses = (addresses: Address[]) => {
    if (user) {
      setUser({ ...user, addresses });
      showToast('Delivery addresses updated');
    }
  };

  // Product CRUD (For Admin & catalog updates)
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `ktx-custom-${Date.now()}`;
    const product: Product = { ...newProd, id };
    setProducts((prev) => [product, ...prev]);
    showToast(`Product "${product.name}" created!`);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Product "${updated.name}" updated!`);
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed from catalog', 'info');
  };

  const getProductById = (productId: string) => {
    return products.find((p) => p.id === productId);
  };

  // Orders
  const placeOrder = ({
    shippingAddress,
    paymentMethod,
  }: {
    shippingAddress: Address;
    paymentMethod: 'UPI' | 'Card' | 'Net Banking' | 'Cash on Delivery';
  }): Order => {
    const orderId = `KTX-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toISOString(),
      items: cart.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        priceAtPurchase: item.product.price,
      })),
      subtotal: cartSubtotal,
      tax: cartTax,
      discount: cartDiscount,
      shipping: cartShipping,
      total: cartTotal,
      status: 'Order Placed',
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending COD' : 'Paid',
      shippingAddress,
      trackingNumber: `TRACK-${orderId}-${Math.floor(100 + Math.random() * 900)}`,
      carrier: 'KINETIX SuperFast Verified Logistics',
      estimatedDelivery: 'Within 24-48 Hours',
      statusHistory: [
        {
          status: 'Order Placed',
          timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
          note: `Order received and confirmed via ${paymentMethod}.`,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status,
            statusHistory: [
              ...ord.statusHistory,
              {
                status,
                timestamp: new Date().toLocaleString('en-IN', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                }),
                note: note || `Status updated to ${status}.`,
              },
            ],
          };
        }
        return ord;
      })
    );
    showToast(`Order ${orderId} updated to ${status}`);
  };

  const getOrderById = (orderId: string) => {
    return orders.find(
      (o) =>
        o.id.toLowerCase() === orderId.toLowerCase() ||
        o.trackingNumber.toLowerCase() === orderId.toLowerCase()
    );
  };

  // Indian Pincode delivery checker logic
  const checkPincode = (pin: string) => {
    const clean = pin.trim();
    if (!/^\d{6}$/.test(clean)) {
      return {
        deliverable: false,
        city: '',
        state: '',
        estimateDays: 0,
        expressAvailable: false,
      };
    }
    const prefix = clean.substring(0, 2);
    const pinMap: Record<string, { city: string; state: string; days: number; express: boolean }> =
      {
        '40': { city: 'Mumbai', state: 'Maharashtra', days: 1, express: true },
        '41': { city: 'Pune', state: 'Maharashtra', days: 1, express: true },
        '11': { city: 'New Delhi', state: 'Delhi NCR', days: 1, express: true },
        '12': { city: 'Gurugram / Faridabad', state: 'Haryana', days: 1, express: true },
        '20': { city: 'Noida / Ghaziabad', state: 'Uttar Pradesh', days: 1, express: true },
        '56': { city: 'Bengaluru', state: 'Karnataka', days: 1, express: true },
        '50': { city: 'Hyderabad', state: 'Telangana', days: 1, express: true },
        '60': { city: 'Chennai', state: 'Tamil Nadu', days: 2, express: true },
        '70': { city: 'Kolkata', state: 'West Bengal', days: 2, express: false },
        '38': { city: 'Ahmedabad', state: 'Gujarat', days: 2, express: true },
        '30': { city: 'Jaipur', state: 'Rajasthan', days: 2, express: false },
        '68': { city: 'Kochi', state: 'Kerala', days: 2, express: false },
        '44': { city: 'Nagpur', state: 'Maharashtra', days: 2, express: false },
        '80': { city: 'Patna', state: 'Bihar', days: 3, express: false },
      };

    const found = pinMap[prefix];
    if (found) {
      return {
        deliverable: true,
        city: found.city,
        state: found.state,
        estimateDays: found.days,
        expressAvailable: found.express,
      };
    }
    return {
      deliverable: true,
      city: 'Standard Zone Area',
      state: 'Pan-India',
      estimateDays: 3,
      expressAvailable: false,
    };
  };

  return (
    <StoreContext.Provider
      value={{
        page,
        pageParams,
        navigate,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        searchQuery,
        setSearchQuery,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartTax,
        cartDiscount,
        cartShipping,
        cartTotal,
        cartItemCount,
        isCartOpen,
        setIsCartOpen,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        comparisonList,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
        user,
        login,
        logout,
        registerUser,
        updateSavedAddresses,
        isAuthModalOpen,
        setIsAuthModalOpen,
        orders,
        placeOrder,
        updateOrderStatus,
        getOrderById,
        quickViewProduct,
        setQuickViewProduct,
        toasts,
        showToast,
        dismissToast,
        checkPincode,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
