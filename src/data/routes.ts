import { TransitRoute } from '../types/transit';

export const TRANSIT_ROUTES: TransitRoute[] = [
  {
    id: 'ring-road-green',
    routeNumber: 'RR-01',
    name: 'Ring Road Circular (चक्रपथ परिक्रमा)',
    nameNepali: 'चक्रपथ पूर्ण परिक्रमा बस सेवा',
    operator: 'Ring Road Yatayat / Mahanagar',
    vehicleType: 'electric_bus',
    color: '#0284c7', // Sky Blue
    stops: [
      'gongabu',
      'balaju',
      'swayambhu',
      'kalanki',
      'balkhu',
      'satdobato',
      'koteshwor',
      'airport',
      'gaushala',
      'chabahil',
      'maharajgunj',
      'gongabu'
    ],
    coordinates: [
      [27.7348, 85.3117],
      [27.7335, 85.3005],
      [27.7149, 85.2904],
      [27.6934, 85.2818],
      [27.6841, 85.2974],
      [27.6582, 85.3255],
      [27.6766, 85.3496],
      [27.6877, 85.3512],
      [27.7088, 85.3475],
      [27.7175, 85.3494],
      [27.7362, 85.3315],
      [27.7348, 85.3117]
    ],
    frequencyMinutes: 8,
    operatingHours: '5:30 AM - 9:00 PM',
    estimatedFullTripMinutes: 95,
    baseFare: 20,
    features: ['Air Conditioned', 'Electric Green', 'Digital Ticketing', 'Spacious Seating']
  },
  {
    id: 'sajha-101',
    routeNumber: 'SY-101',
    name: 'Sajha 101: Lagankhel — Budhanilkantha',
    nameNepali: 'साझा १०१: लगनखेल — बुढानीलकण्ठ',
    operator: 'Sajha Yatayat',
    vehicleType: 'bus',
    color: '#15803d', // Sajha green
    stops: [
      'lagankhel',
      'pulchowk',
      'tripureshwor',
      'sundhara',
      'ratnapark',
      'thamel',
      'maharajgunj',
      'budhanilkantha'
    ],
    coordinates: [
      [27.6672, 85.3228],
      [27.6782, 85.3168],
      [27.6946, 85.3150],
      [27.7008, 85.3126],
      [27.7052, 85.3148],
      [27.7154, 85.3108],
      [27.7362, 85.3315],
      [27.7801, 85.3582]
    ],
    frequencyMinutes: 12,
    operatingHours: '6:00 AM - 8:30 PM',
    estimatedFullTripMinutes: 55,
    baseFare: 20,
    features: ['Disabled Ramp Accessible', 'CCTV Equipped', 'Card Payment / QR', 'Iconic Green Bus']
  },
  {
    id: 'sajha-102',
    routeNumber: 'SY-102',
    name: 'Sajha 102: Kalanki — Bhaktapur Suryabinayak',
    nameNepali: 'साझा १०२: कलंकी — भक्तपुर सूर्यविनायक',
    operator: 'Sajha Yatayat',
    vehicleType: 'bus',
    color: '#16a34a', // Bright Green
    stops: [
      'kalanki',
      'tripureshwor',
      'sundhara',
      'ratnapark',
      'new_baneshwor',
      'airport',
      'koteshwor',
      'suryabinayak'
    ],
    coordinates: [
      [27.6934, 85.2818],
      [27.6946, 85.3150],
      [27.7008, 85.3126],
      [27.7052, 85.3148],
      [27.6917, 85.3402],
      [27.6877, 85.3512],
      [27.6766, 85.3496],
      [27.6705, 85.4288]
    ],
    frequencyMinutes: 10,
    operatingHours: '5:45 AM - 8:45 PM',
    estimatedFullTripMinutes: 65,
    baseFare: 20,
    features: ['High Capacity', 'Comfortable Seats', 'Luggage Compartment', 'Direct Highway Run']
  },
  {
    id: 'tu-kirtipur-express',
    routeNumber: 'KT-05',
    name: 'Kirtipur TU — Ratnapark Express',
    nameNepali: 'कीर्तिपुर त्रिवि — रत्नपार्क एक्सप्रेस',
    operator: 'Kirtipur Yatayat',
    vehicleType: 'bus',
    color: '#b91c1c', // Red
    stops: [
      'kirtipur',
      'balkhu',
      'tripureshwor',
      'sundhara',
      'ratnapark'
    ],
    coordinates: [
      [27.6798, 85.2891],
      [27.6841, 85.2974],
      [27.6946, 85.3150],
      [27.7008, 85.3126],
      [27.7052, 85.3148]
    ],
    frequencyMinutes: 10,
    operatingHours: '6:00 AM - 8:00 PM',
    estimatedFullTripMinutes: 30,
    baseFare: 20,
    features: ['Student Favorite', 'Direct University Route', 'High Frequency Peak Times']
  },
  {
    id: 'safa-tempo-26',
    routeNumber: 'ST-26',
    name: 'Electric Safa Tempo: Ratnapark — Boudhanath',
    nameNepali: 'सफा टेम्पो: रत्नपार्क — बौद्धनाथ',
    operator: 'Valley Electric Safa Tempo',
    vehicleType: 'tempo',
    color: '#ca8a04', // Safa yellow
    stops: [
      'ratnapark',
      'sundhara',
      'gaushala',
      'chabahil',
      'boudha'
    ],
    coordinates: [
      [27.7052, 85.3148],
      [27.7008, 85.3126],
      [27.7088, 85.3475],
      [27.7175, 85.3494],
      [27.7215, 85.3620]
    ],
    frequencyMinutes: 5,
    operatingHours: '6:30 AM - 7:30 PM',
    estimatedFullTripMinutes: 40,
    baseFare: 20,
    features: ['100% Zero Emission', 'Historic Kathmandu EV', 'Instant Boarding', 'Fixed Price']
  },
  {
    id: 'patan-tourist-link',
    routeNumber: 'PT-08',
    name: 'Heritage Link: Thamel — Ratnapark — Patan Durbar',
    nameNepali: 'सम्पदा लिंक: ठमेल — रत्नपार्क — पाटन दरबार',
    operator: 'City Yatayat Services',
    vehicleType: 'micro',
    color: '#7c3aed', // Purple
    stops: [
      'thamel',
      'ratnapark',
      'tripureshwor',
      'pulchowk',
      'patan_durbar',
      'lagankhel'
    ],
    coordinates: [
      [27.7154, 85.3108],
      [27.7052, 85.3148],
      [27.6946, 85.3150],
      [27.6782, 85.3168],
      [27.6744, 85.3260],
      [27.6672, 85.3228]
    ],
    frequencyMinutes: 10,
    operatingHours: '6:00 AM - 8:30 PM',
    estimatedFullTripMinutes: 35,
    baseFare: 20,
    features: ['Tourists & Shoppers Pick', 'Direct Access to Patan Heritage', 'Quick Microbus']
  },
  {
    id: 'bhaktapur-express-15',
    routeNumber: 'BE-15',
    name: 'Bhaktapur AC Express: Ratnapark — Suryabinayak',
    nameNepali: 'भक्तपुर एसी एक्सप्रेस: रत्नपार्क — सूर्यविनायक',
    operator: 'Mayur Yatayat',
    vehicleType: 'bus',
    color: '#ea580c', // Orange
    stops: [
      'ratnapark',
      'new_baneshwor',
      'airport',
      'koteshwor',
      'suryabinayak'
    ],
    coordinates: [
      [27.7052, 85.3148],
      [27.6917, 85.3402],
      [27.6877, 85.3512],
      [27.6766, 85.3496],
      [27.6705, 85.4288]
    ],
    frequencyMinutes: 12,
    operatingHours: '5:30 AM - 9:00 PM',
    estimatedFullTripMinutes: 45,
    baseFare: 25,
    features: ['Air Conditioned', 'Free WiFi', 'Rapid Araniko Highway Route']
  }
];
