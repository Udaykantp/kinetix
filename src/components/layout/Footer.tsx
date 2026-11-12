import React, { useState } from 'react';
import {
  PhoneCall,
  Mail,
  MapPin,
  ShieldCheck,
  Send,
  MessageSquare,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Footer: React.FC = () => {
  const { navigate, showToast } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      showToast('Thank you for subscribing to KINETIX Technical Insights.', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#101214] border-t border-[#25282D] text-[#B7BCC2] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Highlight: Emergency & Roadside Battery Helpline Banner */}
        <div className="bg-[#17191C] border border-[#25282D] rounded-xl p-6 mb-16 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#D6B98C]/10 border border-[#D6B98C]/20 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-[#D6B98C]" />
            </div>
            <div>
              <h4 className="text-[#F2F0EA] font-semibold text-base sm:text-lg">
                Emergency 4-Hour Roadside Battery Jumpstart & Replacement
              </h4>
              <p className="text-xs text-[#8E959E] mt-0.5">
                Stranded with a dead battery? Our motorized fleet covers 45+ cities with portable conductance testers.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="tel:18002098899"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25282D] hover:bg-[#343940] text-[#F2F0EA] rounded-lg border border-[#343940] text-xs font-semibold transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-[#D6B98C]" />
              <span>1800 209 8899</span>
            </a>
            <a
              href="https://wa.me/919820199887"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#A87555] hover:bg-[#C9906E] text-white rounded-lg text-xs font-semibold transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>

        {/* 4-Column Main Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Col 1: Brand & Narrative */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#D6B98C] rounded-sm transform rotate-45"></span>
              <span className="text-xl font-bold tracking-tight text-[#F2F0EA]">KINETIX</span>
            </div>
            <p className="text-xs leading-relaxed text-[#8E959E] max-w-sm">
              Engineered without compromise. KINETIX develops and supplies aerospace-grade Lithium Iron Phosphate (LiFePO4), pure-lead AGM, and heavy-cast tubular energy storage systems for high-performance automotive and industrial applications.
            </p>
            <div className="pt-2 text-xs text-[#8E959E] space-y-1.5 font-mono">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D6B98C]" />
                <span>BKC Industrial Complex, Bandra Kurla, Mumbai 400051</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D6B98C]" />
                <span>engineering@kinetixpower.in</span>
              </p>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#F2F0EA] mb-4">
              Battery Collections
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => navigate('category', { category: 'car' })}
                  className="hover:text-[#D6B98C] transition-colors"
                >
                  Car Batteries (AGM / Silver)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('category', { category: 'bike' })}
                  className="hover:text-[#D6B98C] transition-colors"
                >
                  Bike & Two-Wheeler
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('category', { category: 'inverter' })}
                  className="hover:text-[#D6B98C] transition-colors"
                >
                  Tall Tubular Inverters
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('category', { category: 'lithium' })}
                  className="hover:text-[#D6B98C] transition-colors"
                >
                  Lithium LiFePO4 Units
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('category', { category: 'solar' })}
                  className="hover:text-[#D6B98C] transition-colors"
                >
                  C10 Solar Storage
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('category', { category: 'industrial' })}
                  className="hover:text-[#D6B98C] transition-colors"
                >
                  Industrial 48V Banks
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('category', { category: 'accessories' })}
                  className="hover:text-[#D6B98C] transition-colors"
                >
                  Smart Chargers & Cables
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Guides */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#F2F0EA] mb-4">
              Engineering & Support
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => navigate('buying-guide')}
                  className="hover:text-[#D6B98C] transition-colors"
                >
                  Battery Buying Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('maintenance-guide')}
                  className="hover:text-[#D6B98C] transition-colors"
                >
                  Maintenance Checklist
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('tracking')}
                  className="hover:text-[#D6B98C] transition-colors"
                >
                  Track Order & Dispatch
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('compare')}
                  className="hover:text-[#D6B98C] transition-colors"
                >
                  Side-by-Side Comparison
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('blog')}
                  className="hover:text-[#D6B98C] transition-colors"
                >
                  Technical Articles & Whitepapers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('faq')}
                  className="hover:text-[#D6B98C] transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('contact')}
                  className="hover:text-[#D6B98C] transition-colors"
                >
                  Service Centers & Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Newsletter */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#F2F0EA] mb-4">
              Policies & Newsletter
            </h5>
            <ul className="space-y-2 text-xs mb-5">
              <li>
                <button
                  onClick={() => navigate('policy', { type: 'warranty' })}
                  className="hover:text-[#D6B98C] transition-colors"
                >
                  Direct Warranty Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('policy', { type: 'shipping' })}
                  className="hover:text-[#D6B98C] transition-colors"
                >
                  Doorstep Delivery & Shipping
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('policy', { type: 'return' })}
                  className="hover:text-[#D6B98C] transition-colors"
                >
                  Returns, Scrap & Refunds
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('policy', { type: 'privacy' })}
                  className="hover:text-[#D6B98C] transition-colors"
                >
                  Privacy & Data Security
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('policy', { type: 'terms' })}
                  className="hover:text-[#D6B98C] transition-colors"
                >
                  Terms of Supply
                </button>
              </li>
            </ul>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="space-y-2">
              <span className="text-[11px] text-[#8E959E] block">
                Receive technical bulletins & coupon drops
              </span>
              <div className="flex items-center">
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#17191C] border border-[#25282D] text-xs text-[#F2F0EA] px-3 py-2 rounded-l-md focus:outline-none focus:border-[#D6B98C] w-full"
                  required
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="bg-[#D6B98C] hover:bg-[#E3CDA7] text-[#17191C] px-3 py-2 rounded-r-md transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Regulatory, Compliance & Payment Trust Strips */}
        <div className="border-t border-[#25282D] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8E959E]">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#B7BCC2]">
              <ShieldCheck className="w-4 h-4 text-[#D6B98C]" />
              <span>BIS IS 14257:2018 Certified</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>ARAI Automotive Compliant</span>
            <span aria-hidden="true">·</span>
            <span>ISO 9001:2015 Quality Verified</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Emission Lead Recycling</span>
          </div>

          <p className="font-mono text-[11px]">
            © {new Date().getFullYear()} KINETIX Power Technologies Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
