import { BusStop, TransitRoute, RouteSearchResult } from '../types/transit';
import { STOP_MAP } from '../data/stops';
import { TRANSIT_ROUTES } from '../data/routes';
import { calculateFare } from '../data/fares';

/**
 * Calculates straight line distance in km using Haversine formula
 */
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1));
}

/**
 * Find routes connecting fromStopId and toStopId
 */
export function findTransitRoutes(fromStopId: string, toStopId: string): RouteSearchResult[] {
  if (!fromStopId || !toStopId || fromStopId === toStopId) {
    return [];
  }

  const fromStop = STOP_MAP[fromStopId];
  const toStop = STOP_MAP[toStopId];
  if (!fromStop || !toStop) return [];

  const directResults: RouteSearchResult[] = [];

  // Check direct routes
  for (const route of TRANSIT_ROUTES) {
    const fromIndex = route.stops.indexOf(fromStopId);
    const toIndex = route.stops.indexOf(toStopId);

    // If both stops are in this route
    if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
      const startIndex = Math.min(fromIndex, toIndex);
      const endIndex = Math.max(fromIndex, toIndex);
      const intermediateStopIds = route.stops.slice(startIndex, endIndex + 1);
      const intermediateStops = intermediateStopIds
        .map((id) => STOP_MAP[id])
        .filter(Boolean);

      // Estimate distance based on stops chain
      let routeDistance = 0;
      for (let i = 0; i < intermediateStops.length - 1; i++) {
        routeDistance += calculateDistanceKm(
          intermediateStops[i].lat,
          intermediateStops[i].lng,
          intermediateStops[i + 1].lat,
          intermediateStops[i + 1].lng
        );
      }
      // Add a road curve factor of 1.25 for Kathmandu valley streets
      const roadDistance = Math.max(1.5, parseFloat((routeDistance * 1.25).toFixed(1)));
      const fares = calculateFare(roadDistance);

      // Estimate travel time: ~15-20 km/h in Kathmandu traffic + 2 min per stop
      const baseMinutes = Math.round((roadDistance / 16) * 60) + (intermediateStops.length * 1.5);

      directResults.push({
        route,
        fromStop,
        toStop,
        intermediateStops,
        distanceKm: roadDistance,
        estimatedMinutes: Math.max(10, Math.round(baseMinutes)),
        regularFare: fares.regular,
        studentFare: fares.student,
        isDirect: true,
      });
    }
  }

  // If we have direct routes, sort by shortest travel time
  if (directResults.length > 0) {
    return directResults.sort((a, b) => a.estimatedMinutes - b.estimatedMinutes);
  }

  // If no direct route, search for 1-transfer options through major hubs
  const transferResults: RouteSearchResult[] = [];
  const majorHubs = ['ratnapark', 'koteshwor', 'kalanki', 'chabahil', 'lagankhel', 'sundhara'];

  for (const hubId of majorHubs) {
    if (hubId === fromStopId || hubId === toStopId) continue;
    const hubStop = STOP_MAP[hubId];

    // Find leg 1: fromStop -> hub
    const leg1Routes = TRANSIT_ROUTES.filter(
      (r) => r.stops.includes(fromStopId) && r.stops.includes(hubId)
    );
    // Find leg 2: hub -> toStop
    const leg2Routes = TRANSIT_ROUTES.filter(
      (r) => r.stops.includes(hubId) && r.stops.includes(toStopId)
    );

    if (leg1Routes.length > 0 && leg2Routes.length > 0) {
      const route1 = leg1Routes[0];
      const route2 = leg2Routes[0];

      const dist1 = calculateDistanceKm(fromStop.lat, fromStop.lng, hubStop.lat, hubStop.lng) * 1.25;
      const dist2 = calculateDistanceKm(hubStop.lat, hubStop.lng, toStop.lat, toStop.lng) * 1.25;
      const totalDist = parseFloat((dist1 + dist2).toFixed(1));

      const fare1 = calculateFare(dist1);
      const fare2 = calculateFare(dist2);

      const time1 = Math.round((dist1 / 15) * 60) + 10;
      const time2 = Math.round((dist2 / 15) * 60) + 10;
      const transferBuffer = 10; // 10 min transfer wait

      transferResults.push({
        route: route1,
        fromStop,
        toStop,
        intermediateStops: [fromStop, hubStop, toStop],
        distanceKm: totalDist,
        estimatedMinutes: time1 + time2 + transferBuffer,
        regularFare: fare1.regular + fare2.regular,
        studentFare: fare1.student + fare2.student,
        isDirect: false,
        transferStop: hubStop,
        transferRoute: route2,
      });
      break; // Pick best hub
    }
  }

  return transferResults;
}

