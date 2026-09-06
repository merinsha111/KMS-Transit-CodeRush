import React, { useState } from 'react';
import { 
  Bus, User, Lock, Mail, Phone, ShieldCheck, Award, GraduationCap, 
  MapPin, HeartHandshake, LogOut, ArrowRight, CheckCircle2, 
  Sparkles, Globe, Compass, AlertCircle
} from 'lucide-react';
import { Language, UserProfile, UserRole } from '../types/transit';

interface LoginPageProps {
  language: Language;
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
  onNavigateToTab: (tab: 'search' | 'fare' | 'emergency') => void;
  onContinueAsGuest?: () => void;
  onSetLanguage?: (lang: Language) => void;
  isGatewayMode?: boolean;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  language,
  currentUser,
  onLogin,
  onLogout,
  onNavigateToTab,
  onContinueAsGuest,
  onSetLanguage,
  isGatewayMode = false,
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
  const [role, setRole] = useState<UserRole>('student');
  
  // Form fields
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [collegeName, setCollegeName] = useState<string>('IOE Pulchowk Campus');
  const [studentIdNumber, setStudentIdNumber] = useState<string>('IOE-2080-PUL-42');
  const [emergencyContactName, setEmergencyContactName] = useState<string>('Ramesh Sharma');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState<string>('+977-9841234567');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Quick Demo Personas
  const DEMO_PERSONAS: UserProfile[] = [
    {
      id: 'student-aayush',
      name: 'Aayush Sharma',
      email: 'aayush.sharma@ioe.edu.np',
      phone: '+977-9841234567',
      role: 'student',
      collegeName: 'IOE Pulchowk Campus',
      studentIdNumber: 'IOE-2080-PUL-42',
      isStudentVerified: true,
      emergencyContactName: 'Ramesh Sharma (Father)',
      emergencyContactPhone: '+977-9841234567',
      emergencyContactRelation: 'Parent'
    },
    {
      id: 'commuter-ram',
      name: 'Ram Krishna Shrestha',
      email: 'ramkrishna.shrestha@gmail.com',
      phone: '+977-9851098765',
      role: 'commuter',
      isStudentVerified: false,
      emergencyContactName: 'Sita Shrestha (Spouse)',
      emergencyContactPhone: '+977-9851098765',
      emergencyContactRelation: 'Spouse'
    },
    {
      id: 'tourist-sarah',
      name: 'Sarah Jenkins',
      email: 'sarah.jenkins@travelmail.com',
      phone: '+1-415-555-0199',
      role: 'tourist',
      isStudentVerified: false,
      emergencyContactName: 'Tourist Police Hotline',
      emergencyContactPhone: '1144',
      emergencyContactRelation: 'Tourist Police Nepal'
    }
  ];

  const handleSelectDemoPersona = (persona: UserProfile) => {
    onLogin(persona);
    setSuccessMessage(
      language === 'en'
        ? `Logged in successfully as ${persona.name} (${persona.role.toUpperCase()})`
        : `सफलतापूर्वक ${persona.name} को रूपमा लगइन भयो!`
    );
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name && authMode === 'register') return;

    const user: UserProfile = {
      id: `user-${Date.now()}`,
      name: name || (email.split('@')[0] || 'Commuter User'),
      email: email || 'commuter@kmstransit.np',
      phone: phone || '+977-9800000000',
      role: role,
      collegeName: role === 'student' ? collegeName : undefined,
      studentIdNumber: role === 'student' ? studentIdNumber : undefined,
      isStudentVerified: role === 'student',
      emergencyContactName: emergencyContactName || 'Parent / Guardian',
      emergencyContactPhone: emergencyContactPhone || '+977-9841000000',
    };

