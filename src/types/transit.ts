export type VehicleType = 'bus' | 'electric_bus' | 'tempo' | 'micro';

export interface BusStop {
  id: string;
  name: string;
  nameNepali: string;
  lat: number;
  lng: number;
  area: 'Kathmandu' | 'Lalitpur' | 'Bhaktapur';
  isMajorHub: boolean;
  landmarks: string[];
  description?: string;
}

export interface TransitRoute {
  id: string;
  routeNumber: string;
  name: string;
  nameNepali: string;
  operator: string;
  vehicleType: VehicleType;
  color: string;
  stops: string[]; // List of BusStop IDs in sequence
  coordinates: [number, number][]; // Polyline coords [lat, lng]
  frequencyMinutes: number;
  operatingHours: string;
  estimatedFullTripMinutes: number;
  baseFare: number;
  features: string[];
}

export interface RouteSearchResult {
  route: TransitRoute;
  fromStop: BusStop;
  toStop: BusStop;
  intermediateStops: BusStop[];
  distanceKm: number;
  estimatedMinutes: number;
  regularFare: number;
  studentFare: number;
  isDirect: boolean;
  transferStop?: BusStop;
  transferRoute?: TransitRoute;
}

export interface FareTier {
  minKm: number;
  maxKm: number;
  regularFare: number;
  studentFare: number;
}

export interface TransitAlert {
  id: string;
  severity: 'warning' | 'info' | 'critical';
  title: string;
  titleNepali: string;
  location: string;
  description: string;
  timeAgo: string;
}

export interface TouristSpot {
  id: string;
  name: string;
  nameNepali: string;
  category: 'Heritage' | 'Temple' | 'Shopping' | 'Scenic';
  nearestStopId: string;
  recommendedRoutes: string[];
  description: string;
  tips: string;
}

export type Language = 'en' | 'ne';

export type UserRole = 'student' | 'commuter' | 'tourist';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  collegeName?: string;
  studentIdNumber?: string;
  isStudentVerified: boolean;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  avatarUrl?: string;
}

export type TabType = 'search' | 'map' | 'fare' | 'guide' | 'directory' | 'alerts' | 'login' | 'emergency';
