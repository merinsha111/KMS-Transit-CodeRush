import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { BUS_STOPS } from '../data/stops';
import { TRANSIT_ROUTES } from '../data/routes';
import { RouteSearchResult, Language } from '../types/transit';
import { Layers, MapPin, Navigation, Compass, Bus } from 'lucide-react';

// Fix default Leaflet icon issues in React/Vite
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const hubIcon = L.divIcon({
  className: 'custom-hub-pin',
  html: `<div style="background-color: #10b981; width: 14px; height: 14px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 8px rgba(0,0,0,0.4);"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7]
});

const activeStartIcon = L.divIcon({
  className: 'custom-start-pin',
  html: `<div style="background-color: #16a34a; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(22,163,74,0.6); display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: bold;">A</div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

const activeEndIcon = L.divIcon({
  className: 'custom-end-pin',
  html: `<div style="background-color: #ef4444; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(239,68,68,0.6); display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: bold;">B</div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

interface TransitMapProps {
  selectedRouteResult?: RouteSearchResult | null;
  language: Language;
  onSetAsOrigin: (stopId: string) => void;
  onSetAsDestination: (stopId: string) => void;
}

// Map recenter controller
const MapRecenter: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

export const TransitMap: React.FC<TransitMapProps> = ({
  selectedRouteResult,
  language,
  onSetAsOrigin,
  onSetAsDestination
}) => {
  const kathmanduCenter: [number, number] = selectedRouteResult
    ? [selectedRouteResult.fromStop.lat, selectedRouteResult.fromStop.lng]
    : [27.7052, 85.3148]; // Ratnapark central view

  const initialZoom = selectedRouteResult ? 13 : 12;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-4 sm:p-6 space-y-4">
      
      {/* Map Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-extrabold text-slate-900">
              {language === 'en' ? 'Kathmandu Valley Transit Map' : 'काठमाडौँ उपत्यका रुट नक्सा'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'en'
              ? 'Click any stop marker to inspect details, set boarding point, or view intersecting bus lines'
              : 'स्टपमा क्लिक गरेर विवरण हेर्नुहोस् वा सिधै यात्रा सुरुवात/गन्तव्य छान्नुहोस्'}
          </p>
        </div>

        {selectedRouteResult && (
          <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-800">
            <Bus className="w-4 h-4 text-emerald-600" />
            <span>
              {language === 'en'
                ? `Focus: ${selectedRouteResult.route.name}`
                : `चयन: ${selectedRouteResult.route.nameNepali}`}
            </span>
          </div>
        )}
      </div>

      {/* Map Canvas */}
      <div className="h-[480px] sm:h-[560px] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative">
        <MapContainer
          center={kathmanduCenter}
          zoom={initialZoom}
          scrollWheelZoom={true}
          style={{ width: '100%', height: '100%' }}
        >
          <MapRecenter center={kathmanduCenter} zoom={initialZoom} />

          {/* OpenStreetMap Tile Layer */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Draw All Transit Routes */}
          {TRANSIT_ROUTES.map((route) => {
            const isHighlighted = selectedRouteResult?.route.id === route.id;
            return (
              <Polyline
                key={route.id}
                positions={route.coordinates}
                pathOptions={{
                  color: route.color,
                  weight: isHighlighted ? 6 : 3.5,
                  opacity: selectedRouteResult ? (isHighlighted ? 0.95 : 0.25) : 0.65,
                  dashArray: route.vehicleType === 'tempo' ? '5, 10' : undefined
                }}
              />
            );
          })}

          {/* Draw Bus Stop Markers */}
          {BUS_STOPS.map((stop) => {
            const isStart = selectedRouteResult?.fromStop.id === stop.id;
            const isEnd = selectedRouteResult?.toStop.id === stop.id;
            const icon = isStart ? activeStartIcon : isEnd ? activeEndIcon : hubIcon;

            return (
              <Marker key={stop.id} position={[stop.lat, stop.lng]} icon={icon}>
                <Popup>
                  <div className="p-1 max-w-[220px]">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wide">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{stop.area}</span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm mt-0.5">
                      {language === 'en' ? stop.name : stop.nameNepali}
                    </h4>
                    {stop.description && (
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        {stop.description}
                      </p>
                    )}
                    <div className="mt-2 text-[11px] text-slate-600 bg-slate-100 p-1.5 rounded-lg">
                      <span className="font-semibold">Landmarks: </span>
                      {stop.landmarks.join(', ')}
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center space-x-1.5">
                      <button
                        onClick={() => onSetAsOrigin(stop.id)}
                        className="flex-1 py-1 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] text-center"
                      >
                        Set as Origin
                      </button>
                      <button
                        onClick={() => onSetAsDestination(stop.id)}
                        className="flex-1 py-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-bold text-[10px] text-center"
                      >
                        Set as Dest
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Route Color Legend */}
      <div className="bg-slate-50 rounded-2xl p-3 sm:p-4 border border-slate-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          {language === 'en' ? 'Active Transit Lines' : 'सञ्चालित बस लाइनहरू'}
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-xs">
          {TRANSIT_ROUTES.map((route) => (
            <div key={route.id} className="flex items-center space-x-2 bg-white px-2.5 py-1.5 rounded-xl border border-slate-200/70">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: route.color }}
              ></span>
              <div className="truncate">
                <p className="font-bold text-slate-800 truncate">{route.routeNumber}</p>
                <p className="text-[10px] text-slate-500 truncate">{route.operator}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
