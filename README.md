# KMS Transit — Kathmandu Valley Public Transport Guide

Smart public-transport web/mobile app designed to make travelling around Kathmandu Valley effortless for students, tourists, and daily commuters.

## Team Information

**Team Name:** KMS Transit Team

**Team Members:**

| Name | Email | GitHub Username |
|---|---|---|
| Member 1 | member1@example.com | @member1 |
| Member 2 | member2@example.com | @member2 |
| Member 3 | member3@example.com | @member3 |
| Member 4 | member4@example.com | @member4 |

## Project Details

**Project Title:** KMS Transit (Kathmandu Metropolitan Smart Transit)

**Category:** [ ] FinTech &nbsp; [ ] EdTech &nbsp; [ ] E-Governance &nbsp; [ ] IoT &nbsp; [x] Open Innovation

**Problem Statement:**
Kathmandu Valley’s public transportation network is notoriously confusing. Commuters—especially college students, tourists, and newcomers—frequently do not know which bus to take, where to board, where to alight, or what the official fare should be. Inconsistent fare charges and lack of route clarity lead to lost time, unnecessary transfers, and overpayment.

**Solution Overview:**
KMS Transit consolidates Kathmandu Valley's entire transit experience into a single intuitive interface. The app provides a smart origin-to-destination route finder that clearly tells passengers exactly where to board and get off, an interactive Leaflet route map showing stops and transit corridors, an official Bagmati Province fare calculator with a 45% student concession card rate, and a bilingual (English & Nepali) guide for tourists and first-time riders.

## Technical Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Tailwind CSS, Lucide Icons |
| Build Tool | Vite 5 |
| Mapping Engine | Leaflet, React-Leaflet, OpenStreetMap |
| Transit Engine | Custom Valley Route Finder & Bagmati Province Fare Calculation Engine |
| Localization | English & Nepali (नेपाली) Bilingual Support |

## Installation & Setup

### Prerequisites
- Node.js 18+ or 20+ (tested on Node.js 24+)
- npm 9+

### Steps

```bash
# Clone the repository (once set up)
git clone https://github.com/<your-username>/KMS-Transit-CodeRush.git

# Navigate to the project folder
cd KMS-Transit-CodeRush

# Install dependencies
npm install

# Start the local development server
npm run dev
```

The app will be running at `http://localhost:3000`.

### Environment Variables (if applicable)
No external API keys or environment variables are required. Leaflet uses free, open OpenStreetMap tiles out of the box.

## Demo Credentials (if applicable)

| Role | Access |
|---|---|
| Public / Student / Commuter | Direct access at `/`, no login required for demo |

## Demo Flow

1. **Find a Route**:
   - On the homepage, select **Starting Point** (e.g., *Kalanki Chowk*) and **Destination** (e.g., *Ratnapark*), or click one of the quick commuter chips.
   - Click **Find Buses** to view available direct or 1-transfer buses (Sajha Yatayat, Safa Tempo, Ring Road Green Bus, etc.).
   - Review boarding stop instructions, drop-off stop, distance, estimated travel time, and intermediate stops.
2. **Inspect Interactive Map**:
   - Click **Inspect Route on Map** or navigate to the **Transit Map** tab.
   - See transit route polylines and interactive stop pins across Kathmandu, Lalitpur, and Bhaktapur.
   - Click any bus stop pin to set it as an origin or destination.
3. **Calculate Fares & Student Discount**:
   - Switch to the **Fare Calculator** tab.
   - Adjust the distance slider or pick two stops to view the official Bagmati Province fare.
   - Toggle the **Student ID Discount (४५% छुट)** to view the exact discounted rate and money saved per trip.
4. **Tourist & Commuter Guide**:
   - Click the **Tourist Guide** tab to view instructions on hailing buses in Kathmandu, crucial Nepali transit phrases with phonetic guides, and direct bus routes to heritage sites (Pashupatinath, Boudhanath, Patan Durbar Square, Bhaktapur).
5. **Real-time Alerts**:
   - Check the **Traffic Alerts** tab for live road maintenance and traffic bottleneck notices, or submit a crowdsourced traffic delay.

## Project Structure

```
KMS-Transit-CodeRush/
├── index.html               # Entry HTML with Leaflet CSS & typography
├── package.json             # Scripts & dependencies
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite bundler config
├── tailwind.config.js       # Tailwind CSS theme & styling rules
├── postcss.config.js        # PostCSS configuration
├── README.md                # Hackathon project documentation
└── src/
    ├── App.tsx              # Root component & navigation state
    ├── main.tsx             # Application bootstrap
    ├── index.css            # Tailwind directives & custom CSS
    ├── types/
    │   └── transit.ts       # Domain models (Stop, Route, Alert, Fare)
    ├── data/
    │   ├── stops.ts         # Kathmandu Valley stops with coordinates
    │   ├── routes.ts        # Transit routes (Sajha, Ring Road, Tempo, etc.)
    │   ├── fares.ts         # Bagmati Province fare tiers & rules
    │   ├── alerts.ts        # Traffic alerts data
    │   └── touristSpots.ts  # Heritage sites & transit advice
    ├── utils/
    │   └── transitMath.ts   # Haversine distance, route matching & bilingual dict
    └── components/
        ├── Navbar.tsx       # Header, language switcher, student badge
        ├── BottomNav.tsx    # Mobile responsive navigation bar
        ├── RouteSearch.tsx  # Search origin/destination & quick commutes
        ├── RouteCard.tsx    # Route details, boarding/drop-off & fares
        ├── TransitMap.tsx   # Leaflet interactive Kathmandu map
        ├── FareCalculator.tsx # Distance slider & 45% student ID discount
        ├── TouristGuide.tsx # Tourist instructions & Nepali phrases
        ├── BusDirectory.tsx # Operator fleet directory & schedules
        └── TransitAlerts.tsx# Commuter traffic alerts & submission
```

## License

This project was built for **CodeRush 2026**, organized by Nepalaya IT Club.
