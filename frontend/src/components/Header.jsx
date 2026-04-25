import React from 'react';

const Header = ({ isDarkMode, onToggleDarkMode }) => {
  return (
    <header className="px-4 pt-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl surface-card overflow-hidden dark:border-slate-700/50 dark:bg-slate-900/70">
        <div className="relative px-6 py-8 sm:px-10 sm:py-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange-300/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 left-1/3 h-56 w-56 rounded-full bg-teal-300/40 blur-3xl" />

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="inline-flex items-center rounded-full border border-orange-300/50 bg-orange-100/70 px-3 py-1 text-xs font-semibold tracking-wide text-orange-700 dark:border-orange-600/50 dark:bg-orange-900/40 dark:text-orange-300">
                LIVE FORECASTING
              </p>
              <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-5xl dark:text-white">
                AI Weather Studio
              </h1>
              <p className="mt-2 max-w-2xl text-sm sm:text-base muted-text dark:text-slate-400">
                Track temperature, wind and humidity in real time with a cleaner city workflow and smart assistant chat.
              </p>
            </div>

            <button
              onClick={onToggleDarkMode}
              className="rounded-full p-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414a1 1 0 00-1.414 1.414zm2.828-2.828a1 1 0 011.414 0l1.414 1.414a1 1 0 11-1.414 1.414l-1.414-1.414a1 1 0 010-1.414zm1.414-9.414a1 1 0 00-1.414 1.414l1.414 1.414a1 1 0 101.414-1.414l-1.414-1.414zM9 17a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm-4.536-.464l-1.414 1.414a1 1 0 101.414 1.414l1.414-1.414a1 1 0 00-1.414-1.414zm0-2.828a1 1 0 00-1.414 0L1.586 12a1 1 0 101.414 1.414l1.414-1.414a1 1 0 000-1.414zM3 11a1 1 0 110-2 1 1 0 010 2z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
