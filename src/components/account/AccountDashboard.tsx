import React, { useState } from 'react';
import {
  User as UserIcon,
  Package,
  Heart,
  MapPin,
  Shield,
  Star,
  LogOut,
  Plus,
  Trash2,
  ExternalLink,
  ShoppingBag,
  RotateCcw,
  CheckCircle2,
  FileText,
  Download,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Address, Order } from '../../types';

export const AccountDashboard: React.FC = () => {
  const {
    user,
    orders,
    wishlist,
    toggleWishlist,
    addToCart,
    logout,
    updateSavedAddresses,
    navigate,
    showToast,
    pageParams,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'profile' | 'returns'>(
    pageParams?.tab || 'orders'
  );

  // Return request modal
  const [returnOrderId, setReturnOrderId] = useState<string | null>(null);
  const [returnReason, setReturnReason] = useState('Old battery scrap exchange rebate issue');

  // Address modal
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddrName, setNewAddrName] = useState('');
  const [newAddrPhone, setNewAddrPhone] = useState('');
  const [newAddrStreet, setNewAddrStreet] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('');
  const [newAddrState, setNewAddrState] = useState('');
  const [newAddrPin, setNewAddrPin] = useState('');

  // Invoice viewer modal
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);

  if (!user) {
    return (
      <div className="bg-[#17191C] min-h-screen py-20 text-center">
        <h2 className="text-xl font-bold text-[#F2F0EA]">Please Sign In</h2>
        <p className="text-xs text-[#8E959E] mt-2">
          You need to be signed in to view your orders and warranty certificates.
        </p>
        <button
          onClick={() => useStore().setIsAuthModalOpen(true)}
          className="mt-6 px-6 py-2.5 bg-[#D6B98C] text-[#17191C] text-xs font-semibold rounded-lg"
        >
          Sign In
        </button>
      </div>
    );
  }

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAddrName && newAddrStreet && newAddrPin) {
      const newAddress: Address = {
        id: `addr-${Date.now()}`,
        fullName: newAddrName,
        phone: newAddrPhone || user.phone,
        email: user.email,
        addressLine1: newAddrStreet,
        city: newAddrCity || 'Mumbai',
        state: newAddrState || 'Maharashtra',
        pinCode: newAddrPin,
        isDefault: user.addresses.length === 0,
      };
      updateSavedAddresses([...user.addresses, newAddress]);
      setShowAddressModal(false);
      setNewAddrName('');
      setNewAddrStreet('');
      setNewAddrPin('');
    }
  };

  const handleDeleteAddress = (id?: string) => {
    if (!id) return;
    const updated = user.addresses.filter((a) => a.id !== id);
    updateSavedAddresses(updated);
  };

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Return & Replacement Ticket initiated for Order ${returnOrderId}. Our engineer will contact you.`, 'success');
    setReturnOrderId(null);
  };

  return (
    <div className="bg-[#17191C] min-h-screen py-10 border-b border-[#25282D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Welcome Banner */}
        <div className="bg-[#101214] border border-[#25282D] rounded-2xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#D6B98C] text-[#17191C] flex items-center justify-center font-bold text-xl font-mono">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-xs font-mono text-[#D6B98C] uppercase tracking-wider">
                {user.role === 'admin' ? 'Master Admin Account' : 'Verified Customer Profile'}
              </div>
              <h1 className="text-2xl font-bold text-[#F2F0EA]">{user.name}</h1>
              <p className="text-xs text-[#8E959E]">{user.email} · {user.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user.role === 'admin' && (
              <button
                onClick={() => navigate('admin')}
                className="px-4 py-2 bg-[#25282D] hover:bg-[#343940] text-[#D6B98C] border border-[#D6B98C]/40 text-xs font-semibold rounded-lg font-mono flex items-center gap-1.5"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Console</span>
              </button>
            )}
            <button
              onClick={logout}
              className="px-4 py-2 bg-[#25282D] hover:bg-[#343940] text-[#8E959E] hover:text-red-400 border border-[#343940] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* 2-Column: Sidebar Navigation + Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Tabs */}
          <aside className="lg:col-span-3 bg-[#101214] border border-[#25282D] rounded-xl p-3 text-xs space-y-1">
            {[
              { id: 'orders', label: 'My Orders & Warranties', icon: Package, badge: orders.length },
              { id: 'wishlist', label: 'Saved Wishlist', icon: Heart, badge: wishlist.length },
              { id: 'addresses', label: 'Delivery Addresses', icon: MapPin, badge: user.addresses.length },
              { id: 'returns', label: 'Returns & Replacements', icon: RotateCcw },
              { id: 'profile', label: 'Profile Security', icon: UserIcon },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#25282D] text-[#D6B98C] font-semibold'
                      : 'text-[#B7BCC2] hover:text-[#F2F0EA] hover:bg-[#17191C]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#D6B98C]" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="font-mono text-[10px] bg-[#17191C] px-1.5 py-0.5 rounded text-[#D6B98C]">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </aside>

          {/* Main Tab Content */}
          <div className="lg:col-span-9">
            {/* TAB: ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-[#F2F0EA]">Order History & Dispatches</h2>
                  <span className="text-xs font-mono text-[#8E959E]">{orders.length} Orders Recorded</span>
                </div>

                {orders.length === 0 ? (
                  <div className="bg-[#101214] border border-[#25282D] rounded-xl p-10 text-center text-xs">
                    <p className="text-[#8E959E]">You have not placed any battery orders yet.</p>
                  </div>
                ) : (
                  orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-[#101214] border border-[#25282D] rounded-2xl p-6 space-y-5"
                    >
                      {/* Order top bar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#25282D] text-xs">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-[#F2F0EA] text-sm">
                              {ord.id}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#25282D] text-[#D6B98C]">
                              {ord.status}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#8E959E] mt-0.5">
                            Placed on {new Date(ord.date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => navigate('tracking', { orderId: ord.id })}
                            className="px-3 py-1.5 bg-[#25282D] hover:bg-[#343940] text-[#D6B98C] rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-[#343940]"
                          >
                            <span>Live Tracking</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setInvoiceOrder(ord)}
                            className="px-3 py-1.5 bg-[#17191C] hover:bg-[#25282D] text-[#F2F0EA] rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-[#343940]"
                          >
                            <FileText className="w-3.5 h-3.5 text-[#D6B98C]" />
                            <span>Invoice</span>
                          </button>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-3">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex items-center gap-4 text-xs">
                            <img
                              src={it.product.images[0]}
                              alt=""
                              className="w-16 h-16 object-cover rounded-lg bg-[#25282D] shrink-0 border border-[#343940]"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-[#F2F0EA] truncate">{it.product.name}</h4>
                              <p className="text-[#8E959E] font-mono text-[11px]">
                                Qty: {it.quantity} · {it.product.warrantyMonths}M Direct Warranty · {it.product.voltage}
                              </p>
                              <div className="text-[#D6B98C] font-mono font-bold mt-1">
                                ₹{it.priceAtPurchase.toLocaleString('en-IN')}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* History strip */}
                      <div className="bg-[#17191C] border border-[#25282D] p-3 rounded-lg text-[11px] text-[#8E959E] flex items-center justify-between">
                        <div>
                          <span className="text-[#B7BCC2] font-semibold">Latest Update: </span>
                          <span>{ord.statusHistory[ord.statusHistory.length - 1]?.note}</span>
                        </div>
                        <button
                          onClick={() => setReturnOrderId(ord.id)}
                          className="text-[#D6B98C] hover:underline whitespace-nowrap ml-4"
                        >
                          Request Return/Refund
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB: WISHLIST */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-[#F2F0EA]">Saved Wishlist ({wishlist.length})</h2>
                </div>

                {wishlist.length === 0 ? (
                  <div className="bg-[#101214] border border-[#25282D] rounded-xl p-12 text-center text-xs">
                    <Heart className="w-10 h-10 text-[#343940] mx-auto mb-2" />
                    <p className="text-[#8E959E]">Your wishlist is empty.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlist.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#101214] border border-[#25282D] rounded-xl p-4 flex gap-4 items-center justify-between"
                      >
                        <img
                          src={item.images[0]}
                          alt=""
                          className="w-16 h-16 object-cover rounded-lg bg-[#25282D] shrink-0"
                        />
                        <div className="flex-1 min-w-0 text-xs">
                          <h4 className="font-bold text-[#F2F0EA] truncate">{item.name}</h4>
                          <div className="text-xs font-mono text-[#D6B98C] mt-1 font-bold">
                            ₹{item.price.toLocaleString('en-IN')}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => {
                                addToCart(item);
                                toggleWishlist(item);
                              }}
                              className="px-2.5 py-1 bg-[#D6B98C] text-[#17191C] font-semibold text-[11px] rounded"
                            >
                              Move to Cart
                            </button>
                            <button
                              onClick={() => toggleWishlist(item)}
                              className="text-[11px] text-[#8E959E] hover:text-red-400"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-[#F2F0EA]">Saved Fitment Addresses</h2>
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="px-3 py-1.5 bg-[#D6B98C] hover:bg-[#E3CDA7] text-[#17191C] font-semibold text-xs rounded-lg flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Address</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="bg-[#101214] border border-[#25282D] rounded-xl p-5 text-xs space-y-2 relative"
                    >
                      {addr.isDefault && (
                        <span className="text-[10px] font-mono bg-[#25282D] text-[#D6B98C] px-2 py-0.5 rounded">
                          PRIMARY FITMENT ADDRESS
                        </span>
                      )}
                      <h4 className="font-bold text-[#F2F0EA] text-sm">{addr.fullName}</h4>
                      <p className="text-[#B7BCC2] leading-relaxed">
                        {addr.addressLine1}
                        {addr.addressLine2 ? `, ${addr.addressLine2}` : ''}
                      </p>
                      <p className="text-[#8E959E]">
                        {addr.city}, {addr.state} - <strong className="text-[#F2F0EA] font-mono">{addr.pinCode}</strong>
                      </p>
                      <p className="text-[#8E959E]">Phone: {addr.phone}</p>

                      <div className="pt-3 border-t border-[#25282D] flex items-center justify-between">
                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="text-red-400 hover:underline flex items-center gap-1 text-[11px]"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: RETURNS */}
            {activeTab === 'returns' && (
              <div className="bg-[#101214] border border-[#25282D] rounded-2xl p-6 sm:p-8 space-y-5">
                <h2 className="text-lg font-bold text-[#F2F0EA]">Return, Replacement & Warranty Request</h2>
                <p className="text-xs text-[#8E959E]">
                  Every battery includes on-site replacement warranty. If your battery tests defective or you wish to process old scrap buyback:
                </p>

                <div className="space-y-4 max-w-xl text-xs">
                  <div>
                    <label className="block text-[#8E959E] font-mono text-[10px] uppercase mb-1">
                      Order ID for Claim
                    </label>
                    <select
                      value={returnOrderId || ''}
                      onChange={(e) => setReturnOrderId(e.target.value)}
                      className="w-full bg-[#17191C] border border-[#343940] text-xs text-[#F2F0EA] p-2.5 rounded-lg"
                    >
                      <option value="">Select Order...</option>
                      {orders.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.id} - {o.items[0]?.product.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#8E959E] font-mono text-[10px] uppercase mb-1">
                      Reason for Return or Replacement
                    </label>
                    <textarea
                      rows={3}
                      value={returnReason}
                      onChange={(e) => setReturnReason(e.target.value)}
                      className="w-full bg-[#17191C] border border-[#343940] text-xs text-[#F2F0EA] p-2.5 rounded-lg"
                    />
                  </div>

                  <button
                    onClick={handleReturnSubmit}
                    disabled={!returnOrderId}
                    className="px-5 py-2.5 bg-[#D6B98C] text-[#17191C] font-semibold text-xs rounded-lg disabled:opacity-50"
                  >
                    Submit Replacement Request
                  </button>
                </div>
              </div>
            )}

            {/* TAB: PROFILE */}
            {activeTab === 'profile' && (
              <div className="bg-[#101214] border border-[#25282D] rounded-2xl p-6 sm:p-8 space-y-6">
                <h2 className="text-lg font-bold text-[#F2F0EA]">Profile Credentials & Security</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs max-w-xl">
                  <div>
                    <label className="block text-[#8E959E] font-mono text-[10px] uppercase mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="w-full bg-[#17191C] border border-[#343940] text-xs text-[#F2F0EA] p-2.5 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[#8E959E] font-mono text-[10px] uppercase mb-1">
                      Mobile Phone
                    </label>
                    <input
                      type="tel"
                      defaultValue={user.phone}
                      className="w-full bg-[#17191C] border border-[#343940] text-xs text-[#F2F0EA] p-2.5 rounded-lg"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[#8E959E] font-mono text-[10px] uppercase mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      disabled
                      defaultValue={user.email}
                      className="w-full bg-[#17191C] border border-[#343940] text-xs text-[#8E959E] p-2.5 rounded-lg opacity-70"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#25282D]">
                  <h3 className="text-sm font-semibold text-[#F2F0EA] mb-2">Change Password</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs max-w-xl">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="bg-[#17191C] border border-[#343940] text-xs text-[#F2F0EA] p-2.5 rounded-lg"
                    />
                    <input
                      type="password"
                      placeholder="New Secure Password"
                      className="bg-[#17191C] border border-[#343940] text-xs text-[#F2F0EA] p-2.5 rounded-lg"
                    />
                  </div>
                  <button
                    onClick={() => showToast('Security password updated successfully.')}
                    className="mt-3 px-4 py-2 bg-[#25282D] hover:bg-[#343940] text-[#D6B98C] border border-[#343940] rounded-lg text-xs font-semibold"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#101214] border border-[#25282D] rounded-2xl p-6 max-w-md w-full text-xs space-y-4">
            <h3 className="text-sm font-bold text-[#F2F0EA]">Add Delivery Address</h3>
            <form onSubmit={handleAddNewAddress} className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={newAddrName}
                onChange={(e) => setNewAddrName(e.target.value)}
                className="w-full bg-[#17191C] border border-[#343940] p-2.5 rounded-lg text-[#F2F0EA]"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={newAddrPhone}
                onChange={(e) => setNewAddrPhone(e.target.value)}
                className="w-full bg-[#17191C] border border-[#343940] p-2.5 rounded-lg text-[#F2F0EA]"
              />
              <input
                type="text"
                placeholder="Street Address, Building, Floor"
                required
                value={newAddrStreet}
                onChange={(e) => setNewAddrStreet(e.target.value)}
                className="w-full bg-[#17191C] border border-[#343940] p-2.5 rounded-lg text-[#F2F0EA]"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="City"
                  value={newAddrCity}
                  onChange={(e) => setNewAddrCity(e.target.value)}
                  className="bg-[#17191C] border border-[#343940] p-2.5 rounded-lg text-[#F2F0EA]"
                />
                <input
                  type="text"
                  placeholder="6-digit PIN"
                  required
                  value={newAddrPin}
                  onChange={(e) => setNewAddrPin(e.target.value)}
                  className="bg-[#17191C] border border-[#343940] p-2.5 rounded-lg text-[#F2F0EA]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="px-3 py-2 text-[#8E959E]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D6B98C] text-[#17191C] font-bold rounded-lg"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Viewer Modal */}
      {invoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#101214] border border-[#25282D] rounded-2xl p-6 sm:p-8 max-w-lg w-full text-xs space-y-4">
            <div className="flex justify-between items-start border-b border-[#25282D] pb-4">
              <div>
                <span className="font-mono text-sm font-bold text-[#D6B98C]">
                  TAX INVOICE · {invoiceOrder.id}
                </span>
                <p className="text-[#8E959E] text-[11px] mt-0.5">
                  GSTIN: 27AABCK9821L1Z0 · KINETIX Power Technologies
                </p>
              </div>
              <button
                onClick={() => setInvoiceOrder(null)}
                className="text-[#8E959E] hover:text-[#F2F0EA]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-[#B7BCC2]">
              <div className="flex justify-between">
                <span>Customer:</span>
                <span className="text-[#F2F0EA] font-semibold">
                  {invoiceOrder.shippingAddress.fullName}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Address:</span>
                <span className="text-[#F2F0EA] text-right">
                  {invoiceOrder.shippingAddress.city}, {invoiceOrder.shippingAddress.state} -{' '}
                  {invoiceOrder.shippingAddress.pinCode}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Payment:</span>
                <span className="text-[#D6B98C] font-mono">
                  {invoiceOrder.paymentMethod} (Verified)
                </span>
              </div>
            </div>

            <div className="border-t border-[#25282D] pt-3 space-y-2">
              {invoiceOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>
                    {it.product.name} (x{it.quantity})
                  </span>
                  <span className="font-mono text-[#F2F0EA]">
                    ₹{(it.priceAtPurchase * it.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
              <div className="flex justify-between text-[#8E959E]">
                <span>18% Integrated GST</span>
                <span className="font-mono">₹{invoiceOrder.tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#F2F0EA] border-t border-[#25282D] pt-2">
                <span>Total Invoice Value</span>
                <span className="text-[#D6B98C] font-mono">
                  ₹{invoiceOrder.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                showToast('Invoice downloaded to PDF format.');
                setInvoiceOrder(null);
              }}
              className="w-full py-2.5 bg-[#D6B98C] text-[#17191C] font-bold rounded-lg flex items-center justify-center gap-2 mt-4"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Tax Invoice</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
