// components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-md rounded-b-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-3xl font-bold tracking-tight">Safai Index</h1>
        {/* Navigation (optional, can be expanded) */}
        <nav>
          <ul className="flex space-x-6">
            {/* Example Navigation Links (can be uncommented and expanded) */}
            {/*
            <li><a href="#" className="hover:text-blue-200 transition duration-300">Home</a></li>
            <li><a href="#" className="hover:text-blue-200 transition duration-300">About</a></li>
            <li><a href="#" className="hover:text-blue-200 transition duration-300">Services</a></li>
            <li><a href="#" className="hover:text-blue-200 transition duration-300">Contact</a></li>
            */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;