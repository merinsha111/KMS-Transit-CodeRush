import { useState, useEffect } from 'react';
import { Language, RouteSearchResult, TabType, TransitRoute, UserProfile } from './types/transit';
import { INITIAL_ALERTS } from './data/alerts';
import { STOP_MAP } from './data/stops';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { RouteSearch } from './components/RouteSearch';
import { TransitMap } from './components/TransitMap';
import { FareCalculator } from './components/FareCalculator';
import { TouristGuide } from './components/TouristGuide';
import { TransitAlerts } from './components/TransitAlerts';
import { BusDirectory } from './components/BusDirectory';
import { LoginPage } from './components/LoginPage';
import { EmergencyLostAlert } from './components/EmergencyLostAlert';
import { Bus } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('search');
  const [language, setLanguage] = useState<Language>('en');
  const [selectedFrom, setSelectedFrom] = useState<string>('kalanki');
  const [selectedTo, setSelectedTo] = useState<string>('ratnapark');
  const [selectedRouteResult, setSelectedRouteResult] = useState<RouteSearchResult | null>(null);

  // User Profile state with localStorage persistence
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('kms_transit_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Controls whether the user has passed the initial sign-in gateway
  const [hasEntered, setHasEntered] = useState<boolean>(() => {
    try {
      return Boolean(localStorage.getItem('kms_transit_user'));
    } catch (e) {
      return false;
    }
  });

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    setHasEntered(true);
    try {
      localStorage.setItem('kms_transit_user', JSON.stringify(user));
    } catch (e) {}
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setHasEntered(false);
    try {
      localStorage.removeItem('kms_transit_user');
    } catch (e) {}
  };

  const handleSelectRouteForMap = (result: RouteSearchResult) => {
    setSelectedRouteResult(result);
    setActiveTab('map');
  };

  const handleSelectDirectoryRouteForMap = (route: TransitRoute) => {
    const firstStop = STOP_MAP[route.stops[0]];
    const lastStop = STOP_MAP[route.stops[route.stops.length - 1]];
    if (firstStop && lastStop) {
      setSelectedRouteResult({
        route,
        fromStop: firstStop,
        toStop: lastStop,
        intermediateStops: route.stops.map(id => STOP_MAP[id]).filter(Boolean),
        distanceKm: 12.0,
        estimatedMinutes: route.estimatedFullTripMinutes,
        regularFare: route.baseFare,
        studentFare: Math.round(route.baseFare * 0.55),
        isDirect: true,
      });
      setActiveTab('map');
    }
  };

  const handleSetOriginFromMap = (stopId: string) => {
    setSelectedFrom(stopId);
    setActiveTab('search');
  };

  const handleSetDestinationFromMap = (stopId: string) => {
    setSelectedTo(stopId);
    setActiveTab('search');
  };

  const handleExploreTouristStop = (stopId: string) => {
    setSelectedTo(stopId);
    setActiveTab('search');
  };

  const handleSetEmergencyRoute = (fromStopId: string, toStopId: string) => {
    setSelectedFrom(fromStopId);
    setSelectedTo(toStopId);
    setActiveTab('search');
  };

  // GATEWAY: Show Sign In to users before entering KMS Transit
  if (!hasEntered) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center font-['Plus_Jakarta_Sans',sans-serif] px-4 py-8">
        <div className="w-full max-w-4xl">
          <LoginPage
            language={language}
            currentUser={currentUser}
            onLogin={(user) => {
              handleLogin(user);
              setActiveTab('search');
            }}
            onLogout={handleLogout}
            onNavigateToTab={(tab) => {
              setHasEntered(true);
              setActiveTab(tab);
            }}
            onContinueAsGuest={() => {
              setHasEntered(true);
              setActiveTab('search');
            }}
            onSetLanguage={setLanguage}
            isGatewayMode={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 pb-20 md:pb-0">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        alertCount={INITIAL_ALERTS.length}
        currentUser={currentUser}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'search' && (
          <RouteSearch
            language={language}
            onSelectRouteForMap={handleSelectRouteForMap}
            selectedFrom={selectedFrom}
            setSelectedFrom={setSelectedFrom}
            selectedTo={selectedTo}
            setSelectedTo={setSelectedTo}
          />
        )}

        {activeTab === 'map' && (
          <TransitMap
            selectedRouteResult={selectedRouteResult}
            language={language}
            onSetAsOrigin={handleSetOriginFromMap}
            onSetAsDestination={handleSetDestinationFromMap}
          />
        )}

        {activeTab === 'fare' && (
          <FareCalculator language={language} currentUser={currentUser} />
        )}

        {activeTab === 'guide' && (
          <TouristGuide
            language={language}
            onExploreStop={handleExploreTouristStop}
          />
        )}

        {activeTab === 'directory' && (
          <BusDirectory
            language={language}
            onSelectRouteForMap={handleSelectDirectoryRouteForMap}
          />
        )}

        {activeTab === 'alerts' && (
          <TransitAlerts language={language} />
        )}

        {activeTab === 'emergency' && (
          <EmergencyLostAlert
            language={language}
            currentUser={currentUser}
            onNavigateToTab={(tab) => setActiveTab(tab)}
            onSetRoute={handleSetEmergencyRoute}
          />
        )}

        {activeTab === 'login' && (
          <LoginPage
            language={language}
            currentUser={currentUser}
            onLogin={handleLogin}
            onLogout={handleLogout}
            onNavigateToTab={(tab) => setActiveTab(tab)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-md bg-emerald-600 flex items-center justify-center text-white">
              <Bus className="w-3.5 h-3.5" />
            </div>
            <span className="font-extrabold text-slate-800 text-sm">KMS Transit</span>
            <span>— Kathmandu Valley Smart Public Transport</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab('emergency')}
              className="text-rose-600 hover:text-rose-700 font-bold transition-colors"
            >
              Emergency SOS
            </button>
            <button
              onClick={() => setActiveTab('login')}
              className="hover:text-slate-900 transition-colors font-medium"
            >
              Account / Login
            </button>
            <button
              onClick={() => setActiveTab('fare')}
              className="hover:text-slate-900 transition-colors font-medium"
            >
              Fare Rules
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className="hover:text-slate-900 transition-colors font-medium"
            >
              Tourist Help
            </button>
          </div>

          <div className="flex items-center space-x-1 text-slate-400">
            <span>Built for</span>
            <span className="font-semibold text-slate-600">CodeRush 2026</span>
            <span>• Nepalaya IT Club</span>
          </div>
        </div>
      </footer>

      {/* Bottom Nav on Mobile */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        alertCount={INITIAL_ALERTS.length}
        currentUser={currentUser}
      />

    </div>
  );
}


export default App;
