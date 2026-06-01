import { Language, UserSession } from '../types';
import { BookOpen, LogOut, Phone, MapPin, Globe, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  session: UserSession;
  onLogout: () => void;
  activeTab: 'all' | 'my-courses';
  setActiveTab: (tab: 'all' | 'my-courses') => void;
}

export default function Navbar({
  language,
  onToggleLanguage,
  session,
  onLogout,
  activeTab,
  setActiveTab,
}: NavbarProps) {
  const isOm = language === 'om';

  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-40 px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Title and metadata */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-indigo-400" />
            <h1 className="text-2xl font-black tracking-tight text-white title-font bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 text-transparent">
              Amoo Academy
            </h1>
          </div>
          
          {/* Amoo Contact Info Banner requested under +251967145146 / Harar */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-y-1 gap-x-3 mt-1.5 text-[11px] text-slate-400 font-medium">
            <span className="flex items-center gap-1 text-blue-400 font-semibold">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
              {isOm ? 'Abbaa:' : 'Owner:'}{' '}
              <span className="text-slate-200 font-normal">Amanuel</span>
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="h-3 w-3 text-indigo-400 shrink-0" />
              {isOm ? 'Iddoo:' : 'Address:'}{' '}
              <span className="text-slate-400">Harar, Ethiopia</span>
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <a 
              href="tel:+251967145146" 
              className="flex items-center gap-1 hover:text-indigo-300 transition text-slate-300 font-mono"
            >
              <Phone className="h-3 w-3 text-emerald-400 shrink-0" />
              +251967145146
            </a>
          </div>
        </div>

        {/* Tab & Controls Row */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {session.isLoggedIn && (
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                id="tab-all-courses"
                onClick={() => setActiveTab('all')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition duration-200 cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isOm ? 'Koorsoota Hunda' : 'All Catalog'}
              </button>
              <button
                id="tab-my-classroom"
                onClick={() => setActiveTab('my-courses')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition duration-200 relative cursor-pointer ${
                  activeTab === 'my-courses'
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{isOm ? 'Dhuunfaa Koo (Classroom)' : 'My Classroom'}</span>
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            {/* Language switch button */}
            <button
              id="global-lang-btn"
              onClick={onToggleLanguage}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-200 hover:text-white border border-slate-700 hover:border-slate-600 text-xs font-bold px-3 py-2 rounded-xl transition shadow-md cursor-pointer"
              title={isOm ? 'Switch to English' : 'Afaan Oromotti Jijjiiri'}
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{isOm ? 'English 🇬🇧' : 'Oromoo 🇪🇹'}</span>
            </button>

            {session.isLoggedIn && (
              <button
                id="system-logout-btn"
                onClick={onLogout}
                className="flex items-center gap-1 bg-red-950/40 hover:bg-red-900 border border-red-900/50 hover:border-red-600/50 text-red-300 hover:text-white text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{isOm ? 'Bahi' : 'Log Out'}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
}
