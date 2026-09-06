import { TouristSpot } from '../types/transit';

export const TOURIST_SPOTS: TouristSpot[] = [
  {
    id: 'pashupatinath',
    name: 'Pashupatinath Temple',
    nameNepali: 'पशुपतिनाथ मन्दिर',
    category: 'Temple',
    nearestStopId: 'gaushala',
    recommendedRoutes: ['RR-01', 'ST-26'],
    description: 'Nepal’s most sacred Hindu temple complex dedicated to Lord Shiva, located on the banks of the Bagmati River.',
    tips: 'Get off at Gaushala Chowk and walk 5 minutes east. Respect photography restrictions near the main inner sanctum.'
  },
  {
    id: 'boudhanath',
    name: 'Boudhanath Stupa',
    nameNepali: 'बौद्धनाथ महास्तुप',
    category: 'Heritage',
    nearestStopId: 'boudha',
    recommendedRoutes: ['ST-26'],
    description: 'One of the largest spherical stupas in the world and center of Tibetan Buddhism in Kathmandu.',
    tips: 'Take the Electric Safa Tempo #26 directly from Ratnapark or Jamal. Best visited in the late afternoon for kora chanting.'
  },
  {
    id: 'swayambhunath',
    name: 'Swayambhunath (Monkey Temple)',
    nameNepali: 'स्वयम्भूनाथ मन्दिर',
    category: 'Heritage',
    nearestStopId: 'swayambhu',
    recommendedRoutes: ['RR-01'],
    description: 'Ancient religious architecture perched atop a hill west of Kathmandu offering 360-degree panoramic valley views.',
    tips: 'Catch the Ring Road Circular bus (RR-01) to Swayambhu Halchowk gate, then take the stone steps up.'
  },
  {
    id: 'patan_durbar_sq',
    name: 'Patan Durbar Square',
    nameNepali: 'पाटन दरबार क्षेत्र',
    category: 'Heritage',
    nearestStopId: 'patan_durbar',
    recommendedRoutes: ['PT-08', 'SY-101'],
    description: 'City of fine arts renowned for the Krishna Mandir, Golden Temple, and ancient Malla royal palace museum.',
    tips: 'Take Route PT-08 directly to Mangalbazar, or take Sajha 101 to Pulchowk and enjoy a scenic 10-minute heritage walk.'
  },
  {
    id: 'thamel_bazaar',
    name: 'Thamel Shopping & Cafe Hub',
    nameNepali: 'ठमेल बजार',
    category: 'Shopping',
    nearestStopId: 'thamel',
    recommendedRoutes: ['SY-101', 'PT-08'],
    description: 'Kathmandu’s premier traveler hub with handicrafts, pashmina, organic cafes, gear shops, and live music.',
    tips: 'Get off at Sorhakhutte or Lainchaur stop. The core alleys are mostly pedestrian-friendly.'
  },
  {
    id: 'bhaktapur_durbar_sq',
    name: 'Bhaktapur Durbar Square',
    nameNepali: 'भक्तपुर दरबार क्षेत्र',
    category: 'Heritage',
    nearestStopId: 'suryabinayak',
    recommendedRoutes: ['SY-102', 'BE-15'],
    description: 'The ancient capital of the Malla Kingdom, famous for the 55-Window Palace, Nyatapola Temple, and Juju Dhau (king curd).',
    tips: 'Take the Mayur AC Express (BE-15) or Sajha 102 from Ratnapark/Koteshwor to Suryabinayak or Sallaghari.'
  },
  {
    id: 'budhanilkantha_temple',
    name: 'Budhanilkantha Sleeping Vishnu',
    nameNepali: 'बुढानीलकण्ठ नारायण',
    category: 'Temple',
    nearestStopId: 'budhanilkantha',
    recommendedRoutes: ['SY-101'],
    description: 'Colossal 5th-century open-air granite statue of Lord Vishnu reclining on the coils of cosmic serpent Shesha.',
    tips: 'Sajha Yatayat 101 goes directly from Lagankhel / Ratnapark to the temple entrance gate.'
  }
];