export const DICTIONARY = {
  en: {
    tagline: 'Smart Kathmandu Valley Transit Guide',
    searchTitle: 'Find Your Kathmandu Valley Bus',
    searchSubtitle: 'Know where to catch your bus, where to get off, and exact fares',
    origin: 'Starting Point (Boarding Stop)',
    destination: 'Destination (Alighting Stop)',
    selectOrigin: 'Select boarding stop...',
    selectDestination: 'Select destination stop...',
    findBuses: 'Find Buses',
    swapStops: 'Swap directions',
    popularRoutes: 'Popular Commutes:',
    direct: 'Direct Bus',
    transferRequired: '1 Transfer Required',
    fareStudent: 'Student Fare (45% Concession)',
    fareRegular: 'Regular Fare',
    estTime: 'Est. Travel Time',
    distance: 'Distance',
    stopsCount: 'Stops',
    operator: 'Operator',
    frequency: 'Frequency',
    viewOnMap: 'View Route on Map',
    activeAlerts: 'Transit & Traffic Alerts',
    touristGuide: 'Tourist & Newcomer Guide',
    fareCalculator: 'Fare Calculator',
    busDirectory: 'Bus Directory',
    allStops: 'All Bus Stops',
    howToRide: 'How to Ride Kathmandu Buses',
    studentDiscountBadge: 'Student 45% OFF',
    noRoutesFound: 'No routes found between these stops. Try selecting a major hub like Ratnapark, Kalanki, or Koteshwor.',
  },
  ne: {
    tagline: 'काठमाडौँ उपत्यकाको स्मार्ट सार्वजनिक यातायात सहयोगी',
    searchTitle: 'काठमाडौँ उपत्यका बस खोज्नुहोस्',
    searchSubtitle: 'कहाँ चढ्ने, कहाँ ओर्लने, कुन बस चढ्ने र कति भाडा लाग्छ तुरुन्त थाहा पाउनुहोस्',
    origin: 'चढ्ने ठाउँ (सुरुवात विन्दु)',
    destination: 'ओर्लने ठाउँ (गन्तव्य)',
    selectOrigin: 'चढ्ने बस स्टप रोज्नुहोस्...',
    selectDestination: 'गन्तव्य बस स्टप रोज्नुहोस्...',
    findBuses: 'बस खोज्नुहोस्',
    swapStops: 'दिशा बदल्नुहोस्',
    popularRoutes: 'लोकप्रिय यात्राहरू:',
    direct: 'सिधा बस सेवा',
    transferRequired: '१ ठाउँमा बस बदल्नुपर्ने',
    fareStudent: 'विद्यार्थी भाडा (४५% छुट)',
    fareRegular: 'नियमित भाडा',
    estTime: 'अनुमानित समय',
    distance: 'दूरी',
    stopsCount: 'स्टप संख्या',
    operator: 'यातायात कम्पनी',
    frequency: 'आउने समय',
    viewOnMap: 'नक्सामा हेर्नुहोस्',
    activeAlerts: 'सडक तथा ट्राफिक जानकारी',
    touristGuide: 'पर्यटक तथा नयाँ यात्रु सहयोगी',
    fareCalculator: 'भाडा क्यालकुलेटर',
    busDirectory: 'बस सूची',
    allStops: 'सबै बस स्टपहरु',
    howToRide: 'काठमाडौँमा बस चढ्ने तरिका',
    studentDiscountBadge: 'विद्यार्थी ४५% छुट',
    noRoutesFound: 'यी दुई स्टपहरू बीच सिधा बस फेला परेन। रत्नपार्क, कलंकी वा कोटेश्वर जस्ता मुख्य चोक रोज्नुहोस्।',
  },
};
