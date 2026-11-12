import React, { useState } from 'react';
import { X, Lock, Mail, Phone, User, Shield, Check, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, registerUser, showToast } = useStore();

  const [mode, setMode] = useState<'login' | 'register' | 'otp' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [role, setRole] = useState<'customer' | 'admin'>('customer');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Trigger OTP simulation
    setMode('otp');
    showToast(`Simulation: 4-digit OTP sent to ${email}`, 'info');
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role);
    setIsAuthModalOpen(false);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      registerUser(name.trim(), email.trim(), phone.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#101214] border border-[#25282D] rounded-2xl p-6 sm:p-8 shadow-2xl">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-1.5 text-[#8E959E] hover:text-[#F2F0EA] rounded-lg"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-full bg-[#D6B98C]/10 border border-[#D6B98C]/30 flex items-center justify-center mx-auto text-[#D6B98C] mb-3">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-[#F2F0EA]">
            {mode === 'login' && 'Sign In to KINETIX'}
            {mode === 'register' && 'Create Your Account'}
            {mode === 'otp' && 'Verify Mobile OTP'}
            {mode === 'forgot' && 'Reset Password'}
          </h2>
          <p className="text-xs text-[#8E959E] mt-1">
            Access order tracking, warranty certificates, and saved addresses
          </p>
        </div>

        {/* Mode: Login */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#8E959E] font-mono text-[10px] uppercase mb-1">
                Email Address or Mobile
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8E959E] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#17191C] border border-[#343940] text-xs text-[#F2F0EA] pl-9 pr-3 py-2.5 rounded-lg focus:outline-none focus:border-[#D6B98C]"
                />
              </div>
            </div>

            {/* Quick Role Toggle for Testing Admin / Customer */}
            <div className="bg-[#17191C] p-2.5 rounded-lg border border-[#25282D] flex items-center justify-between text-[11px]">
              <span className="text-[#8E959E]">Select Account Role:</span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setRole('customer')}
                  className={`px-2.5 py-1 rounded font-medium ${
                    role === 'customer'
                      ? 'bg-[#D6B98C] text-[#17191C]'
                      : 'text-[#8E959E] hover:text-[#F2F0EA]'
                  }`}
                >
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`px-2.5 py-1 rounded font-medium ${
                    role === 'admin'
                      ? 'bg-[#D6B98C] text-[#17191C]'
                      : 'text-[#8E959E] hover:text-[#F2F0EA]'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#D6B98C] hover:bg-[#E3CDA7] text-[#17191C] font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>Continue with OTP Verification</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between text-[11px] text-[#8E959E] pt-2">
              <button
                type="button"
                onClick={() => setMode('register')}
                className="hover:text-[#D6B98C]"
              >
                New customer? Register
              </button>
              <button
                type="button"
                onClick={() => setMode('forgot')}
                className="hover:text-[#D6B98C]"
              >
                Forgot Password?
              </button>
            </div>
          </form>
        )}

        {/* Mode: OTP Verification */}
        {mode === 'otp' && (
          <form onSubmit={handleOtpVerify} className="space-y-4 text-xs">
            <p className="text-center text-[#B7BCC2] text-xs">
              Enter the 4-digit code sent to <strong className="text-[#F2F0EA]">{email}</strong>
            </p>

            <div className="flex justify-center gap-3 my-4">
              {[0, 1, 2, 3].map((idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  defaultValue={idx === 0 ? '4' : idx === 1 ? '9' : idx === 2 ? '2' : '1'}
                  className="w-12 h-12 text-center text-lg font-bold font-mono bg-[#17191C] border border-[#343940] rounded-lg text-[#D6B98C] focus:outline-none focus:border-[#D6B98C]"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#D6B98C] hover:bg-[#E3CDA7] text-[#17191C] font-semibold rounded-lg transition-colors"
            >
              Verify & Sign In
            </button>

            <button
              type="button"
              onClick={() => setMode('login')}
              className="w-full text-center text-[11px] text-[#8E959E] hover:text-[#F2F0EA]"
            >
              ← Back to Sign In
            </button>
          </form>
        )}

        {/* Mode: Register */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-[#8E959E] font-mono text-[10px] uppercase mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rohan Mehra"
                className="w-full bg-[#17191C] border border-[#343940] text-xs text-[#F2F0EA] px-3 py-2.5 rounded-lg focus:outline-none focus:border-[#D6B98C]"
              />
            </div>
            <div>
              <label className="block text-[#8E959E] font-mono text-[10px] uppercase mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rohan@example.com"
                className="w-full bg-[#17191C] border border-[#343940] text-xs text-[#F2F0EA] px-3 py-2.5 rounded-lg focus:outline-none focus:border-[#D6B98C]"
              />
            </div>
            <div>
              <label className="block text-[#8E959E] font-mono text-[10px] uppercase mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98200 11223"
                className="w-full bg-[#17191C] border border-[#343940] text-xs text-[#F2F0EA] px-3 py-2.5 rounded-lg focus:outline-none focus:border-[#D6B98C]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#D6B98C] hover:bg-[#E3CDA7] text-[#17191C] font-semibold rounded-lg transition-colors mt-2"
            >
              Complete Registration
            </button>

            <button
              type="button"
              onClick={() => setMode('login')}
              className="w-full text-center text-[11px] text-[#8E959E] hover:text-[#F2F0EA]"
            >
              Already have an account? Sign In
            </button>
          </form>
        )}

        {/* Mode: Forgot Password */}
        {mode === 'forgot' && (
          <div className="space-y-4 text-xs text-center">
            <p className="text-[#B7BCC2]">
              Enter your registered email and we will send a password reset link.
            </p>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full bg-[#17191C] border border-[#343940] text-xs text-[#F2F0EA] px-3 py-2.5 rounded-lg focus:outline-none focus:border-[#D6B98C]"
            />
            <button
              onClick={() => {
                showToast('Password reset link sent to your email.');
                setMode('login');
              }}
              className="w-full py-2.5 bg-[#D6B98C] text-[#17191C] font-semibold rounded-lg"
            >
              Send Reset Link
            </button>
            <button
              onClick={() => setMode('login')}
              className="text-[#8E959E] hover:text-[#F2F0EA] text-[11px]"
            >
              ← Back to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
