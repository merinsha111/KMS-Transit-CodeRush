import React, { useState } from 'react';
import { RouteSearchResult, Language } from '../types/transit';
import { Clock, Navigation, MapPin, Zap, ChevronDown, ChevronUp, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

interface RouteCardProps {
  result: RouteSearchResult;
  language: Language;
  onSelectRoute: (result: RouteSearchResult) => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({ result, language, onSelectRoute }) => {
  const [isStopsOpen, setIsStopsOpen] = useState(false);
  const { route, fromStop, toStop, intermediateStops, distanceKm, estimatedMinutes, regularFare, studentFare, isDirect, transferStop, transferRoute } = result;

  const vehicleBadge = () => {
    switch (route.vehicleType) {
      case 'electric_bus':
        return { label: 'Electric EV Bus', bg: 'bg-sky-100 text-sky-800 border-sky-200' };
      case 'tempo':
        return { label: 'Safa Tempo (EV)', bg: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'micro':
        return { label: 'Microbus (Hiace)', bg: 'bg-purple-100 text-purple-800 border-purple-200' };
      default:
        return { label: 'City Bus', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
    }
  };

  const badge = vehicleBadge();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
      {/* Top Bar with Route Number & Operator */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2.5">
          <span 
            className="px-2.5 py-1 rounded-lg text-xs font-black text-white shadow-sm"
            style={{ backgroundColor: route.color }}
          >
            {route.routeNumber}
          </span>
          <div>
            <h3 className="font-bold text-slate-900 text-base leading-tight">
              {language === 'en' ? route.name : route.nameNepali}
            </h3>
            <p className="text-xs text-slate-500 font-medium">{route.operator}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badge.bg}`}>
            {badge.label}
          </span>
          {isDirect ? (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              {language === 'en' ? 'Direct' : 'सिधा'}
            </span>
          ) : (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
              {language === 'en' ? '1 Transfer' : '१ ठाउँ परिवर्तन'}
            </span>
          )}
        </div>
      </div>

      {/* Main Body: Route itinerary and stops */}
      <div className="p-4 sm:p-5">
        <div className="relative pl-6 space-y-4 border-l-2 border-dashed border-slate-200 ml-2">
          
          {/* Boarding Point */}
          <div className="relative">
            <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm ring-2 ring-emerald-100"></span>
            <div>
              <p className="text-[11px] uppercase tracking-wider font-bold text-emerald-700">
                {language === 'en' ? 'Board Here (कहाँ चढ्ने)' : 'कहाँ चढ्ने'}
              </p>
              <p className="text-sm font-bold text-slate-900">
                {language === 'en' ? fromStop.name : fromStop.nameNepali}
              </p>
              <p className="text-xs text-slate-500">{fromStop.landmarks.join(' • ')}</p>
            </div>
          </div>

          {/* Transfer Stop if applicable */}
          {!isDirect && transferStop && (
            <div className="relative">
              <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-amber-500 border-2 border-white shadow-sm ring-2 ring-amber-100"></span>
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/70">
                <p className="text-[11px] uppercase tracking-wider font-bold text-amber-800">
                  {language === 'en' ? 'Transfer at Interchange Hub' : 'बस फेर्ने ठाउँ'}
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {language === 'en' ? transferStop.name : transferStop.nameNepali}
                </p>
                {transferRoute && (
                  <p className="text-xs text-amber-900 mt-0.5">
                    Switch to: <span className="font-bold">{transferRoute.name}</span>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Alighting Point */}
          <div className="relative">
            <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow-sm ring-2 ring-red-100"></span>
            <div>
              <p className="text-[11px] uppercase tracking-wider font-bold text-red-700">
                {language === 'en' ? 'Get Off Here (कहाँ ओर्लने)' : 'कहाँ ओर्लने'}
              </p>
              <p className="text-sm font-bold text-slate-900">
                {language === 'en' ? toStop.name : toStop.nameNepali}
              </p>
              <p className="text-xs text-slate-500">{toStop.landmarks.join(' • ')}</p>
            </div>
          </div>

        </div>

        {/* Quick Metrics Bar: Distance, Time, Frequency */}
        <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center bg-slate-50 rounded-xl p-2.5">
          <div>
            <div className="flex items-center justify-center space-x-1 text-slate-400 text-xs mb-0.5">
              <Navigation className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Distance' : 'दूरी'}</span>
            </div>
            <p className="font-bold text-slate-800 text-sm">{distanceKm} km</p>
          </div>

          <div>
            <div className="flex items-center justify-center space-x-1 text-slate-400 text-xs mb-0.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Est. Time' : 'समय'}</span>
            </div>
            <p className="font-bold text-slate-800 text-sm">~{estimatedMinutes} mins</p>
          </div>

          <div>
            <div className="flex items-center justify-center space-x-1 text-slate-400 text-xs mb-0.5">
              <Zap className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Frequency' : 'समय अन्तराल'}</span>
            </div>
            <p className="font-bold text-slate-800 text-sm">Every {route.frequencyMinutes}m</p>
          </div>
        </div>

        {/* Fare Section with Student Concession Highlight */}
        <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-1 text-emerald-800 text-xs font-semibold">
              <Tag className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Student Fare (४५% छुट)' : 'विद्यार्थी भाडा (४५% छुट)'}</span>
            </div>
            <div className="flex items-baseline space-x-1 mt-0.5">
              <span className="text-xl font-extrabold text-emerald-700">Rs {studentFare}</span>
              <span className="text-xs text-slate-400 line-through">Rs {regularFare}</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-200/70 px-1.5 py-0.2 rounded ml-1">
                Save Rs {regularFare - studentFare}
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500 font-medium block">
              {language === 'en' ? 'Regular Fare' : 'साधारण भाडा'}
            </span>
            <span className="text-base font-bold text-slate-800">Rs {regularFare}</span>
          </div>
        </div>

        {/* Collapsible Intermediate Stops */}
        <div className="mt-4">
          <button
            onClick={() => setIsStopsOpen(!isStopsOpen)}
            className="w-full flex items-center justify-between text-xs font-semibold text-slate-600 hover:text-slate-900 py-1.5 px-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <span>
              {language === 'en' 
                ? `Show all ${intermediateStops.length} stops along this journey` 
                : `यस यात्रामा पर्ने सबै ${intermediateStops.length} स्टपहरु हेर्नुहोस्`}
            </span>
            {isStopsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {isStopsOpen && (
            <div className="mt-2 p-3 bg-slate-50 rounded-xl border border-slate-200/60 max-h-48 overflow-y-auto space-y-1.5 text-xs">
              {intermediateStops.map((stop, idx) => (
                <div key={stop.id} className="flex items-center space-x-2 text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-[10px] shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-medium">
                    {language === 'en' ? stop.name : stop.nameNepali}
                  </span>
                  {stop.isMajorHub && (
                    <span className="text-[9px] bg-slate-200 text-slate-800 px-1.5 py-0.2 rounded font-bold">
                      HUB
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Button: View on Map */}
        <div className="mt-4 flex items-center space-x-2">
          <button
            onClick={() => onSelectRoute(result)}
            className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-sm"
          >
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>{language === 'en' ? 'Inspect Route on Map' : 'नक्सामा रुट हेर्नुहोस्'}</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

      </div>
    </div>
  );
};
