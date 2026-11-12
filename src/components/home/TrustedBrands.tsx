import React from 'react';
import { ShieldCheck, Award, CheckCircle } from 'lucide-react';

export const TrustedBrands: React.FC = () => {
  const brands = [
    'KINETIX ADVANCED LAB',
    'AMARON HI-LIFE',
    'EXIDE TECHNOLOGIES',
    'LUMINOUS POWER',
    'SOLARIS CLEAN TECH',
    'POWERGRID INDUSTRIAL',
  ];

  return (
    <section className="py-12 bg-[#17191C] border-b border-[#25282D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="text-xs font-mono uppercase tracking-widest text-[#8E959E]">
            Authorized Direct Manufacturer Distribution & Testing
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              className="py-4 px-3 bg-[#25282D]/40 border border-[#343940]/50 rounded-lg text-center"
            >
              <span className="text-xs font-bold tracking-wider text-[#B7BCC2] font-mono">
                {brand}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-[#25282D] flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#8E959E] font-mono">
          <span className="flex items-center gap-1.5 text-[#B7BCC2]">
            <ShieldCheck className="w-4 h-4 text-[#D6B98C]" />
            <span>BIS IS 14257:2018 Standard</span>
          </span>
          <span className="flex items-center gap-1.5 text-[#B7BCC2]">
            <Award className="w-4 h-4 text-[#D6B98C]" />
            <span>ARAI Automotive Testing Passed</span>
          </span>
          <span className="flex items-center gap-1.5 text-[#B7BCC2]">
            <CheckCircle className="w-4 h-4 text-[#D6B98C]" />
            <span>ISO 9001:2015 Precision Calibrated</span>
          </span>
          <span className="flex items-center gap-1.5 text-[#B7BCC2]">
            <ShieldCheck className="w-4 h-4 text-[#D6B98C]" />
            <span>IEC 62619 Prismatic Safety</span>
          </span>
        </div>
      </div>
    </section>
  );
};
