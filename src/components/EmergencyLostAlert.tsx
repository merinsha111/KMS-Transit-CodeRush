import React, { useState } from 'react';
import { 
  AlertTriangle, Phone, ShieldAlert, MapPin, Navigation, Share2, 
  Eye, Compass, UserCheck, MessageSquare, ExternalLink,
  ChevronRight, ArrowRight, HeartPulse, Check
} from 'lucide-react';
import { BusStop, Language, UserProfile } from '../types/transit';
import { BUS_STOPS, STOP_MAP } from '../data/stops';
import { calculateDistanceKm } from '../utils/transitMath';

interface EmergencyLostAlertProps {
  language: Language;
  currentUser: UserProfile | null;
  onNavigateToTab: (tab: 'search' | 'map') => void;
  onSetRoute: (fromStopId: string, toStopId: string) => void;
}

export const EmergencyLostAlert: React.FC<EmergencyLostAlertProps> = ({
  language,
  currentUser,
  onNavigateToTab,
  onSetRoute,
}) => {
  const [selectedLocationStop, setSelectedLocationStop] = useState<string>('kalanki');
  const [gpsCoordinates, setGpsCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [isDetectingGps, setIsDetectingGps] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [showDistressCard, setShowDistressCard] = useState<boolean>(false);
  const [customContactName, setCustomContactName] = useState<string>(
    currentUser?.emergencyContactName || 'Parent / Guardian'
  );
  const [customContactPhone, setCustomContactPhone] = useState<string>(
    currentUser?.emergencyContactPhone || '+977-9800000000'
  );
  const [targetDestination, setTargetDestination] = useState<string>('Home / Safe Location');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Major hubs for escape route
  const MAJOR_HUBS = ['ratnapark', 'kalanki', 'koteshwor', 'gongabu', 'lagankhel', 'sundhara'];

  // Current active reference stop
  const currentStop = STOP_MAP[selectedLocationStop] || BUS_STOPS[0];

  // Detect GPS
  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      setGpsError(language === 'en' ? 'Geolocation not supported by browser' : 'ब्राउजरले लोकेसन समर्थन गरेन');
      return;
    }

    setIsDetectingGps(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setGpsCoordinates({ lat: latitude, lng: longitude });

        // Find closest stop
        let closestStop = BUS_STOPS[0];
        let minDistance = 99999;

        for (const stop of BUS_STOPS) {
          const dist = calculateDistanceKm(latitude, longitude, stop.lat, stop.lng);
          if (dist < minDistance) {
            minDistance = dist;
            closestStop = stop;
          }
        }

        setSelectedLocationStop(closestStop.id);
        setIsDetectingGps(false);
      },
      (err) => {
        setIsDetectingGps(false);
        setGpsError(
          language === 'en'
            ? 'Unable to retrieve location. Please select your nearest landmark below.'
            : 'स्थान पत्ता लागेन। कृपया नजिकैको स्थान छान्नुहोस्।'
        );
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Find nearest major hub from current stop
  const findNearestHub = () => {
    let bestHub = STOP_MAP['ratnapark'];
    let bestDist = 9999;

    for (const hubId of MAJOR_HUBS) {
      if (hubId === currentStop.id) continue;
      const hub = STOP_MAP[hubId];
      if (hub) {
        const dist = calculateDistanceKm(currentStop.lat, currentStop.lng, hub.lat, hub.lng);
        if (dist < bestDist) {
          bestDist = dist;
          bestHub = hub;
        }
      }
    }

    return {
      hub: bestHub,
      distanceKm: parseFloat(bestDist.toFixed(1)),
      estimatedMinutes: Math.round((bestDist / 15) * 60) + 5
    };
  };

  const nearestHubData = findNearestHub();

  // SOS WhatsApp Link
  const buildSosMessage = () => {
    const coordsStr = gpsCoordinates 
      ? `https://maps.google.com/?q=${gpsCoordinates.lat},${gpsCoordinates.lng}` 
      : `Near ${currentStop.name} (${currentStop.nameNepali}), Kathmandu Valley`;
    
    const passengerName = currentUser?.name || 'Commuter / Passenger';
    
    return encodeURIComponent(
      `🚨 [SOS EMERGENCY - I AM LOST] 🚨\n\nHello, I am currently lost in Kathmandu Valley and need urgent assistance.\n\n👤 Name: ${passengerName}\n📍 Last Known Location: ${currentStop.name} (${currentStop.nameNepali})\n🗺️ Map Coordinates: ${coordsStr}\n🎯 Destination: ${targetDestination}\n\nPlease call me or help guide me immediately!`
    );
  };

  const handleCopySosMessage = () => {
    const rawMsg = decodeURIComponent(buildSosMessage());
    navigator.clipboard.writeText(rawMsg);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleRouteToHub = () => {
    onSetRoute(currentStop.id, nearestHubData.hub.id);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Urgent Alert Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 text-white p-6 sm:p-8 shadow-xl shadow-red-500/20 border border-red-400/30">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-extrabold uppercase tracking-wider mb-3">
            <ShieldAlert className="w-4 h-4 text-white animate-pulse" />
            <span>{language === 'en' ? 'Emergency Assistance & Lost Passenger SOS' : 'आपतकालीन सहयोग तथा हराएको अवस्थामा उद्धार'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {language === 'en' ? 'Got Lost in Kathmandu Valley?' : 'काठमाडौँ उपत्यकामा कतै हराउनुभयो?'}
          </h1>
          <p className="mt-2 text-rose-100 text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'Stay calm. Use this safety console to dial official Nepal police helplines with 1 tap, share your GPS location via WhatsApp/SMS, or find your escape route to the nearest major transit hub.'
              : 'नआत्तिनुहोस्। १-ट्यापमा नेपाल प्रहरी, पर्यटक प्रहरीलाई फोन गर्नुहोस्, आफ्नो लोकेसन ह्वाट्सएप वा सन्देशमार्फत पठाउनुहोस्, वा नजिकैको मुख्य बसपार्क पुग्ने रुट खोज्नुहोस्।'}
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-5">
            <button
              onClick={() => setShowDistressCard(true)}
              className="px-4 py-2.5 rounded-xl bg-white text-rose-700 font-extrabold text-xs sm:text-sm hover:bg-rose-50 transition shadow-md flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>{language === 'en' ? 'Show "I Am Lost" Card to Locals' : '"म हराएँ" कार्ड स्थानीयलाई देखाउनुहोस्'}</span>
            </button>
          </div>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute right-0 top-0 bottom-0 opacity-10 flex items-center justify-center pr-6 pointer-events-none">
          <ShieldAlert className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* 2-Column Grid: Left (Location & Escape Hub), Right (Helplines & SOS Sharing) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Where are you & Escape Route */}
        <div className="lg:col-span-7 space-y-6">

          {/* Location Picker & GPS Detector */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {language === 'en' ? 'Step 1: Identify Your Location' : 'चरण १: तपाईं अहिले कहाँ हुनुहुन्छ?'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'en' ? 'Detect automatically or select nearest landmark' : 'स्वचालित पत्ता लगाउनुहोस् वा नजिकैको चोक छान्नुहोस्'}
                  </p>
                </div>
              </div>

              <button
                onClick={handleDetectGPS}
                disabled={isDetectingGps}
                className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition flex items-center space-x-1.5"
              >
                <Navigation className={`w-3.5 h-3.5 ${isDetectingGps ? 'animate-spin' : ''}`} />
                <span>{isDetectingGps ? (language === 'en' ? 'Locating...' : 'खोज्दैछ...') : (language === 'en' ? 'Detect GPS' : 'GPS पत्ता लगाउनुहोस्')}</span>
              </button>
            </div>

            {gpsError && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>{gpsError}</span>
              </div>
            )}

            {/* Landmark Stop Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                {language === 'en' ? 'Nearest Visible Bus Stop / Landmark' : 'नजिकै देखिएको बस स्टप वा चोक'}
              </label>
              <select
                value={selectedLocationStop}
                onChange={(e) => setSelectedLocationStop(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              >
                {BUS_STOPS.map((stop) => (
                  <option key={stop.id} value={stop.id}>
                    {stop.name} ({stop.nameNepali}) — {stop.area}
                  </option>
                ))}
              </select>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <span className="text-slate-500">{language === 'en' ? 'Area:' : 'क्षेत्र:'} </span>
                  <span className="font-bold text-slate-800">{currentStop.area}</span>
                  <span className="mx-2 text-slate-300">•</span>
                  <span className="text-slate-500">{language === 'en' ? 'Landmarks:' : 'नजिकका ठाउँहरू:'} </span>
                  <span className="font-medium text-slate-700">{currentStop.landmarks.join(', ')}</span>
                </div>
                {currentStop.isMajorHub && (
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold shrink-0 ml-2">
                    {language === 'en' ? 'Major Hub' : 'मुख्य बसपार्क'}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Escape Route to Nearest Major Transit Hub */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {language === 'en' ? 'Escape Route: Nearest Safe Transit Hub' : 'उद्धार रुट: नजिकैको मुख्य बसपार्क'}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'en' ? 'Head here to find frequent buses to any corner of Kathmandu' : 'यहाँबाट उपत्यकाका सबै ठाउँ जाने बस सजिलै पाइन्छ'}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-emerald-50/50 border border-emerald-200/80 mt-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                    {language === 'en' ? 'Recommended Escape Hub' : 'सिफारिस गरिएको मुख्य केन्द्र'}
                  </div>
                  <div className="text-lg font-extrabold text-slate-900 mt-0.5">
                    {nearestHubData.hub.name} ({nearestHubData.hub.nameNepali})
                  </div>
                  <div className="text-xs text-slate-600 mt-1 flex items-center space-x-3">
                    <span>📍 ~{nearestHubData.distanceKm} km away</span>
                    <span>•</span>
                    <span>⏱️ ~{nearestHubData.estimatedMinutes} mins travel</span>
                  </div>
                </div>

                <button
                  onClick={handleRouteToHub}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-600/20"
                >
                  <span>{language === 'en' ? 'Find Buses to This Hub' : 'यो हब जाने बस खोज्नुहोस्'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="mt-3 pt-3 border-t border-emerald-200/60 text-xs text-slate-600">
                <strong className="text-slate-800">{language === 'en' ? 'Quick Direction:' : 'सुझाव:'} </strong>
                {language === 'en'
                  ? `Look for any Sajha Yatayat (Green bus), Safa Tempo, or ask a local conductor: "Yo bus ${nearestHubData.hub.name} janchha?"`
                  : `साझा यातायात, सफा टेम्पो वा कुनै पनि माइक्रो चढेर "${nearestHubData.hub.nameNepali} जान्छ?" भनी सोध्नुहोस्।`}
              </div>
            </div>
          </div>

          {/* Golden Rules When Lost in Kathmandu */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>{language === 'en' ? '4 Safety Tips When Lost in Kathmandu' : 'काठमाडौँमा हराउँदा ध्यान दिनुपर्ने ४ नियमहरू'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="font-bold text-slate-800 mb-1">1. 👮 {language === 'en' ? 'Traffic Police Booth' : 'ट्राफिक प्रहरी बिट'}</div>
                <div className="text-slate-600 leading-relaxed">
                  {language === 'en'
                    ? 'Almost every major junction (Kalanki, Ratnapark, Koteshwor) has a blue/white traffic police booth. Approach officers for safe directions.'
                    : 'हरेक मुख्य चोकमा ट्राफिक प्रहरी हुनुहुन्छ। उहाँहरूसँग सुरक्षित बाटो सोध्नुहोस्।'}
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="font-bold text-slate-800 mb-1">2. 🚌 {language === 'en' ? 'Head for Ratnapark' : 'रत्नपार्क वा चक्रपथ केन्द्र'}</div>
                <div className="text-slate-600 leading-relaxed">
                  {language === 'en'
                    ? 'Ratnapark and Ring Road connect to 90% of Valley transit lines. Catching a bus to Ratnapark usually restores your bearings.'
                    : 'रत्नपार्क पुगेपछि उपत्यकाको कुनै पनि कुना जाने गाडी सजिलै फेला पर्छ।'}
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="font-bold text-slate-800 mb-1">3. 💡 {language === 'en' ? 'Stay in Well-Lit Main Roads' : 'उज्यालो मूल सडकमै बस्नुहोस्'}</div>
                <div className="text-slate-600 leading-relaxed">
                  {language === 'en'
                    ? 'Avoid entering unfamiliar dark inner alleys (gallis) after dusk. Stay on primary bus corridors.'
                    : 'साँझ परेपछि भित्री अँध्यारो गल्लीमा नछिर्नुहोस्, मुख्य सडक वा पसल भएको ठाउँमै बस्नुहोस्।'}
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="font-bold text-slate-800 mb-1">4. 📱 {language === 'en' ? 'Conserve Phone Battery' : 'मोबाइल ब्याट्री जोगाउनुहोस्'}</div>
                <div className="text-slate-600 leading-relaxed">
                  {language === 'en'
                    ? 'Turn on battery saver. Use the offline distress card below if you need to show instructions to locals.'
                    : 'ब्याट्री सेभर अन गर्नुहोस्। अप्ठ्यारो परेमा तलको डिजिटल कार्ड स्थानीयलाई देखाउनुहोस्।'}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: 1-Tap Helplines & SOS Dispatch */}
        <div className="lg:col-span-5 space-y-6">

          {/* Official Emergency Helplines (Nepal) */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {language === 'en' ? 'Official Nepal Helplines' : 'नेपालका आपतकालीन फोन नम्बरहरू'}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'en' ? 'Tap any number to call immediately (Toll-Free)' : 'सिधै फोन गर्न नम्बरमा थिच्नुहोस्'}
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              
              {/* Nepal Police */}
              <a
                href="tel:100"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-rose-50 hover:border-rose-300 border border-slate-200 transition group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-extrabold text-sm">
                    👮
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-rose-700">
                      {language === 'en' ? 'Nepal Police Emergency' : 'नेपाल प्रहरी आपतकालीन'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {language === 'en' ? 'Toll-free 24/7 Police Dispatch' : 'निःशुल्क २४ सै घण्टा सेवा'}
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-lg bg-rose-600 text-white font-extrabold text-sm shadow-sm group-hover:bg-rose-700 transition">
                  100
                </span>
              </a>

              {/* Tourist Police */}
              <a
                href="tel:1144"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 transition group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-extrabold text-sm">
                    🏛️
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                      {language === 'en' ? 'Tourist Police Nepal' : 'पर्यटक प्रहरी हटलाइन'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {language === 'en' ? 'Bhrikutimandap / Thamel Unit' : 'भृकुटीमण्डप तथा ठमेल शाखा'}
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-extrabold text-sm shadow-sm group-hover:bg-emerald-700 transition">
                  1144
                </span>
              </a>

              {/* Traffic Police */}
              <a
                href="tel:103"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-amber-50 hover:border-amber-300 border border-slate-200 transition group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center font-extrabold text-sm">
                    🚦
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700">
                      {language === 'en' ? 'Valley Traffic Police' : 'उपत्यका ट्राफिक प्रहरी'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {language === 'en' ? 'Route Inquiries & Jam Updates' : 'सडक तथा रुट जानकारी'}
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-lg bg-amber-600 text-white font-extrabold text-sm shadow-sm group-hover:bg-amber-700 transition">
                  103
                </span>
              </a>

              {/* Ambulance */}
              <a
                href="tel:102"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-red-50 hover:border-red-300 border border-slate-200 transition group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-rose-500 text-white flex items-center justify-center font-extrabold text-sm">
                    🚑
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-red-700">
                      {language === 'en' ? 'Nepal Red Cross Ambulance' : 'एम्बुलेन्स सेवा (रेडक्रस)'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {language === 'en' ? 'Medical Emergency' : 'स्वास्थ्य आपतकाल'}
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-lg bg-red-600 text-white font-extrabold text-sm shadow-sm group-hover:bg-red-700 transition">
                  102
                </span>
              </a>

            </div>
          </div>

          {/* Personal Guardian / Emergency Contact */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {language === 'en' ? 'Personal Emergency Contact' : 'अभिभावक / व्यक्तिगत सम्पर्क'}
                </h3>
                <p className="text-xs text-slate-500">
                  {currentUser?.emergencyContactName
                    ? (language === 'en' ? 'Loaded from your profile' : 'तपाईंको प्रोफाइलबाट लिइएको')
                    : (language === 'en' ? 'Set phone number below' : 'तल सम्पर्क नम्बर राख्नुहोस्')}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    {language === 'en' ? 'Contact Name' : 'नाम'}
                  </label>
                  <input
                    type="text"
                    value={customContactName}
                    onChange={(e) => setCustomContactName(e.target.value)}
                    placeholder="Guardian Name"
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    {language === 'en' ? 'Phone (+977)' : 'फोन नम्बर'}
                  </label>
                  <input
                    type="tel"
                    value={customContactPhone}
                    onChange={(e) => setCustomContactPhone(e.target.value)}
                    placeholder="+977-98XXXXXXXX"
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  {language === 'en' ? 'Intended Safe Destination' : 'गन्तव्य ठाउँ'}
                </label>
                <input
                  type="text"
                  value={targetDestination}
                  onChange={(e) => setTargetDestination(e.target.value)}
                  placeholder="e.g. Home, Hostel, Hotel Thamel"
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>

              {/* Action Buttons: Direct Call & WhatsApp SOS */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href={`tel:${customContactPhone}`}
                  className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Call Contact' : 'सिधै कल गर्नुहोस्'}</span>
                </a>

                <a
                  href={`https://wa.me/${customContactPhone.replace(/[^0-9]/g, '')}?text=${buildSosMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp SOS</span>
                </a>
              </div>

              <button
                onClick={handleCopySosMessage}
                className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition flex items-center justify-center space-x-1.5"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? (language === 'en' ? 'SOS Message Copied!' : 'सन्देश कपी भयो!') : (language === 'en' ? 'Copy SMS Alert Text' : 'एसएमएस सन्देश कपी गर्नुहोस्')}</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* FULLSCREEN DISTRESS CARD MODAL ("SHOW TO A LOCAL") */}
      {showDistressCard && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-rose-500 relative animate-in fade-in zoom-in duration-200">
            
            <button
              onClick={() => setShowDistressCard(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition text-sm font-extrabold"
            >
              ✕
            </button>

            <div className="text-center mb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-extrabold uppercase tracking-wider mb-2">
                Emergency Transit Card • यात्रु सहयोग कार्ड
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-rose-600 tracking-tight">
                म हराएँ! (I AM LOST)
              </div>
            </div>

            {/* Giant Devanagari message for Nepali locals / conductors */}
            <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 text-slate-900 my-4 text-center">
              <p className="text-lg sm:text-xl font-bold leading-relaxed">
                "नमस्ते! म काठमाडौँमा बाटो हराएँ। मलाई कृपया नजिकैको बसपार्क, साझा बस स्टप वा प्रहरी चौकी पुग्न मद्दत गरिदिनुहोला।"
              </p>
              <p className="text-xs text-slate-600 italic mt-2">
                "Hello! I am lost. Please kindly help guide me to the nearest bus stop or police station."
              </p>
            </div>

            {/* Passenger Details */}
            <div className="space-y-2 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">यात्रुको नाम (Passenger):</span>
                <span className="font-bold text-slate-900">{currentUser?.name || 'Commuter / Tourist'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">अभिभावक सम्पर्क (Contact):</span>
                <span className="font-extrabold text-rose-600 font-mono text-sm">{customContactPhone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">हालको स्थान (Current Landmark):</span>
                <span className="font-semibold text-slate-800">{currentStop.name} ({currentStop.nameNepali})</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500 font-medium">जानुपर्ने ठाउँ (Destination):</span>
                <span className="font-bold text-emerald-700">{targetDestination}</span>
              </div>
            </div>

            <div className="mt-5 flex items-center space-x-3">
              <a
                href={`tel:${customContactPhone}`}
                className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm text-center shadow-lg shadow-rose-600/20 transition flex items-center justify-center space-x-1.5"
              >
                <Phone className="w-4 h-4" />
                <span>अभिभावकलाई फोन गर्नुहोस्</span>
              </a>

              <button
                onClick={() => setShowDistressCard(false)}
                className="px-5 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-sm transition"
              >
                बन्द गर्नुहोस् (Close)
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
