import React, { useState } from 'react';
import { TransitAlert, Language } from '../types/transit';
import { INITIAL_ALERTS } from '../data/alerts';
import { Bell, AlertTriangle, Info, AlertOctagon, PlusCircle, CheckCircle2, Clock, MapPin } from 'lucide-react';

interface TransitAlertsProps {
  language: Language;
}

export const TransitAlerts: React.FC<TransitAlertsProps> = ({ language }) => {
  const [alerts, setAlerts] = useState<TransitAlert[]>(INITIAL_ALERTS);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newSeverity, setNewSeverity] = useState<'warning' | 'info' | 'critical'>('warning');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleAddAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newLocation) return;

    const newEntry: TransitAlert = {
      id: `alert-${Date.now()}`,
      severity: newSeverity,
      title: newTitle,
      titleNepali: newTitle,
      location: newLocation,
      description: newDescription || 'Reported by commuter community.',
      timeAgo: 'Just now'
    };

    setAlerts([newEntry, ...alerts]);
    setNewTitle('');
    setNewLocation('');
    setNewDescription('');
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setShowSubmitModal(false);
    }, 1200);
  };

  const getSeverityBadge = (severity: TransitAlert['severity']) => {
    switch (severity) {
      case 'critical':
        return {
          icon: <AlertOctagon className="w-4 h-4 text-red-600" />,
          bg: 'bg-red-50 text-red-700 border-red-200',
          label: 'Heavy Delay'
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          label: 'Moderate Traffic'
        };
      default:
        return {
          icon: <Info className="w-4 h-4 text-sky-600" />,
          bg: 'bg-sky-50 text-sky-700 border-sky-200',
          label: 'Transit Update'
        };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold mb-3 border border-amber-200">
            <Bell className="w-3.5 h-3.5 text-amber-600" />
            <span>{language === 'en' ? 'Live Community Road Advisory' : 'प्रत्यक्ष सडक तथा ट्राफिक अपडेट'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'en' ? 'Kathmandu Valley Transit Alerts' : 'काठमाडौँ उपत्यका ट्राफिक सूचना'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {language === 'en'
              ? 'Real-time bottlenecks, road expansions, and bus route diversions submitted by local commuters.'
              : 'उपत्यकाका सडक जाम, मर्मत कार्य तथा बस रुट हेरफेर सम्बन्धी जानकारी।'}
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center space-x-2 shadow-sm transition-all active:scale-95"
        >
          <PlusCircle className="w-4 h-4 text-emerald-400" />
          <span>{language === 'en' ? 'Report Traffic Delay' : 'जामको जानकारी पठाउनुहोस्'}</span>
        </button>
      </div>

      {/* Modal for crowdsourcing alerts */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 relative">
            <h3 className="font-extrabold text-lg text-slate-900 mb-1">
              {language === 'en' ? 'Report Road Delay or Jam' : 'नयाँ ट्राफिक सूचना थप्नुहोस्'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Help fellow Kathmandu commuters plan better routes.
            </p>

            {submittedSuccess ? (
              <div className="p-6 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                <p className="font-bold text-slate-900 text-sm">Alert posted successfully!</p>
              </div>
            ) : (
              <form onSubmit={handleAddAlert} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Location / Chowk</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Koteshwor Chowk, Kalanki Underpass"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Alert Headline</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 20-min delay towards Airport"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Severity Level</label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="warning">Moderate Delay (10-15 mins)</option>
                    <option value="critical">Heavy Jam / Road Block (30+ mins)</option>
                    <option value="info">General Info / Route Diverted</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Details (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="Describe cause (e.g. VIP movement, asphalt work, accident)..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                  ></textarea>
                </div>

                <div className="pt-2 flex items-center justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                  >
                    Submit Alert
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Alerts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {alerts.map((alert) => {
          const badge = getSeverityBadge(alert.severity);
          return (
            <div key={alert.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badge.bg}`}>
                    {badge.icon}
                    <span>{badge.label}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-[11px] text-slate-400 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{alert.timeAgo}</span>
                  </div>
                </div>

                <h4 className="font-extrabold text-slate-900 text-base leading-tight mb-1">
                  {language === 'en' ? alert.title : alert.titleNepali}
                </h4>

                <div className="flex items-center space-x-1 text-xs text-emerald-700 font-semibold mb-2">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{alert.location}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {alert.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Verified Commuter Alert</span>
                <span className="text-emerald-600 font-semibold">Live</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
