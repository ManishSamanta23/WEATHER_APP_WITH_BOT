import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl surface-card px-6 py-8 dark:bg-slate-900/70 dark:border-slate-700/50">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">Weather App</h3>
            <p className="text-sm muted-text dark:text-slate-400">Modern weather dashboard with AI assistance and location-aware forecasts.</p>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm muted-text dark:text-slate-400">
              <li><a href="#" className="transition hover:text-slate-900 dark:hover:text-white">Home</a></li>
              <li><a href="#" className="transition hover:text-slate-900 dark:hover:text-white">About</a></li>
              <li><a href="#" className="transition hover:text-slate-900 dark:hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">Data Source</h3>
            <p className="text-sm muted-text dark:text-slate-400">Powered by OpenWeatherMap API and Gemini AI.</p>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-6 text-center text-sm muted-text dark:border-slate-700/50 dark:text-slate-400">
          <p>© 2026 Weather Dashboard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
