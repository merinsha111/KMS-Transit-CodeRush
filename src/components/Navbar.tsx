import React from 'react';
import { Bus, MapPin, Compass, DollarSign, BookOpen, Bell, Globe, AlertTriangle, User, ShieldCheck } from 'lucide-react';
import { Language, TabType, UserProfile } from '../types/transit';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  alertCount: number;
  currentUser: UserProfile | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  alertCount,
  currentUser,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer select-none"
            onClick={() => setActiveTab('search')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-green-600/20">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">KMS</span>
                <span className="font-extrabold text-xl tracking-tight text-emerald-600">Transit</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 ml-1">
                  KTM
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
                {language === 'en' ? 'Kathmandu Valley Public Transport' : 'काठमाडौँ उपत्यका सार्वजनिक यातायात'}
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'search'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>{language === 'en' ? 'Trip Planner' : 'रुट खोज्नुहोस्'}</span>
            </button>

            <button
              onClick={() => setActiveTab('map')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'map'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>{language === 'en' ? 'Transit Map' : 'रुट नक्सा'}</span>
            </button>

            <button
              onClick={() => setActiveTab('fare')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'fare'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>{language === 'en' ? 'Fare Calculator' : 'भाडा दर'}</span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'guide'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{language === 'en' ? 'Tourist Guide' : 'यात्रु सहयोगी'}</span>
            </button>

            <button
              onClick={() => setActiveTab('alerts')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold relative transition-all ${
                activeTab === 'alerts'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>{language === 'en' ? 'Alerts' : 'ट्राफिक'}</span>
              {alertCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              )}
            </button>
          </nav>

          {/* Right Actions: Emergency SOS button, Login/Profile, Student Concession, Language switcher */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* EMERGENCY LOST ALERT (SOS) BUTTON */}
            <button
              onClick={() => setActiveTab('emergency')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all shadow-sm ${
                activeTab === 'emergency'
                  ? 'bg-rose-600 text-white shadow-rose-600/30 ring-2 ring-rose-500'
                  : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 animate-pulse'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>{language === 'en' ? 'SOS / Lost?' : '🚨 म हराएँ (SOS)'}</span>
            </button>

            {/* Student Concession badge */}
            <div className="hidden xl:flex items-center space-x-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200/80 rounded-full text-xs text-amber-800 font-semibold">
              <span>🎓</span>
              <span>{currentUser?.isStudentVerified ? (language === 'en' ? '45% Verified' : '४५% छुट प्रमाणित') : (language === 'en' ? 'Student 45% Off' : '४५% विद्यार्थी छुट')}</span>
            </div>

            {/* User Profile / Login Button */}
            <button
              onClick={() => setActiveTab('login')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'login'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : currentUser
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
              }`}
            >
              {currentUser ? (
                <>
                  <span className="text-sm">
                    {currentUser.role === 'student' ? '🎓' : currentUser.role === 'tourist' ? '🗺️' : '💼'}
                  </span>
                  <span className="max-w-[80px] sm:max-w-[110px] truncate">{currentUser.name.split(' ')[0]}</span>
                </>
              ) : (
                <>
                  <User className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Sign In' : 'खाता / लगइन'}</span>
                </>
              )}
            </button>

            {/* Language Switcher */}
            <div className="inline-flex rounded-lg p-0.5 bg-slate-100 border border-slate-200">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded-md text-xs font-bold transition-all ${
                  language === 'en'
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ne')}
                className={`px-2 py-1 rounded-md text-xs font-bold transition-all ${
                  language === 'ne'
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                नेपाली
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};

