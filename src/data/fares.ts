import { FareTier } from '../types/transit';

/**
 * Official Bagmati Province Government Transit Fare Tiers (Kathmandu Valley)
 * Note: Students holding a valid student identification card receive a 45% discount.
 */
export const FARE_TIERS: FareTier[] = [
  { minKm: 0, maxKm: 5, regularFare: 20, studentFare: 11 },
  { minKm: 5, maxKm: 10, regularFare: 27, studentFare: 15 },
  { minKm: 10, maxKm: 15, regularFare: 32, studentFare: 18 },
  { minKm: 15, maxKm: 20, regularFare: 37, studentFare: 20 },
  { minKm: 20, maxKm: 30, regularFare: 40, studentFare: 22 },
];

/**
 * Calculate the fare based on distance in kilometers
 */
export function calculateFare(distanceKm: number): { regular: number; student: number; tier: FareTier } {
  const matchedTier = FARE_TIERS.find(
    (tier) => distanceKm >= tier.minKm && distanceKm < tier.maxKm
  ) || FARE_TIERS[FARE_TIERS.length - 1];

  return {
    regular: matchedTier.regularFare,
    student: matchedTier.studentFare,
    tier: matchedTier,
  };
}

export const FARE_DISCOUNT_INFO = {
  title: 'Kathmandu Valley Public Transport Fare Regulations',
  authority: 'Bagmati Province Ministry of Labour, Employment and Transport',
  studentDiscountPercent: 45,
  rules: [
    'Students are entitled to a 45% discount upon presenting a valid school, college, or university ID card.',
    'Senior citizens (60+ years) and persons with disabilities are entitled to 50% fare reduction or designated free travel on Sajha Yatayat.',
    'Carry small change (Rs 10, 20, 50 notes) or have Fonepay/eSewa QR ready where available on modern buses.',
    'Fares are non-negotiable and strictly fixed per km distances set by the government transport authority.'
  ]
};
