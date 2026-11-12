import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/layout/ToastContainer';
import { CartDrawer } from './components/cart/CartDrawer';
import { AuthModal } from './components/modals/AuthModal';
import { QuickViewModal } from './components/modals/QuickViewModal';

// Pages
import { HomePage } from './components/home/HomePage';
import { ShopPage } from './components/shop/ShopPage';
import { CategoryPage } from './components/shop/CategoryPage';
import { ProductDetailPage } from './components/product/ProductDetailPage';
import { ComparePage } from './components/compare/ComparePage';
import { CartPage } from './components/cart/CartPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { AccountDashboard } from './components/account/AccountDashboard';
import { OrderTrackingPage } from './components/tracking/OrderTrackingPage';
import { AboutPage } from './components/about/AboutPage';
import { ContactPage } from './components/contact/ContactPage';
import { BlogListPage, BlogDetailPage } from './components/blog/BlogListPage';
import { BuyingGuidePage } from './components/pages/BuyingGuidePage';
import { MaintenanceGuidePage } from './components/pages/MaintenanceGuidePage';
import { FAQPage } from './components/pages/FAQPage';
import { PolicyPages } from './components/pages/PolicyPages';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { NotFoundPage } from './components/pages/NotFoundPage';

import { AnimatePresence } from 'motion/react';
import { PageTransition } from './components/layout/PageTransition';

// Mobile bottom bar icons
import { Home, Grid, ShoppingBag, Truck, User } from 'lucide-react';

const MainContent: React.FC = () => {
  const { page, pageParams, navigate, cartItemCount, setIsCartOpen } = useStore();

  const pageKey = `${page}-${pageParams?.category || ''}-${pageParams?.productId || ''}-${pageParams?.slug || ''}-${pageParams?.type || ''}-${pageParams?.tab || ''}`;

  const renderCurrentPage = () => {
    switch (page) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'category':
        return <CategoryPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'compare':
        return <ComparePage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'account':
        return <AccountDashboard />;
      case 'tracking':
        return <OrderTrackingPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'blog':
        return <BlogListPage />;
      case 'blog-detail':
        return <BlogDetailPage />;
      case 'buying-guide':
        return <BuyingGuidePage />;
      case 'maintenance-guide':
        return <MaintenanceGuidePage />;
      case 'faq':
        return <FAQPage />;
      case 'policy':
        return <PolicyPages />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#17191C] text-[#F2F0EA] selection:bg-[#D6B98C] selection:text-[#17191C]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 pb-16 sm:pb-0 overflow-x-hidden flex flex-col">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition pageKey={pageKey}>
            {renderCurrentPage()}
          </PageTransition>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <AuthModal />
      <QuickViewModal />
      <ToastContainer />

      {/* Mobile Bottom Quick Navigation (Respects 15% mobile viewport cap) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#101214]/95 backdrop-blur-md border-t border-[#25282D] h-14 flex items-center justify-around px-2">
        <button
          onClick={() => navigate('home')}
          className={`flex flex-col items-center justify-center p-1 text-[10px] ${
            page === 'home' ? 'text-[#D6B98C]' : 'text-[#8E959E]'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => navigate('shop')}
          className={`flex flex-col items-center justify-center p-1 text-[10px] ${
            page === 'shop' ? 'text-[#D6B98C]' : 'text-[#8E959E]'
          }`}
        >
          <Grid className="w-4 h-4" />
          <span>Shop</span>
        </button>

        <button
          onClick={() => navigate('tracking')}
          className={`flex flex-col items-center justify-center p-1 text-[10px] ${
            page === 'tracking' ? 'text-[#D6B98C]' : 'text-[#8E959E]'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Track</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center p-1 text-[10px] text-[#8E959E]"
        >
          <ShoppingBag className="w-4 h-4 text-[#D6B98C]" />
          <span>Cart</span>
          {cartItemCount > 0 && (
            <span className="absolute 0 top-0.5 right-2 bg-[#D6B98C] text-[#17191C] text-[9px] font-bold px-1 rounded-full font-mono">
              {cartItemCount}
            </span>
          )}
        </button>

        <button
          onClick={() => navigate('account')}
          className={`flex flex-col items-center justify-center p-1 text-[10px] ${
            page === 'account' ? 'text-[#D6B98C]' : 'text-[#8E959E]'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Account</span>
        </button>
      </nav>
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
