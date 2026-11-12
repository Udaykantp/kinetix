import React from 'react';
import {
  Car,
  Bike,
  Zap,
  Sun,
  Server,
  Layers,
  Wrench,
  Cpu,
  ArrowUpRight,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCategory } from '../../types';

interface CategoryItem {
  id: ProductCategory;
  title: string;
  subtitle: string;
  specs: string;
  icon: React.ElementType;
  image: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'car',
    title: 'Car Batteries',
    subtitle: 'AGM & Silver-Alloy start-stop ignition units',
    specs: '35Ah – 100Ah · Up to 760 CCA',
    icon: Car,
    image: '/src/assets/images/product_car_battery_1794476149763.jpg',
  },
  {
    id: 'bike',
    title: 'Bike Batteries',
    subtitle: 'VRLA Gel & high-power Lithium motorcycle packs',
    specs: '2.5Ah – 9Ah · Spill-proof',
    icon: Bike,
    image: '/src/assets/images/product_car_battery_1794476149763.jpg',
  },
  {
    id: 'inverter',
    title: 'Inverter Batteries',
    subtitle: 'Heavy-duty Tall Tubular home & office backup',
    specs: '100Ah – 240Ah · 1800 Cycles',
    icon: Zap,
    image: '/src/assets/images/product_inverter_battery_1794476149979.jpg',
  },
  {
    id: 'lithium',
    title: 'Lithium-Ion LiFePO4',
    subtitle: 'Next-gen energy units with integrated smart BMS',
    specs: '12V / 24V / 48V · 6,000+ Cycles',
    icon: Cpu,
    image: '/src/assets/images/product_lithium_solar_1794476150273.jpg',
  },
  {
    id: 'solar',
    title: 'Solar Batteries',
    subtitle: 'C10 rated deep-discharge photovoltaic storage',
    specs: '100Ah – 200Ah C10 rating',
    icon: Sun,
    image: '/src/assets/images/product_inverter_battery_1794476149979.jpg',
  },
  {
    id: 'industrial',
    title: 'Industrial Batteries',
    subtitle: 'High-voltage rack arrays for telecom & data centers',
    specs: '48V 100Ah – 400Ah banks',
    icon: Server,
    image: '/src/assets/images/category_banner_industrial_1794476151052.jpg',
  },
  {
    id: 'ups',
    title: 'UPS Batteries',
    subtitle: 'Fast high-rate discharge AGM power reserves',
    specs: '7.2Ah – 26Ah · High Surge',
    icon: Layers,
    image: '/src/assets/images/product_car_battery_1794476149763.jpg',
  },
  {
    id: 'accessories',
    title: 'Battery Accessories',
    subtitle: 'Pulse smart chargers, heavy pure copper cables',
    specs: 'Microprocessor 7-Stage · 35mm²',
    icon: Wrench,
    image: '/src/assets/images/hero_battery_titanium_1794476148118.jpg',
  },
];

export const CategoryGrid: React.FC = () => {
  const { navigate } = useStore();

  return (
    <section className="py-20 bg-[#101214] border-b border-[#25282D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-mono text-[#D6B98C] uppercase tracking-wider mb-2">
              Engineered Product Architecture
            </div>
            <h2 className="text-3xl font-bold text-[#F2F0EA] tracking-tight">
              Explore Battery Categories
            </h2>
          </div>
          <button
            onClick={() => navigate('shop')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D6B98C] hover:text-[#E3CDA7] transition-colors"
          >
            <span>View All Engineering Products</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* 8 Category Cards in balanced Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => navigate('category', { category: cat.id })}
                className="group relative bg-[#17191C] hover:bg-[#25282D] border border-[#25282D] hover:border-[#343940] rounded-xl overflow-hidden transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Image backdrop preview */}
                <div className="relative h-44 overflow-hidden bg-[#25282D]">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17191C] via-[#17191C]/30 to-transparent" />
                  <div className="absolute top-3 left-3 bg-[#17191C]/80 backdrop-blur-md p-2 rounded-lg border border-[#343940] text-[#D6B98C]">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Content info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-[#F2F0EA] group-hover:text-[#D6B98C] transition-colors flex items-center justify-between">
                      <span>{cat.title}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#D6B98C]" />
                    </h3>
                    <p className="text-xs text-[#8E959E] mt-1 line-clamp-2 leading-relaxed">
                      {cat.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#25282D] text-[11px] font-mono text-[#B7BCC2]">
                    {cat.specs}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
