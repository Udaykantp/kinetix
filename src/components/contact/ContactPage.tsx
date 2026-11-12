import React, { useState } from 'react';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useStore();

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formCategory, setFormCategory] = useState('Doorstep Battery Replacement');
  const [formMessage, setFormMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formName.trim() && formEmail.trim() && formMessage.trim()) {
      setSubmitted(true);
      showToast('Inquiry submitted. Our technical coordinator will call within 15 minutes.');
    }
  };

  return (
    <div className="bg-[#17191C] min-h-screen py-16 border-b border-[#25282D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-mono text-[#D6B98C] uppercase tracking-wider mb-2">
            Engineering Support & Field Operations
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#F2F0EA] tracking-tight">
            Connect with KINETIX Power
          </h1>
          <p className="text-sm text-[#B7BCC2] mt-2">
            Need emergency roadside battery fitment, enterprise solar storage consultation, or bulk fleet quotes? Our engineering team is standing by.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Form Left */}
          <div className="lg:col-span-7 bg-[#101214] border border-[#25282D] rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#F2F0EA] mb-6">Send a Technical Inquiry</h2>

            {submitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#D6B98C]/10 border border-[#D6B98C]/30 text-[#D6B98C] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#F2F0EA]">Inquiry Successfully Dispatched</h3>
                <p className="text-xs text-[#8E959E] max-w-sm mx-auto">
                  Ticket #KTX-INQ-{Math.floor(1000 + Math.random() * 9000)} has been assigned to our field operations supervisor.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-[#25282D] text-xs text-[#D6B98C] rounded-lg border border-[#343940]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#8E959E] font-mono text-[10px] uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Vikram Malhotra"
                      className="w-full bg-[#17191C] border border-[#343940] text-xs text-[#F2F0EA] p-2.5 rounded-lg focus:outline-none focus:border-[#D6B98C]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8E959E] font-mono text-[10px] uppercase mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="+91 98200 44521"
                      className="w-full bg-[#17191C] border border-[#343940] text-xs text-[#F2F0EA] p-2.5 rounded-lg focus:outline-none focus:border-[#D6B98C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#8E959E] font-mono text-[10px] uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="vikram@example.com"
                      className="w-full bg-[#17191C] border border-[#343940] text-xs text-[#F2F0EA] p-2.5 rounded-lg focus:outline-none focus:border-[#D6B98C]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8E959E] font-mono text-[10px] uppercase mb-1">
                      Inquiry Nature
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full bg-[#17191C] border border-[#343940] text-xs text-[#F2F0EA] p-2.5 rounded-lg focus:outline-none focus:border-[#D6B98C]"
                    >
                      <option value="Doorstep Battery Replacement">Doorstep Battery Replacement</option>
                      <option value="Solar LiFePO4 Consultation">Solar LiFePO4 Consultation</option>
                      <option value="Commercial Fleet Supply">Commercial Fleet Supply</option>
                      <option value="Warranty Claim or Scrap Buyback">Warranty Claim or Scrap Buyback</option>
                      <option value="Dealership Inquiry">Dealership Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#8E959E] font-mono text-[10px] uppercase mb-1">
                    Your Requirements / Vehicle / Load Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Mention vehicle model (e.g. Creta Diesel 2024), PIN code, or required backup wattage..."
                    className="w-full bg-[#17191C] border border-[#343940] text-xs text-[#F2F0EA] p-2.5 rounded-lg focus:outline-none focus:border-[#D6B98C]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#D6B98C] hover:bg-[#E3CDA7] text-[#17191C] font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry to Field Coordinator</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Details & Regional Hubs Right */}
          <div className="lg:col-span-5 space-y-6">
            {/* Rapid Helpline Card */}
            <div className="bg-[#101214] border border-[#25282D] rounded-2xl p-6 space-y-4 text-xs">
              <h3 className="text-base font-bold text-[#F2F0EA]">Direct Channels</h3>

              <div className="space-y-3">
                <a
                  href="tel:18002098899"
                  className="p-3.5 bg-[#17191C] border border-[#25282D] hover:border-[#D6B98C]/40 rounded-xl flex items-center gap-3.5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#25282D] flex items-center justify-center text-[#D6B98C] shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#8E959E] block">
                      Toll-Free Dispatch (24x7)
                    </span>
                    <span className="text-sm font-bold text-[#F2F0EA] font-mono">
                      1800 209 8899
                    </span>
                  </div>
                </a>

                <a
                  href="https://wa.me/919820199887"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-[#17191C] border border-[#25282D] hover:border-emerald-500/40 rounded-xl flex items-center gap-3.5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-950/40 border border-emerald-800/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#8E959E] block">
                      WhatsApp Quick Dispatch
                    </span>
                    <span className="text-sm font-bold text-[#F2F0EA] font-mono">
                      +91 98201 99887
                    </span>
                  </div>
                </a>

                <div className="p-3.5 bg-[#17191C] border border-[#25282D] rounded-xl flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[#25282D] flex items-center justify-center text-[#D6B98C] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#8E959E] block">
                      Engineering Team
                    </span>
                    <span className="text-xs font-semibold text-[#F2F0EA]">
                      engineering@kinetixpower.in
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-[#8E959E] flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#D6B98C]" />
                <span>Operating Hours: 8:00 AM – 10:00 PM IST (All 7 Days)</span>
              </div>
            </div>

            {/* Interactive Visual Map Card */}
            <div className="bg-[#101214] border border-[#25282D] rounded-2xl p-6 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-[#F2F0EA] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D6B98C]" />
                <span>Regional Engineering Headquarters</span>
              </h3>

              {/* Map representation placeholder graphic */}
              <div className="relative h-44 rounded-xl overflow-hidden bg-[#17191C] border border-[#25282D] flex items-center justify-center">
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#B7BCC2_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="relative text-center space-y-2 z-10 p-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#25282D] border border-[#D6B98C]/30 rounded-md text-[11px] font-mono text-[#D6B98C]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>BKC Commercial Hub, Mumbai (19.0657° N, 72.8687° E)</span>
                  </div>
                  <p className="text-[11px] text-[#8E959E]">
                    Central testing lab with motorized rapid-response dispatch centers in 45+ cities
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-[#8E959E] text-[11px] font-mono">
                <p>• <strong>Bengaluru:</strong> Sigma Tech Park, Electronic City Phase 1</p>
                <p>• <strong>Delhi NCR:</strong> Barakhamba Road, Connaught Place</p>
                <p>• <strong>Pune:</strong> Hinjewadi IT Park Phase 2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