    onLogin(user);
    setSuccessMessage(
      language === 'en'
        ? `Welcome, ${user.name}! Your account is active.`
        : `स्वागत छ, ${user.name}! तपाईंको खाता सक्रिय भयो।`
    );
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  // If already logged in, display the Profile Dashboard
  if (currentUser) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-extrabold text-2xl shadow-lg shadow-emerald-600/20">
                {currentUser.role === 'student' ? '🎓' : currentUser.role === 'tourist' ? '🗺️' : '💼'}
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">{currentUser.name}</h1>
                  {currentUser.isStudentVerified && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{language === 'en' ? '45% Concession Verified' : '४५% विद्यार्थी प्रमाणित'}</span>
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{currentUser.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold capitalize">
                    {currentUser.role} Account
                  </span>
                  {currentUser.phone && (
                    <span className="text-xs text-slate-400 mono">
                      {currentUser.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 text-xs font-bold transition flex items-center justify-center space-x-1.5 self-start sm:self-auto"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Sign Out' : 'लगआउट गर्नुहोस्'}</span>
            </button>

          </div>

          {/* Student Concession Card Banner (if student) */}
          {currentUser.role === 'student' && (
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 border border-amber-300/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start space-x-3">
                <GraduationCap className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    {language === 'en' ? 'Official Bagmati Student Transit Card' : 'बागमती प्रदेश विद्यार्थी सार्वजनिक यातायात परिचय'}
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                    {currentUser.collegeName || 'College / University'}
                  </div>
                  <div className="text-xs text-slate-600">
                    ID No: <strong className="font-mono text-slate-800">{currentUser.studentIdNumber}</strong> • Entitled to 45% fare reduction
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigateToTab('fare')}
                className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition whitespace-nowrap self-start sm:self-auto shadow-sm"
              >
                {language === 'en' ? 'Open Fare Calculator' : 'भाडा दर हेर्नुहोस्'} →
              </button>
            </div>
          )}

          {/* Emergency Safety Card configured for user */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                {language === 'en' ? 'Primary Emergency Contact' : 'आपतकालीन सम्पर्क'}
              </div>
              <div className="text-sm font-extrabold text-slate-900">
                {currentUser.emergencyContactName || 'Not Set'}
              </div>
              <div className="text-xs text-rose-600 font-mono font-bold mt-0.5">
                {currentUser.emergencyContactPhone || 'Not Set'}
              </div>
              <div className="mt-3">
                <button
                  onClick={() => onNavigateToTab('emergency')}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center space-x-1"
                >
                  <span>{language === 'en' ? 'Test SOS Lost Safety Hub' : 'आपतकालीन SOS हेर्नुहोस्'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                {language === 'en' ? 'Frequent Valley Commute' : 'नियमित रुट'}
              </div>
              <div className="text-sm font-extrabold text-slate-900">
                Kalanki ↔ Ratnapark / Pulchowk
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Saved for quick one-click routing in search
              </div>
              <div className="mt-3">
                <button
                  onClick={() => onNavigateToTab('search')}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center space-x-1"
                >
                  <span>{language === 'en' ? 'Plan Commute Now' : 'यात्रा सुरु गर्नुहोस्'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Switch Persona quickly */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              {language === 'en' ? 'Switch to Another Profile (Demo / Multi-User)' : 'अर्को प्रोफाइलमा स्विच गर्नुहोस्'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {DEMO_PERSONAS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectDemoPersona(p)}
                  className={`p-3 rounded-xl border text-left transition ${
                    currentUser.id === p.id
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900">{p.name}</div>
                  <div className="text-[11px] text-slate-500 capitalize">{p.role}</div>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    );
  }

  // If logged out, render the Login / Register view with Quick Demo Personas
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Gateway Header (if displayed before entering app) */}
      {isGatewayMode && (
        <div className="flex items-center justify-between py-2 px-1">
          <div className="flex items-center space-x-3">
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
              <p className="text-[11px] text-slate-500 font-medium">
                {language === 'en' ? 'Kathmandu Valley Public Transport' : 'काठमाडौँ उपत्यका सार्वजनिक यातायात'}
              </p>
            </div>
          </div>

          {/* Language Switcher & Guest Skip */}
          <div className="flex items-center space-x-2">
            {onContinueAsGuest && (
              <button
                onClick={onContinueAsGuest}
                className="hidden sm:inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition border border-slate-200"
              >
                <span>{language === 'en' ? 'Skip as Guest' : 'अतिथि यात्रु'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {onSetLanguage && (
              <div className="inline-flex rounded-lg p-0.5 bg-slate-100 border border-slate-200">
                <button
                  type="button"
                  onClick={() => onSetLanguage('en')}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                    language === 'en'
                      ? 'bg-white text-emerald-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => onSetLanguage('ne')}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                    language === 'ne'
                      ? 'bg-white text-emerald-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  नेपाली
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast Feedback */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold flex items-center space-x-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Top Welcome Card */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold mb-3 backdrop-blur-sm">
            <User className="w-3.5 h-3.5 text-emerald-300" />
            <span>{isGatewayMode ? (language === 'en' ? 'Welcome • Sign In Required' : 'स्वागतम् • लगइन गर्नुहोस्') : (language === 'en' ? 'KMS Transit Commuter Pass' : 'केएमएस ट्रान्जिट यात्रु सेवा')}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {isGatewayMode 
              ? (language === 'en' ? 'Sign In Before Entering KMS Transit' : 'केएमएस ट्रान्जिटमा प्रवेश गर्नुअघि लगइन गर्नुहोस्')
              : (language === 'en' ? 'Sign In to KMS Transit' : 'केएमएस ट्रान्जिटमा लगइन गर्नुहोस्')}
          </h1>
          <p className="text-emerald-100/90 text-xs sm:text-sm mt-2 leading-relaxed">
            {language === 'en'
              ? 'Select a fast 1-click demo persona (Student, Commuter, Tourist) or sign in below to unlock verified 45% student concession fares, valley route maps, and the emergency SOS console.'
              : 'द्रुत १-क्लिक प्रोफाइल छान्नुहोस् वा तल लगइन गर्नुहोस्। यसबाट ४५% विद्यार्थी छुट, रुट नक्सा र आपतकालीन SOS सेवा प्राप्त गर्न सकिन्छ।'}
          </p>
        </div>
      </div>

      {/* Quick 1-Click Demo Personas */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2 mb-3">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            {language === 'en' ? 'Fast Demo Login (Select a Persona)' : 'द्रुत परीक्षण लगइन (कुनै एक प्रोफाइल छान्नुहोस्)'}
          </h2>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          {language === 'en'
            ? 'Instantly test features as a verified student, daily commuter, or international tourist:'
            : 'प्रमाणित विद्यार्थी, दैनिक यात्रु वा पर्यटकको रूपमा तुरुन्त परीक्षण गर्नुहोस्:'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DEMO_PERSONAS.map((p) => (
            <div
              key={p.id}
              onClick={() => handleSelectDemoPersona(p)}
              className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md cursor-pointer transition bg-slate-50 hover:bg-emerald-50/40 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">
                    {p.role === 'student' ? '🎓' : p.role === 'tourist' ? '🗺️' : '💼'}
                  </span>
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                    p.role === 'student' 
                      ? 'bg-amber-100 text-amber-800' 
                      : p.role === 'tourist' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {p.role}
                  </span>
                </div>

                <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-700">
                  {p.name}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {p.collegeName || (p.role === 'tourist' ? 'International Visitor' : 'Daily Office Commuter')}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-emerald-700 font-bold">
                <span>{p.isStudentVerified ? '४५% Discount Active' : 'Select Persona'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Login / Register Form */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        
        {/* Auth Mode Tabs */}
        <div className="flex border-b border-slate-200 mb-6">
          <button
            onClick={() => setAuthMode('signin')}
            className={`pb-3 px-4 text-sm font-bold border-b-2 transition ${
              authMode === 'signin'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {language === 'en' ? 'Sign In (लगइन)' : 'लगइन गर्नुहोस्'}
          </button>
          <button
            onClick={() => setAuthMode('register')}
            className={`pb-3 px-4 text-sm font-bold border-b-2 transition ${
              authMode === 'register'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {language === 'en' ? 'Register New Account (नयाँ दर्ता)' : 'नयाँ खाता खोल्नुहोस्'}
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          
          {/* Role selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {language === 'en' ? 'Account Role' : 'यात्रु प्रकार'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                  role === 'student'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span>🎓</span>
                <span>{language === 'en' ? 'Student' : 'विद्यार्थी'}</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('commuter')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                  role === 'commuter'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span>💼</span>
                <span>{language === 'en' ? 'Commuter' : 'दैनिक यात्रु'}</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('tourist')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                  role === 'tourist'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span>🗺️</span>
                <span>{language === 'en' ? 'Tourist' : 'पर्यटक'}</span>
              </button>
            </div>
          </div>

          {/* Full name (if registering) */}
          {authMode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {language === 'en' ? 'Full Name' : 'पूरा नाम'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Subash Tamang"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Email or Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {language === 'en' ? 'Email Address' : 'इमेल ठेगाना'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {language === 'en' ? 'Password' : 'पासवर्ड'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Student Specific Fields */}
          {role === 'student' && (
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-amber-700" />
                <span>{language === 'en' ? 'Student ID Card Details (४५% छुटको लागि)' : 'विद्यार्थी परिचय पत्र विवरण'}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    {language === 'en' ? 'College / School / University' : 'कलेज / विद्यालयको नाम'}
                  </label>
                  <input
                    type="text"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="e.g. Kathmandu University"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    {language === 'en' ? 'Student ID Card Number' : 'परिचय पत्र नम्बर'}
                  </label>
                  <input
                    type="text"
                    value={studentIdNumber}
                    onChange={(e) => setStudentIdNumber(e.target.value)}
                    placeholder="e.g. KU-2024-CS-09"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Emergency Contact Information (Critical for Lost Alert feature) */}
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-rose-900 uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4 text-rose-600" />
              <span>{language === 'en' ? 'Emergency Contact (In Case Got Lost)' : 'आपतकालीन सम्पर्क (हराएको अवस्थाको लागि)'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  {language === 'en' ? 'Contact Name / Relation' : 'सम्पर्क व्यक्तिको नाम'}
                </label>
                <input
                  type="text"
                  value={emergencyContactName}
                  onChange={(e) => setEmergencyContactName(e.target.value)}
                  placeholder="e.g. Father / Friend"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  {language === 'en' ? 'Phone Number (+977)' : 'फोन नम्बर'}
                </label>
                <input
                  type="tel"
                  value={emergencyContactPhone}
                  onChange={(e) => setEmergencyContactPhone(e.target.value)}
                  placeholder="+977-98XXXXXXXX"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-500 font-mono"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md shadow-emerald-600/20 transition flex items-center justify-center space-x-2"
          >
            <span>{authMode === 'signin' ? (language === 'en' ? 'Sign In & Access Features' : 'लगइन गर्नुहोस्') : (language === 'en' ? 'Register & Verify Student Pass' : 'दर्ता गरी छुट प्राप्त गर्नुहोस्')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {onContinueAsGuest && (
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={onContinueAsGuest}
                className="text-xs font-bold text-slate-500 hover:text-emerald-700 transition underline underline-offset-4"
              >
                {language === 'en'
                  ? 'Or explore as Guest Commuter without signing in →'
                  : 'वा खाता बिना अतिथि यात्रुको रूपमा हेर्नुहोस् →'}
              </button>
            </div>
          )}

        </form>

      </div>

    </div>
  );
};
