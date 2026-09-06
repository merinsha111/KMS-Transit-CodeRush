import React, { useState } from 'react';
import { TRANSIT_ROUTES } from '../data/routes';
import { STOP_MAP } from '../data/stops';
import { Language, TransitRoute } from '../types/transit';
import { Bus, Clock, Zap, Shield, CheckCircle2, ChevronDown, ChevronUp, MapPin } from 'lucide-react';

interface BusDirectoryProps {
  language: Language;
  onSelectRouteForMap: (route: TransitRoute) => void;
}

export const BusDirectory: React.FC<BusDirectoryProps> = ({ language, onSelectRouteForMap }) => {
  const [selectedOperator, setSelectedOperator] = useState<string>('All');
  const [expandedRouteId, setExpandedRouteId] = useState<string | null>(null);

  const operators = ['All', 'Sajha Yatayat', 'Ring Road Yatayat / Mahanagar', 'Mayur Yatayat', 'Kirtipur Yatayat', 'Valley Electric Safa Tempo', 'City Yatayat Services'];

  const filteredRoutes = selectedOperator === 'All'
    ? TRANSIT_ROUTES
    : TRANSIT_ROUTES.filter(r => r.operator === selectedOperator);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-3 border border-emerald-200">
            <Bus className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'en' ? 'Kathmandu Valley Public Transport Directory' : 'काठमाडौँ उपत्यका बस तथा सवारी विवरण'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'en' ? 'Bus Fleet & Operator Directory' : 'बस कम्पनी तथा रुट निर्देशिका'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {language === 'en'
              ? 'Browse verified transit operators including Sajha Yatayat, Ring Road electric circulators, and Safa Tempos.'
              : 'साझा यातायात, चक्रपथ विद्युतीय बस, सफा टेम्पो तथा मुख्य माइक्रोबस रुटहरूको पूर्ण विवरण।'}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mt-6 flex flex-wrap gap-2">
          {operators.map((op) => (
            <button
              key={op}
              onClick={() => setSelectedOperator(op)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedOperator === op
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {op}
            </button>
          ))}
        </div>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRoutes.map((route) => {
          const isExpanded = expandedRouteId === route.id;
          const firstStop = STOP_MAP[route.stops[0]];
          const lastStop = STOP_MAP[route.stops[route.stops.length - 1]];

          return (
            <div
              key={route.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span
                      className="px-2.5 py-1 rounded-lg text-xs font-black text-white shadow-sm"
                      style={{ backgroundColor: route.color }}
                    >
                      {route.routeNumber}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {route.operator}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Base Rs {route.baseFare}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base mb-1">
                  {language === 'en' ? route.name : route.nameNepali}
                </h3>

                <div className="text-xs text-slate-600 space-y-1 mb-4">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-semibold text-slate-700">Origin:</span>
                    <span>{firstStop ? (language === 'en' ? firstStop.name : firstStop.nameNepali) : ''}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-semibold text-slate-700">Terminus:</span>
                    <span>{lastStop ? (language === 'en' ? lastStop.name : lastStop.nameNepali) : ''}</span>
                  </div>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl text-xs mb-3">
                  <div className="flex items-center space-x-1.5 text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{route.operatingHours}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-slate-600">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Every {route.frequencyMinutes} mins</span>
                  </div>
                </div>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {route.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                    >
                      ✓ {feat}
                    </span>
                  ))}
                </div>

                {/* Collapsible stops */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      All Stops Sequence ({route.stops.length}):
                    </p>
                    <div className="space-y-1 text-xs text-slate-700 max-h-40 overflow-y-auto pr-1">
                      {route.stops.map((stopId, idx) => {
                        const stop = STOP_MAP[stopId];
                        return (
                          <div key={idx} className="flex items-center space-x-2">
                            <span className="w-4 h-4 rounded-full bg-slate-200 text-[10px] font-bold flex items-center justify-center text-slate-600 shrink-0">
                              {idx + 1}
                            </span>
                            <span className="truncate">
                              {stop ? (language === 'en' ? stop.name : stop.nameNepali) : stopId}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom toggle */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setExpandedRouteId(isExpanded ? null : route.id)}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center space-x-1"
                >
                  <span>{isExpanded ? 'Hide Stops' : `View ${route.stops.length} Stops`}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => onSelectRouteForMap(route)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center space-x-1"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Show on Map</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
