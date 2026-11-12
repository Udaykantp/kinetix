import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Gauge, Flame, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Hero: React.FC = () => {
  const { navigate } = useStore();

  return (
    <section className="relative bg-[#17191C] overflow-hidden border-b border-[#25282D]">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D6B98C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#A87555]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Narrative */}
          <div className="lg:col-span-6 space-y-6 z-10">
            {/* Quiet technical kicker */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#D6B98C] tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6B98C]"></span>
              <span>Next-Generation Energy Engineering</span>
              <span aria-hidden="true" className="text-[#343940]">·</span>
              <span className="text-[#B7BCC2]">Automotive & Industrial</span>
            </div>

            {/* Apple/Automotive-tier Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F2F0EA] leading-[1.08] text-balance">
              ENERGY WITHOUT COMPROMISE.
            </h1>

            {/* Supporting description */}
            <p className="text-base sm:text-lg text-[#B7BCC2] leading-relaxed max-w-xl">
              Discover advanced battery solutions engineered for reliability, endurance, and the power to move everything forward—from luxury automotive start-stop powertrains to high-voltage solar microgrids.
            </p>

            {/* High-Intent CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigate('shop')}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#D6B98C] hover:bg-[#E3CDA7] text-[#17191C] text-sm font-semibold rounded-lg transition-colors shadow-lg"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const elem = document.getElementById('compatibility-finder');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  else navigate('shop');
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25282D] hover:bg-[#343940] text-[#F2F0EA] border border-[#343940] text-sm font-semibold rounded-lg transition-colors"
              >
                <Zap className="w-4 h-4 text-[#D6B98C]" />
                <span>Find Your Battery</span>
              </button>
            </div>

            {/* Subtle verification points */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#8E959E] border-t border-[#25282D]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D6B98C]" />
                <span className="text-[#F2F0EA]">Doorstep 4-Hour Fitment</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D6B98C]" />
                <span className="text-[#F2F0EA]">Instant Old Scrap Rebate</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D6B98C]" />
                <span className="text-[#F2F0EA]">Up to 120M Warranty</span>
              </div>
            </div>
          </div>

          {/* Right Column: Cinematic 3D Battery Showcase */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* Product Frame with metallic border */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#25282D] to-[#17191C] border border-[#343940] shadow-2xl p-2 sm:p-3">
                <img
                  src="/src/assets/images/hero_battery_titanium_1794476148118.jpg"
                  alt="KINETIX Titanium Lithium Battery Unit"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover rounded-xl transition-transform duration-700 hover:scale-[1.02]"
                />

                {/* Floating Top Performance Badge */}
                <div className="absolute top-6 left-6 bg-[#17191C]/90 backdrop-blur-md border border-[#D6B98C]/30 px-3.5 py-1.5 rounded-md text-xs text-[#F2F0EA] flex items-center gap-2 shadow-xl">
                  <div className="w-2 h-2 rounded-full bg-[#D6B98C]" />
                  <span className="font-mono text-[11px] text-[#D6B98C]">TITANIUM ALLOY · 48V 10.5kWh</span>
                </div>

                {/* Floating Bottom Specs Tag */}
                <div className="absolute bottom-6 right-6 hidden sm:flex items-center gap-3 bg-[#17191C]/95 backdrop-blur-md border border-[#343940] px-4 py-2 rounded-lg text-xs shadow-xl">
                  <Gauge className="w-4 h-4 text-[#A87555]" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#8E959E] font-mono">
                      Cycle Endurance
                    </div>
                    <div className="text-xs font-semibold text-[#F2F0EA]">
                      6,000+ Cycles @ 90% DoD
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative technical coordinate callouts */}
              <div className="hidden xl:block absolute -left-6 top-1/2 -translate-y-1/2 bg-[#25282D]/80 backdrop-blur-md border border-[#343940] p-3 rounded-lg text-[11px] font-mono text-[#B7BCC2] space-y-1">
                <div className="text-[#D6B98C] font-semibold">ESR &lt; 0.8 mΩ</div>
                <div className="text-[#8E959E]">Active Balance BMS</div>
                <div className="text-[#8E959E]">IP67 Heavy Casing</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Metric Full-Width Engineering Strip */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-[#25282D] grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#D6B98C] tabular-nums">
              45+ Cities
            </div>
            <div className="text-xs text-[#8E959E] mt-1">
              Guaranteed 4-hour express doorstep delivery and testing.
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#F2F0EA] tabular-nums">
              760 CCA
            </div>
            <div className="text-xs text-[#8E959E] mt-1">
              Instant sub-zero automotive ignition performance.
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#D6B98C] tabular-nums">
              10 Years
            </div>
            <div className="text-xs text-[#8E959E] mt-1">
              Direct manufacturer warranty on commercial LiFePO4 packs.
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#F2F0EA] tabular-nums">
              100% Recycled
            </div>
            <div className="text-xs text-[#8E959E] mt-1">
              Direct scrap exchange rebate with certified zero-effluent smelting.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
