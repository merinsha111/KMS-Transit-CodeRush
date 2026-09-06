import { TransitAlert } from '../types/transit';

export const INITIAL_ALERTS: TransitAlert[] = [
  {
    id: 'alert-1',
    severity: 'warning',
    title: 'Peak Hour Heavy Traffic: Koteshwor Chowk',
    titleNepali: 'कोटेश्वर चोकमा अत्यधिक सवारी चाप',
    location: 'Koteshwor Underpass & Intersection',
    description: 'Expect 15-20 min delays on buses travelling towards Bhaktapur and Airport due to rush hour bottleneck.',
    timeAgo: '10 mins ago'
  },
  {
    id: 'alert-2',
    severity: 'info',
    title: 'Sajha Yatayat EV Expansion',
    titleNepali: 'साझा यातायात नयाँ विद्युतीय बस थप',
    location: 'Lagankhel - Budhanilkantha Route',
    description: '4 new electric low-floor buses deployed on Route 101 with frequency increased to every 8 minutes.',
    timeAgo: '1 hour ago'
  },
  {
    id: 'alert-3',
    severity: 'critical',
    title: 'Pipeline Work: Chabahil - Boudha Stretch',
    titleNepali: 'चाबहिल - बौद्ध सडक मर्मत कार्य',
    location: 'Chabahil Chowk near Mitra Park',
    description: 'One-lane road maintenance in progress. Electric tempos and micros rerouted slightly via Guheshwori corridor.',
    timeAgo: '2 hours ago'
  }
];
