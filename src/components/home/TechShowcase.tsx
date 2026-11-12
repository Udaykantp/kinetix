import React from 'react';
import { Cpu, ShieldCheck, Zap, Gauge, Layers, Thermometer } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const TechShowcase: React.FC = () => {
  const { navigate } = useStore();

  return (
    <section className="py-20 bg-[#101214] border-b border-[#25282D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-mono text-[#D6B98C] uppercase tracking-wider mb-2">
            Materials & Chemical Innovation
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F2F0EA] tracking-tight">
            Battery Architecture Engineered to Outlast
          </h2>
          <p className="text-sm sm:text-base text-[#B7BCC2] mt-3 leading-relaxed">
            Every cell chemistry and mechanical chassis is engineered in our ISO 9001 testing
            facilities to survive the most punishing thermal environments and extreme load cycles.
          </p>
        </div>

        {/* 3 Large Architectural Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pillar 1: AGM */}
          <div className="bg-[#17191C] border border-[#25282D] rounded-xl p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#25282D] border border-[#343940] flex items-center justify-center text-[#D6B98C]">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#F2F0EA]">Pure Lead-Tin AGM</h3>
              <p className="text-xs text-[#B7BCC2] leading-relaxed">
                Absorbent Glass Mat micro-porous separators compress sulfuric acid electrolyte,
                eliminating plate paste shedding during harsh vibrations. Delivers up to 760 Cold
                Cranking Amps for instant cold starts.
              </p>

              <div className="space-y-2 pt-2 border-t border-[#25282D] text-xs font-mono text-[#8E959E]">
                <div className="flex justify-between">
                  <span>Compression Pressure</span>
                  <span className="text-[#F2F0EA]">45 kPa High-VRLA</span>
                </div>
                <div className="flex justify-between">
                  <span>Internal Impedance</span>
                  <span className="text-[#F2F0EA]">&lt; 2.4 mΩ</span>
                </div>
                <div className="flex justify-between">
                  <span>Start-Stop Durability</span>
                  <span className="text-[#F2F0EA]">3x Standard Wet Cell</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('category', { category: 'car' })}
              className="mt-6 text-xs font-semibold text-[#D6B98C] hover:text-[#E3CDA7] flex items-center gap-1.5 transition-colors"
            >
              <span>Explore Automotive AGM Units</span>
              <span>→</span>
            </button>
          </div>

          {/* Pillar 2: LiFePO4 */}
          <div className="bg-[#17191C] border border-[#D6B98C]/30 rounded-xl p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#D6B98C] text-[#17191C] font-mono text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase">
              Flagship Tech
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#25282D] border border-[#D6B98C]/40 flex items-center justify-center text-[#D6B98C]">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#F2F0EA]">Prismatic LiFePO4</h3>
              <p className="text-xs text-[#B7BCC2] leading-relaxed">
                Aerospace-grade Lithium Iron Phosphate with zero cobalt. Features active balancing
                battery management systems (BMS), thermal runaway isolation up to 270°C, and 6,000+
                deep discharge cycles.
              </p>

              <div className="space-y-2 pt-2 border-t border-[#25282D] text-xs font-mono text-[#8E959E]">
                <div className="flex justify-between">
                  <span>Usable Energy Depth</span>
                  <span className="text-[#D6B98C]">90% - 95% DoD</span>
                </div>
                <div className="flex justify-between">
                  <span>Recharge Velocity</span>
                  <span className="text-[#D6B98C]">100% in 2.0 Hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Lifespan Projection</span>
                  <span className="text-[#D6B98C]">12 - 15 Years Service</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('category', { category: 'lithium' })}
              className="mt-6 text-xs font-semibold text-[#D6B98C] hover:text-[#E3CDA7] flex items-center gap-1.5 transition-colors"
            >
              <span>Explore Lithium Wall & Rack Units</span>
              <span>→</span>
            </button>
          </div>

          {/* Pillar 3: Heavy Cast Spine Tubular */}
          <div className="bg-[#17191C] border border-[#25282D] rounded-xl p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#25282D] border border-[#343940] flex items-center justify-center text-[#A87555]">
                <Gauge className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#F2F0EA]">HADI Tall Tubular</h3>
              <p className="text-xs text-[#B7BCC2] leading-relaxed">
                High-pressure 100-bar cast spine tubes hold active chemical material securely against
                electrolyte erosion during long power cuts. Low-antimony alloy reduces water top-up
                intervals to once a year.
              </p>

              <div className="space-y-2 pt-2 border-t border-[#25282D] text-xs font-mono text-[#8E959E]">
                <div className="flex justify-between">
                  <span>Casting Pressure</span>
                  <span className="text-[#F2F0EA]">100 Bar Dense Matrix</span>
                </div>
                <div className="flex justify-between">
                  <span>Top-up Frequency</span>
                  <span className="text-[#F2F0EA]">1x per 12 Months</span>
                </div>
                <div className="flex justify-between">
                  <span>Deep Cycle Rating</span>
                  <span className="text-[#F2F0EA]">1,800 Cycles @ 80%</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('category', { category: 'inverter' })}
              className="mt-6 text-xs font-semibold text-[#D6B98C] hover:text-[#E3CDA7] flex items-center gap-1.5 transition-colors"
            >
              <span>Explore Inverter Batteries</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
