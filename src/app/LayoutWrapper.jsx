// app/LayoutWrapper.jsx
'use client'; 

import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

export default function LayoutWrapper({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true); 

  return (
    <>
      <div className="flex h-[90vh] max-w-[100rem] mx-auto overflow-hidden">

        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main content */}
        <div className="flex flex-col flex-grow h-full">
          <Header />
          <div className="flex-grow overflow-y-auto">
            {children} 
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}