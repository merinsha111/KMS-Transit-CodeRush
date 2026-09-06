import React from 'react';
import { Compass, MapPin, DollarSign, BookOpen, AlertTriangle, User } from 'lucide-react';
import { Language, TabType, UserProfile } from '../types/transit';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  language: Language;
  alertCount: number;
  currentUser: UserProfile | null;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  language,
  currentUser,
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-2 shadow-lg">
      <div className="flex items-center justify-around">
        <button
          onClick={() => setActiveTab('search')}
          className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-lg transition-colors ${
            activeTab === 'search' ? 'text-emerald-600 font-bold' : 'text-slate-500 font-medium'
          }`}
        >
          <Compass className="w-4 h-4 mb-0.5" />
          <span className="text-[10px]">{language === 'en' ? 'Plan' : 'खोज'}</span>
        </button>

        <button
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-lg transition-colors ${
            activeTab === 'map' ? 'text-emerald-600 font-bold' : 'text-slate-500 font-medium'
          }`}
        >
          <MapPin className="w-4 h-4 mb-0.5" />
          <span className="text-[10px]">{language === 'en' ? 'Map' : 'नक्सा'}</span>
        </button>

        <button
          onClick={() => setActiveTab('fare')}
          className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-lg transition-colors ${
            activeTab === 'fare' ? 'text-emerald-600 font-bold' : 'text-slate-500 font-medium'
          }`}
        >
          <DollarSign className="w-4 h-4 mb-0.5" />
          <span className="text-[10px]">{language === 'en' ? 'Fare' : 'भाडा'}</span>
        </button>

        <button
          onClick={() => setActiveTab('guide')}
          className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-lg transition-colors ${
            activeTab === 'guide' ? 'text-emerald-600 font-bold' : 'text-slate-500 font-medium'
          }`}
        >
          <BookOpen className="w-4 h-4 mb-0.5" />
          <span className="text-[10px]">{language === 'en' ? 'Guide' : 'सहयोगी'}</span>
        </button>

        {/* SOS BUTTON (HIGH CONTRAST) */}
        <button
          onClick={() => setActiveTab('emergency')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
            activeTab === 'emergency' 
              ? 'bg-rose-600 text-white font-extrabold shadow-sm' 
              : 'text-rose-600 bg-rose-50 hover:bg-rose-100 font-extrabold'
          }`}
        >
          <AlertTriangle className="w-4 h-4 mb-0.5 animate-pulse" />
          <span className="text-[10px] font-extrabold">{language === 'en' ? 'SOS' : 'म हराएँ'}</span>
        </button>

        {/* ACCOUNT / PROFILE */}
        <button
          onClick={() => setActiveTab('login')}
          className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-lg transition-colors ${
            activeTab === 'login' ? 'text-emerald-600 font-bold' : 'text-slate-500 font-medium'
          }`}
        >
          <User className="w-4 h-4 mb-0.5" />
          <span className="text-[10px]">
            {currentUser ? currentUser.name.split(' ')[0] : (language === 'en' ? 'Account' : 'खाता')}
          </span>
        </button>
      </div>
    </div>
  );
};

