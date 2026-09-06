import React, { useState } from 'react';
import { TOURIST_SPOTS } from '../data/touristSpots';
import { STOP_MAP } from '../data/stops';
import { Language } from '../types/transit';
import { Compass, BookOpen, MessageSquare, HelpCircle, MapPin, Sparkles, AlertTriangle, Check } from 'lucide-react';

interface TouristGuideProps {
  language: Language;
  onExploreStop: (stopId: string) => void;
}

export const TouristGuide: React.FC<TouristGuideProps> = ({ language, onExploreStop }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Heritage', 'Temple', 'Shopping'];

  const filteredSpots = activeCategory === 'All' 
    ? TOURIST_SPOTS 
    : TOURIST_SPOTS.filter(s => s.category === activeCategory);

  const PHRASES = [
    {
      nepali: 'यो बस रत्नपार्क जान्छ?',
      phonetic: 'Yo bus Ratnapark janchha?',
      english: 'Does this bus go to Ratnapark?',
      context: 'Ask the conductor (Khalasi) at the bus door before boarding.'
    },
    {
      nepali: 'कति भाडा हो?',
      phonetic: 'Kati bhaadaa ho?',
      english: 'How much is the fare?',
      context: 'When paying the conductor inside the bus.'
    },
    {
      nepali: 'मलाई झार्नुहोस् / झरेको!',
      phonetic: 'Malaai jhaarnuhos / Jhareko!',
      english: 'Please let me off here / Getting off!',
      context: 'Shout or inform the conductor 1 minute before your destination stop.'
    },
    {
      nepali: 'विद्यार्थी छुट छ।',
      phonetic: 'Vidyarthi chhut chha.',
      english: 'I have a student discount.',
      context: 'Show your student ID card while handing the fare.'
    },
    {
      nepali: 'सफा टेम्पो कहाँ रोकिन्छ?',
      phonetic: 'Safa tempo kahaa rokinchha?',
      english: 'Where does the Safa Tempo stop?',
      context: 'Ask locals at Ratnapark or Jamal for electric tempo stations.'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-100 text-xs font-bold mb-3 backdrop-blur-sm">
            <Compass className="w-3.5 h-3.5 text-emerald-300" />
            <span>{language === 'en' ? 'Kathmandu Valley Explorer' : 'काठमाडौँ उपत्यका अन्वेषण'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {language === 'en' ? 'First Time Commuter & Tourist Guide' : 'पहिलो पटक यात्रा गर्ने र पर्यटकहरूको सहयोगी'}
          </h2>
          <p className="text-emerald-100/90 text-sm mt-2 leading-relaxed">
            {language === 'en'
              ? 'Everything you need to navigate Kathmandu Valley public transport with confidence: bus hailing etiquettes, conductor phrases, and easy routes to top heritage sites.'
              : 'काठमाडौँका बस, माइक्रो र सफा टेम्पो सहज रूपमा चढ्ने तरिका, कन्डक्टरसँग बोल्ने वाक्यहरू र सम्पदा स्थलसम्म पुग्ने सजिला उपायहरू।'}
          </p>
        </div>
      </div>

      {/* 4 Essential Rules of Kathmandu Transit */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-extrabold flex items-center justify-center mb-3 text-sm">
            01
          </div>
          <h4 className="font-bold text-slate-900 text-sm mb-1">
            {language === 'en' ? 'Wave to Hail' : 'हात हल्लाएर रोक्नुहोस्'}
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            {language === 'en'
              ? 'Stand visibly by the designated stop and wave your hand downward to signal the bus driver or conductor.'
              : 'स्टपमा उभिएर हात तल माथि हल्लाएर चालकलाई बस रोक्न संकेत गर्नुहोस्।'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-extrabold flex items-center justify-center mb-3 text-sm">
            02
          </div>
          <h4 className="font-bold text-slate-900 text-sm mb-1">
            {language === 'en' ? 'Ask the Conductor (Khalasi)' : 'कन्डक्टर (खलासी) लाई सोध्नुहोस्'}
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            {language === 'en'
              ? 'Confirm your destination at the door before climbing on: "Ratnapark janchha?" to avoid wrong buses.'
              : 'बस चढ्नु अघि ढोकामा उभिने खलासीलाई आफ्नो गन्तव्य सोधेर मात्र चढ्नुहोस्।'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-extrabold flex items-center justify-center mb-3 text-sm">
            03
          </div>
          <h4 className="font-bold text-slate-900 text-sm mb-1">
            {language === 'en' ? 'Keep Small NPR Notes' : 'खुद्रा पैसा साथमा राख्नुहोस्'}
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            {language === 'en'
              ? 'Carry Rs 10, 20, or 50 rupee notes. Avoid handing Rs 500 or 1000 notes for short Rs 20 fares.'
              : '१०, २०, र ५० का खुद्रा नोटहरू बोक्नुहोस् ताकि भाडा तिर्न सजिलो होस्।'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-extrabold flex items-center justify-center mb-3 text-sm">
            04
          </div>
          <h4 className="font-bold text-slate-900 text-sm mb-1">
            {language === 'en' ? 'Sajha Yatayat is Easiest' : 'साझा यातायात सबैभन्दा सजिलो'}
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            {language === 'en'
              ? 'Sajha’s large green buses have route numbers, digital displays, and spacious standing room.'
              : 'साझाको ठूला हरिया बसहरूमा रुट नम्बर, फराकिलो सिट र डिजिटल डिस्प्ले हुन्छ।'}
          </p>
        </div>

      </div>

      {/* Useful Nepali Transit Phrases */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6">
        <div className="flex items-center space-x-2 mb-4">
          <MessageSquare className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-bold text-slate-900">
            {language === 'en' ? 'Crucial Nepali Transit Phrases (काठमाडौँ बस बोली)' : 'बस यात्रामा प्रयोग हुने मुख्य वाक्यहरू'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PHRASES.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-200 transition-colors">
              <div className="flex items-start justify-between">
                <p className="font-bold text-slate-900 text-base">{item.nepali}</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Phrase {idx + 1}
                </span>
              </div>
              <p className="text-xs font-semibold text-emerald-700 mt-0.5 italic">
                "{item.phonetic}"
              </p>
              <p className="text-xs font-medium text-slate-700 mt-1">
                🇬🇧 {item.english}
              </p>
              <p className="text-[11px] text-slate-400 mt-2 bg-white p-1.5 rounded-lg border border-slate-100">
                💡 {item.context}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Tourist Heritage Sites by Bus */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {language === 'en' ? 'Kathmandu Valley Heritage Destinations' : 'काठमाडौँ उपत्यकाका मुख्य सम्पदा स्थलहरू'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'en' ? 'Direct bus routes and stop instructions to visit famous landmarks' : 'प्रसिद्ध धार्मिक तथा सम्पदा स्थल पुग्ने बस रुट र जानकारी'}
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSpots.map((spot) => {
            const nearestStop = STOP_MAP[spot.nearestStopId];
            return (
              <div key={spot.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                      {spot.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {nearestStop?.area}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-slate-900 text-base">
                    {language === 'en' ? spot.name : spot.nameNepali}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {spot.description}
                  </p>

                  {/* Drop-off Stop */}
                  <div className="mt-3 p-2.5 rounded-xl bg-white border border-slate-200/80">
                    <p className="text-[10px] font-bold uppercase text-slate-400">
                      Drop-off Bus Stop:
                    </p>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">
                      {nearestStop ? (language === 'en' ? nearestStop.name : nearestStop.nameNepali) : spot.nearestStopId}
                    </p>
                  </div>

                  {/* Recommended Routes */}
                  <div className="mt-2 flex flex-wrap items-center gap-1">
                    <span className="text-[10px] text-slate-400 font-semibold mr-1">Routes:</span>
                    {spot.recommendedRoutes.map((r) => (
                      <span key={r} className="text-[10px] font-bold bg-slate-200 text-slate-800 px-1.5 py-0.2 rounded">
                        {r}
                      </span>
                    ))}
                  </div>

                  {/* Insider Tip */}
                  <p className="text-[11px] text-emerald-800 bg-emerald-50/70 p-2 rounded-lg mt-3 border border-emerald-100">
                    💡 <span className="font-medium">{spot.tips}</span>
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60">
                  <button
                    onClick={() => onExploreStop(spot.nearestStopId)}
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-emerald-600 hover:text-white border border-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center space-x-1.5 shadow-sm"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>View Stop in Map</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
