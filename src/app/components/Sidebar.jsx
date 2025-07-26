// 'use client';

// import React, { useState } from 'react';
// import {
//   Home,
//   FileText,
//   BarChart3,
//   Settings,
//   ChevronLeft,
//   ChevronRight
// } from 'lucide-react';

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   const menuItems = [
//     { icon: Home, label: 'Dashboard', href: '/dashboard' },
//     { icon: FileText, label: 'Washrooms', href: '/washrooms' },
//     { icon: BarChart3, label: 'Reports', href: '/reports' },
//     { icon: Settings, label: 'Settings', href: '/settings' },
//   ];

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="relative">
//       {/* Sidebar Container */}
//       <div
//         className={`
//           fixed left-0 top-0 h-screen bg-slate-900 text-white shadow-2xl z-50
//           transition-all duration-300 ease-in-out
//           ${isOpen ? 'w-64' : 'w-16'}
//         `}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b border-slate-700">
//           <div className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
//             {isOpen && (
//               <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
//                 Dashboard
//               </h1>
//             )}
//           </div>

//           {/* Toggle Button */}
//           <button
//             onClick={toggleSidebar}
//             className="p-2 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
//           >
//             {isOpen ? (
//               <ChevronLeft size={20} />
//             ) : (
//               <ChevronRight size={20} />
//             )}
//           </button>
//         </div>

//         {/* Navigation Menu */}
//         <nav className="mt-6 px-2">
//           <ul className="space-y-2">
//             {menuItems.map((item, index) => {
//               const IconComponent = item.icon;
//               return (
//                 <li key={index}>
//                   <a
//                     href={item.href}
//                     className={`
//                       flex items-center px-3 py-3 rounded-lg text-slate-300 hover:text-white
//                       hover:bg-slate-800 transition-all duration-200 group
//                       focus:outline-none focus:ring-2 focus:ring-blue-500
//                       ${!isOpen ? 'justify-center' : ''}
//                     `}
//                   >
//                     <IconComponent
//                       size={20}
//                       className="flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
//                     />

//                     {isOpen && (
//                       <span className="ml-3 font-medium transition-opacity duration-300">
//                         {item.label}
//                       </span>
//                     )}

//                     {/* Tooltip for collapsed state */}
//                     {!isOpen && (
//                       <div className="absolute left-16 bg-slate-800 text-white px-2 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
//                         {item.label}
//                       </div>
//                     )}
//                   </a>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>

//         {/* Footer */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
//           <div className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
//             {isOpen && (
//               <div className="flex items-center space-x-3">
//                 <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                   <span className="text-sm font-bold">JD</span>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium">John Doe</p>
//                   <p className="text-xs text-slate-400">Administrator</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Overlay for mobile */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={toggleSidebar}
//         />
//       )}

//       {/* Main Content Area Spacer */}
//       <div className={`transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
//         {/* Demo content */}
//         <div className="p-1 min-h-screen bg-slate-50">

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

"use client";

import React, { useState } from "react";
import {
  Home,
  FileText,
  BarChart3,
  Settings,
  MapPin,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Plus,
  List,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: MapPin, label: "Locations", href: "/locations" },

    {
      icon: MapPin,
      label: "Location Types",
      hasDropdown: true,
      key: "locationTypes",
      children: [
        { icon: List, label: "View Location Types", href: "/location-types" },
        { icon: Plus, label: "Add Location Type", href: "/location-types/add" },
      ],
    },
    {
      icon: FileText,
      label: "Washrooms",
      hasDropdown: true,
      key: "washrooms",
      children: [
        { icon: List, label: "Washrooms List", href: "/washrooms" },
        { icon: Plus, label: "Add Washroom", href: "/add-location" },
      ],
    },
    { icon: BarChart3, label: "Reports", href: "/reports" },
    { icon: Users, label: "Users", href: "/users" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleItemClick = (item) => {
    if (item.hasDropdown) {
      toggleDropdown(item.key);
    } else {
      // Handle navigation for regular items
      window.location.href = item.href;
    }
  };

  return (
    <div className="relative">
      {/* Sidebar Container */}
      <div
        className={`
    fixed left-0 top-0 h-screen bg-slate-100 text-slate-800 shadow-lg z-50
    transition-all duration-300 ease-in-out
    ${isOpen ? "w-64" : "w-16"}
  `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
          {isOpen && (
            <h1 className="text-lg font-semibold text-slate-700 tracking-wide">
              Dashboard
            </h1>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-slate-200 transition hover:scale-105"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6 px-2 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              const isDropdownOpen = openDropdowns[item.key];

              return (
                <li key={index}>
                  {/* Main Menu Item */}
                  <div
                    onClick={() => handleItemClick(item)}
                    className={`
    flex items-center px-3 py-2 rounded-md text-slate-700 hover:text-slate-900 
    hover:bg-slate-200 transition-all duration-200 group cursor-pointer
    ${!isOpen ? "justify-center" : ""}
    ${isDropdownOpen && isOpen ? "bg-slate-200 text-slate-900" : ""}
  `}
                  >
                    <IconComponent
                      size={20}
                      className="flex-shrink-0 group-hover:scale-110 transition-transform duration-200 group-hover:text-cyan-400"
                    />

                    {isOpen && (
                      <>
                        <span className="ml-3 font-medium transition-opacity duration-300 flex-1">
                          {item.label}
                        </span>

                        {item.hasDropdown && (
                          <div className="ml-auto">
                            {isDropdownOpen ? (
                              <ChevronUp size={16} className="text-cyan-400" />
                            ) : (
                              <ChevronDown
                                size={16}
                                className="text-slate-400 group-hover:text-cyan-400"
                              />
                            )}
                          </div>
                        )}
                      </>
                    )}

                    {/* Tooltip for collapsed state */}
                    {!isOpen && (
                      <div className="absolute left-16 bg-white border border-slate-300 text-slate-800 px-2 py-1 rounded-md text-sm shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        {item.label}
                      </div>
                    )}
                  </div>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && isOpen && (
                    <div
                      className={`
                        overflow-hidden transition-all duration-300 ease-in-out
                        ${
                          isDropdownOpen
                            ? "max-h-40 opacity-100"
                            : "max-h-0 opacity-0"
                        }
                      `}
                    >
                      <ul className="mt-1 ml-4 space-y-1 border-l-2 border-slate-700/50 pl-4">
                        {item.children?.map((child, childIndex) => {
                          const ChildIcon = child.icon;
                          return (
                            <li key={childIndex}>
                              <a
                                href={child.href}
                                className="flex items-center px-3 py-2 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-all duration-200 group text-sm"
                              >
                                <ChildIcon
                                  size={16}
                                  className="flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                                />
                                <span className="ml-2 font-medium">
                                  {child.label}
                                </span>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-slate-50">
          {/* User Profile */}
          <div className="p-4">
            <div
              className={`transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              {isOpen && (
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">JD</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      John Doe
                    </p>
                    <p className="text-xs text-slate-500">Administrator</p>
                  </div>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={() => {
                /* Handle logout */
              }}
              className={`
    w-full flex items-center px-3 py-2 rounded-md text-slate-600 hover:text-red-500 
    hover:bg-red-100 transition-all duration-200 group
    ${!isOpen ? "justify-center" : ""}
  `}
            >
              <LogOut
                size={20}
                className="flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
              />

              {isOpen && <span className="ml-3 font-medium">Logout</span>}

              {/* Tooltip for collapsed state */}
              {!isOpen && (
                <div className="absolute left-16 bg-slate-800 text-white px-2 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 border border-slate-600">
                  Logout
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content Area Spacer */}
      <div
        className={`transition-all duration-300 ${isOpen ? "ml-64" : "ml-16"}`}
      >
        {/* Demo content with suggested header colors */}
      </div>
    </div>
  );
};

export default Sidebar;
