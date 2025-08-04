// components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="bg-slate-50 text-slate-800 p-[1.1rem] shadow-md border-b border-slate-200">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl ml-[2rem] font-semibold tracking-tight text-slate-700">Safai Index</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a 
                href="#" 
                className="text-slate-600 hover:text-slate-900 transition duration-200"
              >
                Home
              </a>
            </li>
            {/* Add more links if needed */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
