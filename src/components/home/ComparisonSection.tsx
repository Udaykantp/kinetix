import React from 'react';
import { ArrowRight, Check, X, Shield, Zap } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ComparisonSection: React.FC = () => {
  const { navigate, products } = useStore();

  const compData = [
    {
      feature: 'Cycle Life (@ 80% DoD)',
      flooded: '800 - 1,200 Cycles',
      agm: '2,500 - 3,200 Cycles',
      lithium: '6,000 - 8,000 Cycles',
    },
    {
      feature: 'Cold Cranking Current (CCA)',
      flooded: '350 - 500 A',
      agm: '720 - 800 A (Instant)',
      lithium: 'High Surge Pulse',
    },
    {
      feature: 'Recharge Time to 100%',
      flooded: '10 - 14 Hours',
      agm: '4 - 6 Hours',
      lithium: '1.5 - 2.5 Hours',
    },
    {
      feature: 'Maintenance & Water Top-up',
      flooded: 'Frequent (3-4 Months)',
      agm: 'Zero Maintenance Sealed',
      lithium: 'Zero Maintenance',
    },
    {
      feature: 'Usable Energy Capacity',
      flooded: '50% Max Safe Depth',
      agm: '70% Usable Capacity',
      lithium: '90% - 95% Usable Capacity',
    },
    {
      feature: 'Doorstep Warranty',
      flooded: '24 - 36 Months',
      agm: '60 - 72 Months',
      lithium: '84 - 120 Months',
    },
  ];

  return (
    <section className="py-20 bg-[#17191C] border-b border-[#25282D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-mono text-[#D6B98C] uppercase tracking-wider mb-2">
              Performance Benchmark
            </div>
            <h2 className="text-3xl font-bold text-[#F2F0EA] tracking-tight">
              Compare Battery Chemistries
            </h2>
          </div>
          <button
            onClick={() => navigate('compare')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#25282D] hover:bg-[#343940] text-[#D6B98C] border border-[#343940] rounded-lg text-xs font-semibold transition-colors"
          >
            <span>Open Interactive Product Comparator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Clean Spec Table */}
        <div className="overflow-x-auto bg-[#101214] border border-[#25282D] rounded-xl">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#25282D] bg-[#17191C]/50 text-[#8E959E] font-mono uppercase tracking-wider">
                <th className="py-4 px-6 font-semibold">Technical Parameter</th>
                <th className="py-4 px-6 font-semibold text-[#8E959E]">Standard Flooded</th>
                <th className="py-4 px-6 font-semibold text-[#B7BCC2]">KINETIX Pure Lead AGM</th>
                <th className="py-4 px-6 font-semibold text-[#D6B98C]">KINETIX LiFePO4 Lithium</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#25282D] text-[#B7BCC2]">
              {compData.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#17191C]/60 transition-colors">
                  <td className="py-4 px-6 font-semibold text-[#F2F0EA]">{row.feature}</td>
                  <td className="py-4 px-6 text-[#8E959E]">{row.flooded}</td>
                  <td className="py-4 px-6 text-[#F2F0EA] font-medium">{row.agm}</td>
                  <td className="py-4 px-6 text-[#D6B98C] font-semibold">{row.lithium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
