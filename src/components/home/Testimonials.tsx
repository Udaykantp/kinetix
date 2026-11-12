import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Rajesh K. Nambiar',
    role: 'Fleet Operations Director',
    company: 'Apex Logistics & Cold Chain (Pune)',
    application: 'Automotive AGM Fleet',
    text: 'We converted 42 refrigerated delivery vehicles to KINETIX AGM Ultra-75 units. Over 14 months of high-temperature stop-and-go runs across Maharashtra, battery-related downtime dropped by 94%, with zero alternator failure reports.',
    metric: '94% Reduction in Fleet Downtime',
  },
  {
    name: 'Dr. Shruti Somani',
    role: 'Solar Engineering Consultant',
    company: 'Helios Clean Energy (Bengaluru)',
    application: 'Solaris 5.12kWh Wall Mount',
    text: 'The integrated smart CAN-bus telemetry in the Solaris LiFePO4 packs synced seamlessly with our Deye hybrid inverters. Our residential clients enjoy genuine 92% depth of discharge with silent operation and zero acid emissions.',
    metric: '92% Usable Daily Solar Yield',
  },
  {
    name: 'Gaurav Singhania',
    role: 'Homeowner & EV Owner',
    company: 'DLF Phase 5 (Gurugram)',
    application: 'PowerCore+ 220Ah Tubular',
    text: 'During peak northern summer power cuts lasting over 6 hours, our PowerCore+ 220Ah kept our refrigerator, fans, and home office systems running without a flicker. The technician arrived within 2.5 hours of order placement.',
    metric: '6.5 Hours Sustained Backup Load',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-[#101214] border-b border-[#25282D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono text-[#D6B98C] uppercase tracking-wider mb-2">
            Engineering Verification in the Field
          </div>
          <h2 className="text-3xl font-bold text-[#F2F0EA] tracking-tight">
            Trusted by Critical Facilities & Fleet Operators
          </h2>
          <p className="text-sm text-[#B7BCC2] mt-2">
            Verifiable customer operational outcomes across logistics, healthcare, and residential
            microgrids.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#17191C] border border-[#25282D] rounded-xl p-7 flex flex-col justify-between"
            >
              <div>
                {/* Metric pill-free highlight */}
                <div className="text-xs font-mono font-semibold text-[#D6B98C] mb-4 pb-3 border-b border-[#25282D]">
                  {item.metric}
                </div>

                <p className="text-xs text-[#B7BCC2] leading-relaxed italic">
                  "{item.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#25282D] flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-[#F2F0EA]">{item.name}</div>
                  <div className="text-[11px] text-[#8E959E]">{item.role}</div>
                  <div className="text-[10px] text-[#8E959E] font-mono">{item.company}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-[#D6B98C] uppercase">
                    {item.application}
                  </div>
                  <div className="flex items-center gap-0.5 text-[#D6B98C] mt-1 justify-end">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
