import React, { useState } from 'react';
import { BUS_STOPS } from '../data/stops';
import { RouteSearchResult, Language } from '../types/transit';
import { findTransitRoutes, DICTIONARY } from '../utils/transitMath';
import { RouteCard } from './RouteCard';
import { ArrowUpDown, Search, MapPin, Sparkles, Navigation, AlertCircle } from 'lucide-react';

interface RouteSearchProps {
  language: Language;
  onSelectRouteForMap: (result: RouteSearchResult) => void;
  selectedFrom: string;
  setSelectedFrom: (val: string) => void;
  selectedTo: string;
  setSelectedTo: (val: string) => void;
}

export const RouteSearch: React.FC<RouteSearchProps> = ({
  language,
  onSelectRouteForMap,
  selectedFrom,
  setSelectedFrom,
  selectedTo,
  setSelectedTo
}) => {
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<RouteSearchResult[]>([]);
  const t = DICTIONARY[language];

  const handleSearch = (fromId = selectedFrom, toId = selectedTo) => {
    if (!fromId || !toId) return;
    const found = findTransitRoutes(fromId, toId);
    setResults(found);
    setHasSearched(true);
  };

  const handleSwap = () => {
    const temp = selectedFrom;
    setSelectedFrom(selectedTo);
    setSelectedTo(temp);
    if (selectedTo && temp) {
      handleSearch(selectedTo, temp);
    }
  };

  const setQuickRoute = (from: string, to: string) => {
    setSelectedFrom(from);
    setSelectedTo(to);
    handleSearch(from, to);
  };

  return (
    <div className="space-y-6">
      
      {/* Hero Search Box */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-5 sm:p-7 relative overflow-hidden">
        <div className="absolute -right-16 -bottom-16 w-56 h-56 bg-emerald-50 rounded-full blur-2xl -z-0 pointer-events-none"></div>
        <div className="relative z-10">
          
          <div className="max-w-2xl mb-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2.5 border border-emerald-200/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.tagline}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.searchTitle}
            </h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              {t.searchSubtitle}
            </p>
          </div>

          {/* Form Controls */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-3 items-center">
            
            {/* Origin Selection */}
            <div className="relative">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                <span>{t.origin}</span>
              </label>
              <div className="relative">
                <select
                  value={selectedFrom}
                  onChange={(e) => setSelectedFrom(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all cursor-pointer appearance-none"
                >
                  <option value="">{t.selectOrigin}</option>
                  {BUS_STOPS.map((stop) => (
                    <option key={stop.id} value={stop.id} disabled={stop.id === selectedTo}>
                      {language === 'en' ? stop.name : stop.nameNepali} ({stop.area})
                    </option>
                  ))}
                </select>
                <MapPin className="w-5 h-5 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center md:pt-6">
              <button
                type="button"
                onClick={handleSwap}
                title={t.swapStops}
                className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all active:scale-95 shadow-sm"
              >
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </div>

            {/* Destination Selection */}
            <div className="relative">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
                <span>{t.destination}</span>
              </label>
              <div className="relative">
                <select
                  value={selectedTo}
                  onChange={(e) => setSelectedTo(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all cursor-pointer appearance-none"
                >
                  <option value="">{t.selectDestination}</option>
                  {BUS_STOPS.map((stop) => (
                    <option key={stop.id} value={stop.id} disabled={stop.id === selectedFrom}>
                      {language === 'en' ? stop.name : stop.nameNepali} ({stop.area})
                    </option>
                  ))}
                </select>
                <Navigation className="w-5 h-5 text-red-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Action Button & Popular Chips */}
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
            
            {/* Quick Chips */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-semibold mr-1">{t.popularRoutes}</span>
              <button
                type="button"
                onClick={() => setQuickRoute('kalanki', 'ratnapark')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-medium transition-colors"
              >
                Kalanki → Ratnapark
              </button>
              <button
                type="button"
                onClick={() => setQuickRoute('koteshwor', 'thamel')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-medium transition-colors"
              >
                Koteshwor → Thamel
              </button>
              <button
                type="button"
                onClick={() => setQuickRoute('lagankhel', 'budhanilkantha')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-medium transition-colors"
              >
                Lagankhel → Budhanilkantha
              </button>
              <button
                type="button"
                onClick={() => setQuickRoute('ratnapark', 'suryabinayak')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-medium transition-colors"
              >
                Ratnapark → Bhaktapur
              </button>
            </div>

            {/* Find Buses Button */}
            <button
              type="button"
              disabled={!selectedFrom || !selectedTo}
              onClick={() => handleSearch()}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:cursor-not-allowed text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center space-x-2 transition-all active:scale-95"
            >
              <Search className="w-4 h-4" />
              <span>{t.findBuses}</span>
            </button>

          </div>

        </div>
      </div>

      {/* Results Display */}
      {hasSearched && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              {language === 'en'
                ? `Available Routes (${results.length})`
                : `उपलब्ध बस रुटहरू (${results.length})`}
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              {results.length > 0 
                ? (language === 'en' ? 'Ranked by travel time' : 'यात्रा समय अनुसार क्रमबद्ध')
                : ''}
            </span>
          </div>

          {results.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center max-w-lg mx-auto">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
              <h3 className="font-bold text-slate-800 text-base mb-1">
                {language === 'en' ? 'No Direct Bus Found' : 'सिधा बस भेटिएन'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t.noRoutesFound}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((result, idx) => (
                <RouteCard
                  key={`${result.route.id}-${idx}`}
                  result={result}
                  language={language}
                  onSelectRoute={onSelectRouteForMap}
                />
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
