import { BusStop } from '../types/transit';

export const BUS_STOPS: BusStop[] = [
  {
    id: 'ratnapark',
    name: 'Ratnapark / Old Bus Park',
    nameNepali: 'रत्नपार्क / पुरानो बसपार्क',
    lat: 27.7052,
    lng: 85.3148,
    area: 'Kathmandu',
    isMajorHub: true,
    landmarks: ['Tundikhel', 'Bir Hospital', 'Nepal Airlines HQ'],
    description: 'The historic central transit hub connecting routes to all corners of the valley.'
  },
  {
    id: 'kalanki',
    name: 'Kalanki Chowk',
    nameNepali: 'कलंकी चोक',
    lat: 27.6934,
    lng: 85.2818,
    area: 'Kathmandu',
    isMajorHub: true,
    landmarks: ['Kalanki Underpass', 'West Gateway of Kathmandu'],
    description: 'Major intersection on the Ring Road and primary western gateway into Kathmandu Valley.'
  },
  {
    id: 'koteshwor',
    name: 'Koteshwor Chowk',
    nameNepali: 'कोटेश्वर चोक',
    lat: 27.6766,
    lng: 85.3496,
    area: 'Kathmandu',
    isMajorHub: true,
    landmarks: ['Ring Road - Araniko Highway junction', 'Near Airport'],
    description: 'Eastern transit gateway connecting Kathmandu to Bhaktapur, Banepa, and eastern highways.'
  },
  {
    id: 'chabahil',
    name: 'Chabahil Chowk',
    nameNepali: 'चाबहिल चोक',
    lat: 27.7175,
    lng: 85.3494,
    area: 'Kathmandu',
    isMajorHub: true,
    landmarks: ['Chabahil Stupa', 'Gateway to Boudhanath & Sankhu', 'KL Tower'],
    description: 'Bustling junction on the northern Ring Road leading towards Boudha and Pashupati.'
  },
  {
    id: 'gongabu',
    name: 'Gongabu New Bus Park',
    nameNepali: 'गोंगबु नयाँ बसपार्क',
    lat: 27.7348,
    lng: 85.3117,
    area: 'Kathmandu',
    isMajorHub: true,
    landmarks: ['BG Mall', 'Long Distance Intercity Bus Terminal'],
    description: 'The largest bus terminal in Nepal for long-distance national coaches and city circulators.'
  },
  {
    id: 'lagankhel',
    name: 'Lagankhel Bus Park',
    nameNepali: 'लगनखेल बसपार्क',
    lat: 27.6672,
    lng: 85.3228,
    area: 'Lalitpur',
    isMajorHub: true,
    landmarks: ['Patan Hospital', 'Patan Durbar Square link', 'Batuk Bhairab'],
    description: 'Central transit terminal for Lalitpur city buses, Godavari, and southern valley routes.'
  },
  {
    id: 'balkhu',
    name: 'Balkhu Chowk',
    nameNepali: 'बल्खु चोक',
    lat: 27.6841,
    lng: 85.2974,
    area: 'Kathmandu',
    isMajorHub: true,
    landmarks: ['Balkhu Vegetable Market', 'TU Kirtipur Link'],
    description: 'Southern gateway connecting Tribhuvan University, Kirtipur, and Dakshinkali highway.'
  },
  {
    id: 'maharajgunj',
    name: 'Maharajgunj / Teaching Hospital',
    nameNepali: 'महाराजगन्ज / टिचिङ अस्पताल',
    lat: 27.7362,
    lng: 85.3315,
    area: 'Kathmandu',
    isMajorHub: true,
    landmarks: ['TUTH Hospital', 'Police HQ', 'Embassy Area'],
    description: 'Key northern intersection connecting Ring Road to Budhanilkantha and Tokha.'
  },
  {
    id: 'thamel',
    name: 'Thamel / Sorhakhutte',
    nameNepali: 'ठमेल / सोह्रखुट्टे',
    lat: 27.7154,
    lng: 85.3108,
    area: 'Kathmandu',
    isMajorHub: false,
    landmarks: ['Thamel Tourist Hub', 'Sorhakhutte Police Station'],
    description: 'The primary tourist district in Kathmandu for hotels, cafes, trekking shops, and nightlife.'
  },
  {
    id: 'sundhara',
    name: 'Sundhara / Dharahara',
    nameNepali: 'सुन्धारा / धरहरा',
    lat: 27.7008,
    lng: 85.3126,
    area: 'Kathmandu',
    isMajorHub: true,
    landmarks: ['Dharahara Tower', 'Kathmandu Mall', 'Civil Mall'],
    description: 'Central city shopping and transit point adjacent to Ratnapark and New Road.'
  },
  {
    id: 'tripureshwor',
    name: 'Tripureshwor Chowk',
    nameNepali: 'त्रिपुरेश्वर चोक',
    lat: 27.6946,
    lng: 85.3150,
    area: 'Kathmandu',
    isMajorHub: true,
    landmarks: ['Dasharath Stadium', 'DESTA Mall', 'Bagmati Bridge'],
    description: 'Crucial intersection linking central Kathmandu to Lalitpur (Patan) across Bagmati river.'
  },
  {
    id: 'new_baneshwor',
    name: 'New Baneshwor Chowk',
    nameNepali: 'नयाँ बानेश्वर चोक',
    lat: 27.6917,
    lng: 85.3402,
    area: 'Kathmandu',
    isMajorHub: true,
    landmarks: ['Federal Parliament House', 'Civil Hospital', 'Eyeplex Mall'],
    description: 'Government and commercial artery connecting central Kathmandu to Koteshwor.'
  },
  {
    id: 'gaushala',
    name: 'Gaushala / Pashupatinath',
    nameNepali: 'गौशाला / पशुपतिनाथ',
    lat: 27.7088,
    lng: 85.3475,
    area: 'Kathmandu',
    isMajorHub: true,
    landmarks: ['Pashupatinath World Heritage Temple', 'Tilganga Eye Hospital'],
    description: 'Drop-off stop for sacred Pashupatinath Temple and Ring Road commuter exchange.'
  },
  {
    id: 'boudha',
    name: 'Boudha Stupa',
    nameNepali: 'बौद्धनाथ स्तुप',
    lat: 27.7215,
    lng: 85.3620,
    area: 'Kathmandu',
    isMajorHub: false,
    landmarks: ['Boudhanath Great Stupa', 'Tibetan Monasteries'],
    description: 'UNESCO World Heritage Buddhist monument surrounded by serene monasteries and rooftop cafes.'
  },
  {
    id: 'swayambhu',
    name: 'Swayambhunath / Monkey Temple',
    nameNepali: 'स्वयम्भूनाथ / मंकी टेम्पल',
    lat: 27.7149,
    lng: 85.2904,
    area: 'Kathmandu',
    isMajorHub: false,
    landmarks: ['Swayambhu Stupa', 'Halchowk Stadium', 'Ring Road West'],
    description: 'Ancient hilltop religious stupa overlooking the entirety of Kathmandu Valley.'
  },
  {
    id: 'pulchowk',
    name: 'Pulchowk / Jawalakhel',
    nameNepali: 'पुल्चोक / जावलाखेल',
    lat: 27.6782,
    lng: 85.3168,
    area: 'Lalitpur',
    isMajorHub: true,
    landmarks: ['Pulchowk Campus (IOE)', 'Central Zoo', 'Labim Mall'],
    description: 'Vibrant college and lifestyle hub in Lalitpur with renowned engineering campus and shopping.'
  },
  {
    id: 'patan_durbar',
    name: 'Patan Durbar Square (Mangalbazar)',
    nameNepali: 'पाटन दरबार क्षेत्र (मंगलबजार)',
    lat: 27.6744,
    lng: 85.3260,
    area: 'Lalitpur',
    isMajorHub: false,
    landmarks: ['Krishna Mandir', 'Patan Museum', 'Golden Temple'],
    description: 'Spectacular UNESCO World Heritage plaza celebrated for classical Newari architecture.'
  },
  {
    id: 'suryabinayak',
    name: 'Bhaktapur Suryabinayak',
    nameNepali: 'भक्तपुर सूर्यविनायक',
    lat: 27.6705,
    lng: 85.4288,
    area: 'Bhaktapur',
    isMajorHub: true,
    landmarks: ['Suryabinayak Temple', 'Araniko Highway Bus Terminal'],
    description: 'Main express transit terminal for Bhaktapur, linking directly to Kathmandu and Banepa.'
  },
  {
    id: 'budhanilkantha',
    name: 'Budhanilkantha (Narayanthan)',
    nameNepali: 'बुढानीलकण्ठ (नारायणथान)',
    lat: 27.7801,
    lng: 85.3582,
    area: 'Kathmandu',
    isMajorHub: false,
    landmarks: ['Sleeping Vishnu Temple', 'Shivapuri National Park Entrance'],
    description: 'Northern valley terminus near Shivapuri mountain and the revered floating Vishnu shrine.'
  },
  {
    id: 'kirtipur',
    name: 'Kirtipur / TU Gate',
    nameNepali: 'कीर्तिपुर / त्रिवि गेट',
    lat: 27.6798,
    lng: 85.2891,
    area: 'Kathmandu',
    isMajorHub: false,
    landmarks: ['Tribhuvan University Central Campus', 'Historic Newari Town'],
    description: 'Major university gateway serving thousands of college students and visitors to hill town.'
  },
  {
    id: 'satdobato',
    name: 'Satdobato Chowk',
    nameNepali: 'सातदोबाटो चोक',
    lat: 27.6582,
    lng: 85.3255,
    area: 'Lalitpur',
    isMajorHub: true,
    landmarks: ['Swimming Complex', 'ANFA Complex', 'Godavari Link'],
    description: 'Southern Ring Road junction leading to Chapagaun, Godavari, and southern hills.'
  },
  {
    id: 'balaju',
    name: 'Balaju Bypass',
    nameNepali: 'बालाजु बाइपास',
    lat: 27.7335,
    lng: 85.3005,
    area: 'Kathmandu',
    isMajorHub: true,
    landmarks: ['Balaju Water Garden', 'Kakani / Nuwakot Highway Gateway'],
    description: 'North-western transit hub connecting to Gongabu, Trishuli highway, and industrial district.'
  },
  {
    id: 'airport',
    name: 'TIA Airport Gate / Tinkune',
    nameNepali: 'विमानस्थल गेट / तीनकुने',
    lat: 27.6877,
    lng: 85.3512,
    area: 'Kathmandu',
    isMajorHub: true,
    landmarks: ['Tribhuvan International Airport Gate', 'Tinkune Open Ground'],
    description: 'Gateway for domestic and international flights connecting airport commuters.'
  },
  {
    id: 'basantapur',
    name: 'Kathmandu Durbar Square / Basantapur',
    nameNepali: 'काठमाडौँ दरबार क्षेत्र / बसन्तपुर',
    lat: 27.7042,
    lng: 85.3090,
    area: 'Kathmandu',
    isMajorHub: false,
    landmarks: ['Kumari Ghar (Living Goddess)', 'Kasthamandap', 'Taleju Temple', 'Freak Street'],
    description: 'Ancient heart of Kathmandu featuring centuries-old Malla royal palaces and temples.'
  },
  {
    id: 'durbarmarg',
    name: 'Durbarmarg / Narayanhiti Palace',
    nameNepali: 'दरबारमार्ग / नारायणहिटी दरबार',
    lat: 27.7142,
    lng: 85.3180,
    area: 'Kathmandu',
    isMajorHub: false,
    landmarks: ['Narayanhiti Palace Museum', 'Garden of Dreams', 'Boutique Boulevard'],
    description: 'Prestigious boulevard housing the historic former Royal Palace and upscale shopping.'
  },
  {
    id: 'chandragiri',
    name: 'Chandragiri Hills Cable Car / Thankot',
    nameNepali: 'चन्द्रागिरि हिल्स / थानकोट',
    lat: 27.6865,
    lng: 85.2078,
    area: 'Kathmandu',
    isMajorHub: true,
    landmarks: ['Chandragiri Cable Car Bottom Station', 'Bhaleshwor Mahadev', 'Thankot Checkpost'],
    description: 'Scenic high-altitude vantage point providing panoramic views across the Himalayan range.'
  },
  {
    id: 'singhadurbar',
    name: 'Singha Durbar / Babar Mahal',
    nameNepali: 'सिंहदरबार / बबरमहल',
    lat: 27.6975,
    lng: 85.3235,
    area: 'Kathmandu',
    isMajorHub: true,
    landmarks: ['Central Government Secretariat', 'Babar Mahal Revisited', 'Supreme Court'],
    description: 'The administrative heart of Nepal and neo-classical Rana palace heritage complex.'
  },
  {
    id: 'asan',
    name: 'Asan Bazaar / Indrachowk',
    nameNepali: 'असन बजार / इन्द्रचोक',
    lat: 27.7075,
    lng: 85.3120,
    area: 'Kathmandu',
    isMajorHub: false,
    landmarks: ['Annapurna Temple', 'Traditional Spice Market', 'Akash Bhairab'],
    description: 'Centuries-old trade and spice market square bustling with authentic valley commerce.'
  },
  {
    id: 'dakshinkali',
    name: 'Dakshinkali Temple / Pharping',
    nameNepali: 'दक्षिणकाली मन्दिर / फर्पिङ',
    lat: 27.6042,
    lng: 85.2635,
    area: 'Kathmandu',
    isMajorHub: false,
    landmarks: ['Dakshinkali Shrine', 'Guru Rinpoche Cave (Pharping)', 'Champa Devi trail'],
    description: 'Sacred river gorge temple dedicated to Goddess Kali, nestled in south Kathmandu hills.'
  },
  {
    id: 'chobhar',
    name: 'Chobhar Gorge & Jal Binayak',
    nameNepali: 'चोभार गल्छी / जलविनायक',
    lat: 27.6610,
    lng: 85.2890,
    area: 'Kathmandu',
    isMajorHub: false,
    landmarks: ['Manjushree Gorge', 'Jal Binayak Temple', 'Chobhar Caves & Lake'],
    description: 'The famous geological canyon carved by Manjushree to drain the prehistoric Kathmandu lake.'
  },
  {
    id: 'godavari',
    name: 'Godavari Botanical Garden',
    nameNepali: 'गोदावरी वनस्पति उद्यान',
    lat: 27.5960,
    lng: 85.3812,
    area: 'Lalitpur',
    isMajorHub: false,
    landmarks: ['National Botanical Garden', 'Naudhara Kunda', 'Phulchowki Foothills'],
    description: 'Lush natural reserve, sub-tropical flora, and fresh water springs at the base of Phulchowki.'
  },
  {
    id: 'nagarkot',
    name: 'Nagarkot Sunrise Viewpoint',
    nameNepali: 'नगरकोट भ्युपोइन्ट',
    lat: 27.7170,
    lng: 85.5200,
    area: 'Bhaktapur',
    isMajorHub: false,
    landmarks: ['Nagarkot View Tower', 'Himalayan Sunrise Ridge', 'Peace Buddha'],
    description: 'World-renowned hilltop station famous for dawn panoramas of Mount Everest and Langtang.'
  },
  {
    id: 'sundarijal',
    name: 'Sundarijal / Shivapuri Waterfalls',
    nameNepali: 'सुन्दरीजल / शिवपुरी झरना',
    lat: 27.7650,
    lng: 85.4230,
    area: 'Kathmandu',
    isMajorHub: false,
    landmarks: ['Shivapuri National Park Entrance', 'Waterfalls & Reservoir', 'Helambu Trailhead'],
    description: 'Popular mountain streams, cascades, and northern gateway to national park trails.'
  },
  {
    id: 'sankhu',
    name: 'Sankhu / Bajrayogini',
    nameNepali: 'साँखु / बज्रयोगिनी',
    lat: 27.7335,
    lng: 85.4610,
    area: 'Kathmandu',
    isMajorHub: false,
    landmarks: ['Bajrayogini Temple', 'Salinadi Holy River', 'Ancient Newar Silk Road Stop'],
    description: 'Ancient historical valley township famous for the sacred Swasthani Salinadi festival.'
  },
  {
    id: 'thimi',
    name: 'Madhyapur Thimi / Balkumari',
    nameNepali: 'मध्यपुर थिमी / बालकुमारी',
    lat: 27.6795,
    lng: 85.3850,
    area: 'Bhaktapur',
    isMajorHub: false,
    landmarks: ['Pottery Square', 'Balkumari Temple', 'Biska Jatra Tongue Piercing Site'],
    description: 'Historic Newari artisan city renowned for traditional terracotta pottery, masks, and festivals.'
  }
];

export const STOP_MAP: Record<string, BusStop> = BUS_STOPS.reduce((acc, stop) => {
  acc[stop.id] = stop;
  return acc;
}, {} as Record<string, BusStop>);
