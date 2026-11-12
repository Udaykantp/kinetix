import React, { useState } from 'react';
import { Car, Home, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CompatibilityFinder: React.FC = () => {
  const { products, addToCart, navigate } = useStore();
  const [activeTab, setActiveTab] = useState<'vehicle' | 'inverter'>('vehicle');

  // Vehicle Finder State
  const [selectedMake, setSelectedMake] = useState('Hyundai');
  const [selectedModel, setSelectedModel] = useState('Creta (Petrol/Diesel)');
  const [selectedFuel, setSelectedFuel] = useState('Diesel / Start-Stop');

  // Inverter Finder State
  const [selectedHomeType, setSelectedHomeType] = useState('3BHK');
  const [backupHours, setBackupHours] = useState('4');

  const VEHICLE_DATABASE: Record<string, string[]> = {
    Hyundai: ['Creta (Petrol/Diesel)', 'i20', 'Grand i10', 'Verna'],
    'Maruti Suzuki': ['Swift / Baleno', 'Brezza', 'WagonR', 'Ertiga'],
    Tata: ['Harrier / Safari', 'Nexon', 'Tiago', 'Punch'],
    Mahindra: ['XUV700', 'Scorpio-N', 'Thar', 'XUV300'],
    Toyota: ['Fortuner', 'Innova Crysta / Hycross', 'Urban Cruiser'],
    BMW: ['3 Series / X1', '5 Series', 'X3'],
  };

  // Find matching car battery
  const matchedCarBattery =
    products.find((p) =>
      p.compatibleVehicles?.some((v) =>
        v.toLowerCase().includes(selectedModel.split(' ')[0].toLowerCase())
      )
    ) || products[0];

  // Find matching inverter battery
  const matchedInverterBattery =
    (selectedHomeType === '3BHK' || backupHours === '6'
      ? products.find((p) => p.category === 'inverter' && p.capacityAh >= 200)
      : products.find((p) => p.category === 'inverter' && p.capacityAh >= 150)) ||
    products.find((p) => p.category === 'inverter') ||
    products[0];

  return (
    <section id="compatibility-finder" className="py-16 bg-[#17191C] border-b border-[#25282D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="text-xs font-mono text-[#D6B98C] uppercase tracking-wider mb-2">
            Precision Match Engine
          </div>
          <h2 className="text-3xl font-bold text-[#F2F0EA] tracking-tight">
            Find the Exact Battery Built for Your Power Need
          </h2>
          <p className="text-sm text-[#B7BCC2] mt-2">
            Eliminate guesswork. Our engineering database cross-references manufacturer DIN
            specifications, cold cranking amps, and peak wattage ratings.
          </p>

          {/* Segmented Selector for Vehicle vs Inverter */}
          <div className="inline-flex p-1 bg-[#25282D] rounded-lg mt-6 border border-[#343940]">
            <button
              onClick={() => setActiveTab('vehicle')}
              className={`flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'vehicle'
                  ? 'bg-[#D6B98C] text-[#17191C] shadow-sm'
                  : 'text-[#B7BCC2] hover:text-[#F2F0EA]'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>Vehicle Fitment Finder</span>
            </button>
            <button
              onClick={() => setActiveTab('inverter')}
              className={`flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'inverter'
                  ? 'bg-[#D6B98C] text-[#17191C] shadow-sm'
                  : 'text-[#B7BCC2] hover:text-[#F2F0EA]'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Inverter & Home Backup</span>
            </button>
          </div>
        </div>

        {/* Interactive Matcher Box */}
        <div className="bg-[#25282D] border border-[#343940] rounded-xl p-6 sm:p-8">
          {activeTab === 'vehicle' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Form Selectors */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-lg font-semibold text-[#F2F0EA]">Select Your Vehicle</h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-[#8E959E] uppercase mb-1">
                      1. Manufacturer
                    </label>
                    <select
                      value={selectedMake}
                      onChange={(e) => {
                        setSelectedMake(e.target.value);
                        setSelectedModel(VEHICLE_DATABASE[e.target.value][0]);
                      }}
                      className="w-full bg-[#17191C] border border-[#343940] text-xs text-[#F2F0EA] px-3 py-2.5 rounded-lg focus:outline-none focus:border-[#D6B98C]"
                    >
                      {Object.keys(VEHICLE_DATABASE).map((make) => (
                        <option key={make} value={make}>
                          {make}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#8E959E] uppercase mb-1">
                      2. Car Model
                    </label>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full bg-[#17191C] border border-[#343940] text-xs text-[#F2F0EA] px-3 py-2.5 rounded-lg focus:outline-none focus:border-[#D6B98C]"
                    >
                      {VEHICLE_DATABASE[selectedMake]?.map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#8E959E] uppercase mb-1">
                      3. Fuel & Electronics
                    </label>
                    <select
                      value={selectedFuel}
                      onChange={(e) => setSelectedFuel(e.target.value)}
                      className="w-full bg-[#17191C] border border-[#343940] text-xs text-[#F2F0EA] px-3 py-2.5 rounded-lg focus:outline-none focus:border-[#D6B98C]"
                    >
                      <option value="Diesel / Start-Stop">Diesel / Auto Start-Stop</option>
                      <option value="Petrol Normal">Petrol (Standard)</option>
                      <option value="Turbo / Hybrid">Turbo Petrol / Mild Hybrid</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 text-xs text-[#8E959E] flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-[#B7BCC2]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B98C]" />
                    <span>Exact OEM DIN Housing Match</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-[#B7BCC2]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B98C]" />
                    <span>Includes Doorstep Alternator Test</span>
                  </span>
                </div>
              </div>

              {/* Matched Product Preview Card */}
              <div className="lg:col-span-5 bg-[#17191C] border border-[#343940] rounded-lg p-5 flex flex-col justify-between">
                <div className="flex items-start gap-4">
                  <img
                    src={matchedCarBattery.images[0]}
                    alt={matchedCarBattery.name}
                    className="w-20 h-20 object-cover rounded-md bg-[#25282D] shrink-0 border border-[#343940]"
                  />
                  <div>
                    <div className="text-[10px] font-mono text-[#D6B98C] uppercase">
                      Recommended OEM Fit
                    </div>
                    <h4 className="text-sm font-bold text-[#F2F0EA] leading-snug">
                      {matchedCarBattery.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-[#8E959E] mt-1">
                      <span>{matchedCarBattery.capacityAh} Ah</span>
                      <span aria-hidden="true">·</span>
                      <span>{matchedCarBattery.coldCrankingAmps} CCA</span>
                      <span aria-hidden="true">·</span>
                      <span>{matchedCarBattery.warrantyMonths}M Warranty</span>
                    </div>
                    <div className="text-base font-bold text-[#F2F0EA] mt-2 font-mono tabular-nums">
                      ₹{matchedCarBattery.price.toLocaleString('en-IN')}
                      <span className="text-xs text-[#8E959E] line-through ml-2 font-normal">
                        ₹{matchedCarBattery.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#25282D] flex items-center gap-2">
                  <button
                    onClick={() => addToCart(matchedCarBattery)}
                    className="flex-1 py-2 px-3 bg-[#D6B98C] hover:bg-[#E3CDA7] text-[#17191C] rounded text-xs font-semibold transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() =>
                      navigate('product-detail', { productId: matchedCarBattery.id })
                    }
                    className="py-2 px-3 bg-[#25282D] hover:bg-[#343940] text-[#F2F0EA] rounded text-xs font-semibold transition-colors border border-[#343940]"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Inverter Load Selector */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-lg font-semibold text-[#F2F0EA]">
                  Select Your Home & Power Requirement
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-[#8E959E] uppercase mb-1">
                      Home Size & Appliances
                    </label>
                    <select
                      value={selectedHomeType}
                      onChange={(e) => setSelectedHomeType(e.target.value)}
                      className="w-full bg-[#17191C] border border-[#343940] text-xs text-[#F2F0EA] px-3 py-2.5 rounded-lg focus:outline-none focus:border-[#D6B98C]"
                    >
                      <option value="1BHK">1-2 BHK (2 Fans, 3 Lights, 1 TV, Wi-Fi)</option>
                      <option value="3BHK">3-4 BHK (4 Fans, 6 Lights, TV, Refrigerator)</option>
                      <option value="Villa">Independent House / Villa (Heavy Load + AC)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#8E959E] uppercase mb-1">
                      Desired Power Backup Duration
                    </label>
                    <select
                      value={backupHours}
                      onChange={(e) => setBackupHours(e.target.value)}
                      className="w-full bg-[#17191C] border border-[#343940] text-xs text-[#F2F0EA] px-3 py-2.5 rounded-lg focus:outline-none focus:border-[#D6B98C]"
                    >
                      <option value="2">2 - 3 Hours (Moderate Outages)</option>
                      <option value="4">4 - 6 Hours (Extended Blackouts)</option>
                      <option value="8">8+ Hours (Heavy Duty Continuous)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 text-xs text-[#8E959E] flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-[#B7BCC2]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B98C]" />
                    <span>Heavy Cast Tall Tubular Spine Technology</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-[#B7BCC2]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B98C]" />
                    <span>Ceramic Float Level Monitors</span>
                  </span>
                </div>
              </div>

              {/* Matched Inverter Battery Card */}
              <div className="lg:col-span-5 bg-[#17191C] border border-[#343940] rounded-lg p-5 flex flex-col justify-between">
                <div className="flex items-start gap-4">
                  <img
                    src={matchedInverterBattery.images[0]}
                    alt={matchedInverterBattery.name}
                    className="w-20 h-20 object-cover rounded-md bg-[#25282D] shrink-0 border border-[#343940]"
                  />
                  <div>
                    <div className="text-[10px] font-mono text-[#D6B98C] uppercase">
                      Engineered Recommendation
                    </div>
                    <h4 className="text-sm font-bold text-[#F2F0EA] leading-snug">
                      {matchedInverterBattery.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-[#8E959E] mt-1">
                      <span>{matchedInverterBattery.capacityAh} Ah</span>
                      <span aria-hidden="true">·</span>
                      <span>{matchedInverterBattery.technology}</span>
                      <span aria-hidden="true">·</span>
                      <span>{matchedInverterBattery.warrantyMonths}M Warranty</span>
                    </div>
                    <div className="text-base font-bold text-[#F2F0EA] mt-2 font-mono tabular-nums">
                      ₹{matchedInverterBattery.price.toLocaleString('en-IN')}
                      <span className="text-xs text-[#8E959E] line-through ml-2 font-normal">
                        ₹{matchedInverterBattery.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#25282D] flex items-center gap-2">
                  <button
                    onClick={() => addToCart(matchedInverterBattery)}
                    className="flex-1 py-2 px-3 bg-[#D6B98C] hover:bg-[#E3CDA7] text-[#17191C] rounded text-xs font-semibold transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() =>
                      navigate('product-detail', { productId: matchedInverterBattery.id })
                    }
                    className="py-2 px-3 bg-[#25282D] hover:bg-[#343940] text-[#F2F0EA] rounded text-xs font-semibold transition-colors border border-[#343940]"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
