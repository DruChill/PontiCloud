import React, { useEffect, useState } from 'react';

const themes = [
  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave",
  "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua",
  "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk",
  "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", "dim",
  "nord", "sunset"
];

const ThemeSelector = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('data-theme') || 'lofi';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleThemeChange = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('data-theme', theme);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="dropdown dropdown-end z-10" id="theme-selector">
      <div tabIndex="0" className="btn gap-1 normal-case btn-ghost" onClick={toggleDropdown}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
        <path d="M3 21v-4a4 4 0 1 1 4 4h-4"></path>
        <path d="M21 3a16 16 0 0 0 -12.8 10.2"></path>
        <path d="M21 3a16 16 0 0 1 -10.2 12.8"></path>
        <path d="M10.6 9a9 9 0 0 1 4.4 4.4"></path>
      </svg>
        <span className="">Tema</span>
        
        <svg width="12px" height="12px" className="ml-1 h-3 w-3 fill-current opacity-60 sm:inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      {isDropdownOpen && (
        <div className="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px max-h-48 h-[70vh] w-52 overflow-y-auto shadow-2xl mt-16">
          <div className="grid grid-cols-1 gap-3 p-3" tabIndex="0">
            {themes.map((theme) => (
              <div key={theme} className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" data-set-theme={theme} data-act-class="outline" onClick={() => handleThemeChange(theme)}>
                <div data-theme={theme} className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                  <div className="grid grid-cols-5 grid-rows-3">
                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                      <div className="flex-grow text-sm">{theme}</div>
                      <div className="flex flex-shrink-0 flex-wrap gap-1">
                        <div className="bg-primary w-2 rounded" />
                        <div className="bg-secondary w-2 rounded" />
                        <div className="bg-accent w-2 rounded" />
                        <div className="bg-neutral w-2 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;