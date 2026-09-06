import React, { useState } from 'react';
import { FARE_TIERS, FARE_DISCOUNT_INFO, calculateFare } from '../data/fares';
import { BUS_STOPS } from '../data/stops';
import { calculateDistanceKm } from '../utils/transitMath';
import { Language, UserProfile } from '../types/transit';
import { DollarSign, GraduationCap, Info, CheckCircle2, Award, ShieldAlert, Sparkles, ShieldCheck } from 'lucide-react';

interface FareCalculatorProps {
  language: Language;
  currentUser?: UserProfile | null;
}

export const FareCalculator: React.FC<FareCalculatorProps> = ({ language, currentUser }) => {
  const [distance, setDistance] = useState<number>(6.5);
  const [isStudent, setIsStudent] = useState<boolean>(currentUser ? currentUser.isStudentVerified : true);
  
  // Custom stop to stop quick selector
  const [fromStopId, setFromStopId] = useState<string>('kalanki');
  const [toStopId, setToStopId] = useState<string>('ratnapark');

  const handleStopCalculation = () => {
    const from = BUS_STOPS.find(s => s.id === fromStopId);
    const to = BUS_STOPS.find(s => s.id === toStopId);
    if (from && to) {
      const dist = parseFloat((calculateDistanceKm(from.lat, from.lng, to.lat, to.lng) * 1.25).toFixed(1));
      setDistance(dist);
    }
  };

  const fareResult = calculateFare(distance);
  const currentFare = isStudent ? fareResult.student : fareResult.regular;
  const savings = fareResult.regular - fareResult.student;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-3 border border-emerald-200">
            <DollarSign className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Official Bagmati Province Rates' : 'बागमती प्रदेश आधिकारिक भाडा दर'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'en' ? 'Kathmandu Valley Fare Calculator' : 'काठमाडौँ उपत्यका भाडा क्यालकुलेटर'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {language === 'en'
              ? 'Calculate accurate public transport fares across Kathmandu Valley with the mandatory 45% student concession card rate.'
              : 'दूरी वा बस स्टप छानेर सरकारी नियम अनुसार लाग्ने साधारण र ४५% विद्यार्थी छुट भाडा गणना गर्नुहोस्।'}
          </p>
        </div>

        {/* Interactive Calculator Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200/80 space-y-6">
            
            {/* Student ID Toggle */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isStudent ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'}`}>
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-slate-900 text-sm">
                      {language === 'en' ? 'Apply Student ID Discount (४५% छुट)' : 'विद्यार्थी परिचयपत्र छुट (४५%)'}
                    </h4>
                    {currentUser?.isStudentVerified && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center space-x-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">
                    {currentUser?.isStudentVerified
                      ? `${currentUser.collegeName || 'Student'} (ID: ${currentUser.studentIdNumber || 'Verified'})`
                      : (language === 'en' ? 'Valid for School, College & University IDs' : 'विद्यालय तथा क्याम्पस परिचयपत्र बाहकलाई')}
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isStudent}
                  onChange={(e) => setIsStudent(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            {/* Slider Control */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {language === 'en' ? 'Travel Distance' : 'यात्रा दूरी'}
                </label>
                <span className="text-base font-extrabold text-emerald-700 bg-emerald-50 px-3 py-0.5 rounded-lg border border-emerald-200">
                  {distance} km
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="0.5"
                value={distance}
                onChange={(e) => setDistance(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                <span>1 km (Local)</span>
                <span>10 km (Cross-city)</span>
                <span>25 km (Valley boundary)</span>
              </div>
            </div>

            {/* Quick Stop-to-Stop Fare Estimator */}
            <div className="pt-4 border-t border-slate-200">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                {language === 'en' ? 'Or Estimate from Stop to Stop:' : 'वा दुई स्टप बीचको भाडा हेर्नुहोस्:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-[1fr,1fr,auto] gap-2">
                <select
                  value={fromStopId}
                  onChange={(e) => setFromStopId(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
                >
                  {BUS_STOPS.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <select
                  value={toStopId}
                  onChange={(e) => setToStopId(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
                >
                  {BUS_STOPS.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleStopCalculation}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Calculate
                </button>
              </div>
            </div>

          </div>

          {/* Result Card Column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {language === 'en' ? 'Estimated Fare' : 'अनुमानित भाडा'}
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                Tier: {fareResult.tier.minKm}–{fareResult.tier.maxKm} km
              </span>
            </div>

            <div className="my-6">
              <div className="flex items-baseline space-x-2">
                <span className="text-5xl font-black tracking-tight text-white">
                  Rs {currentFare}
                </span>
                <span className="text-slate-400 text-sm font-medium">NPR</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {isStudent ? (
                  <span className="text-emerald-400 font-bold">
                    🎓 45% Student Discount applied (Official Rs {fareResult.regular} regular)
                  </span>
                ) : (
                  <span>Standard commuter fare</span>
                )}
              </p>
            </div>

            {isStudent && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-700/40 rounded-xl mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-emerald-200 font-semibold">
                    {language === 'en' ? 'You save per trip:' : 'तपाईंको बचत:'}
                  </span>
                </div>
                <span className="text-sm font-extrabold text-emerald-300">
                  Rs {savings}
                </span>
              </div>
            )}

            <div className="space-y-2 text-xs text-slate-300 border-t border-slate-700/80 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Regular Non-student Fare:</span>
                <span className="font-bold">Rs {fareResult.regular}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Student Concession Fare:</span>
                <span className="font-bold text-emerald-400">Rs {fareResult.student}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Payment methods:</span>
                <span className="font-medium">Cash / QR (Fonepay/eSewa)</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Official Fare Scale Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
          <Info className="w-5 h-5 text-emerald-600" />
          <span>{language === 'en' ? 'Official Distance & Fare Chart (Kathmandu Valley)' : 'सरकारी भाडा दर तालिका'}</span>
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Distance Range</th>
                <th className="py-3 px-4">Regular Fare</th>
                <th className="py-3 px-4 text-emerald-700">Student Fare (45% Concession)</th>
                <th className="py-3 px-4 text-slate-500">Typical Routes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {FARE_TIERS.map((tier, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {tier.minKm} km — {tier.maxKm} km
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800">
                    Rs {tier.regularFare}
                  </td>
                  <td className="py-3 px-4 font-extrabold text-emerald-600">
                    Rs {tier.studentFare}
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-xs">
                    {idx === 0 && 'Ratnapark ↔ Sundhara, Kalanki ↔ Balkhu'}
                    {idx === 1 && 'Kalanki ↔ Ratnapark, Balkhu ↔ Koteshwor'}
                    {idx === 2 && 'Lagankhel ↔ Budhanilkantha, Gongabu ↔ Koteshwor'}
                    {idx === 3 && 'Kalanki ↔ Suryabinayak (Bhaktapur)'}
                    {idx === 4 && 'Full Ring Road Loop, Kathmandu ↔ Dhulikhel link'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fare Rules & Tips */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
          {FARE_DISCOUNT_INFO.rules.map((rule, idx) => (
            <div key={idx} className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{rule}</span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
