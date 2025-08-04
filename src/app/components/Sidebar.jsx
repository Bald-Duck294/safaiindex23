"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  Building2,
  List,
  ClipboardList,
  MapPin,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Plus,
  Folder,
  FolderPlus,
  Bath,
  Star,
  FileBarChart,
  Menu,
  X,
  UserCheck,
  CheckCircle,
} from "lucide-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("cleaner_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing user from localStorage");
      }
    }
  }, []);

  const isAdmin = user?.role_id === 1;

  const adminMenuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Building2, label: "Locations", href: "/locations" },
    {
      icon: Folder,
      label: "Location Types",
      hasDropdown: true,
      key: "locationTypes",
      children: [
        { icon: List, label: "View Location Types", href: "/location-types" },
        { icon: FolderPlus, label: "Add Location Type", href: "/location-types/add" },
      ],
    },
    {
      icon: Bath,
      label: "Washrooms",
      hasDropdown: true,
      key: "washrooms",
      children: [
        { icon: List, label: "Washrooms List", href: "/washrooms" },
        { icon: Plus, label: "Add Washroom", href: "/add-location" },
      ],
    },
    { icon: UserCheck, label: "Cleaner Review", href: "/cleaner-review" },
    { icon: Star, label: "User Review", href: "/user-review" },
  ];

  const cleanerMenuItems = [
    { icon: UserCheck, label: "Cleaner Review", href: "/cleaner-review" },
    { icon: CheckCircle, label: "Completed Tasks", href: "/completed-tasks" },
  ];

  const menuItems = isAdmin ? adminMenuItems : cleanerMenuItems;

  // useEffect(() => {
  //   const checkMobile = () => {
  //     const mobile = window.innerWidth < 1024;
  //     setIsMobile(mobile);
  //   };

  //   checkMobile();
  //   window.addEventListener("resize", checkMobile);
  //   return () => window.removeEventListener("resize", checkMobile);
  // }, []);


  useEffect(() => {
  const checkMobile = () => {
    const mobile = window.innerWidth < 1024;
    setIsMobile(mobile);
    if (mobile) {
      setSidebarOpen(false); // close sidebar on mobile
    }
  };

  checkMobile();
  window.addEventListener("resize", checkMobile);
  return () => window.removeEventListener("resize", checkMobile);
}, []);


  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleItemClick = (item) => {
    if (item.hasDropdown) {
      if (!sidebarOpen) {
        setSidebarOpen(true);
        setTimeout(() => {
          toggleDropdown(item.key);
        }, 100);
      } else {
        toggleDropdown(item.key);
      }
    } else {
      window.location.href = item.href;
      if (isMobile) setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("cleaner_user");
    window.location.href = "/login"; // or use router.push if using next/router
  };

  const getInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-[60] p-2 rounded-lg bg-white text-slate-900 hover:bg-slate-100 shadow-lg lg:hidden transition-all duration-200 hover:scale-105"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      <div
        className={`
          relative bg-white text-slate-900 shadow-xl border-r border-slate-200
          transition-all duration-300 ease-in-out h-full flex flex-col
          ${sidebarOpen ? "w-64" : "w-16"}
          ${isMobile && !sidebarOpen ? "hidden" : ""}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50 min-h-[60px]">
          {sidebarOpen && (
            <h1 className="text-lg font-semibold text-slate-900 tracking-wide">
              Dashboard
            </h1>
          )}
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-slate-200 transition-all duration-200 hover:scale-105 group"
            >
              {sidebarOpen ? (
                <ChevronLeft size={20} className="group-hover:text-slate-600" />
              ) : (
                <ChevronRight size={20} className="group-hover:text-slate-600" />
              )}
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2 mt-4">
          <ul className="space-y-1">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              const isDropdownOpen = openDropdowns[item.key];

              return (
                <li key={index}>
                  <div
                    onClick={() => handleItemClick(item)}
                    className={`
                      flex items-center px-3 py-3 rounded-lg text-slate-600 
                      hover:text-slate-900 hover:bg-slate-100 transition-all duration-200 
                      group cursor-pointer relative overflow-hidden
                      ${!sidebarOpen ? "justify-center" : ""}
                      ${isDropdownOpen && sidebarOpen ? "bg-slate-100 text-slate-900" : ""}
                      hover:shadow-sm
                    `}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>

                    <IconComponent size={20} className="relative z-10 flex-shrink-0 group-hover:scale-110 transition-all duration-200 group-hover:text-slate-700" />

                    {sidebarOpen && (
                      <>
                        <span className="relative z-10 ml-3 font-medium transition-all duration-300 flex-1 group-hover:translate-x-1">
                          {item.label}
                        </span>

                        {item.hasDropdown && (
                          <div className="relative z-10 ml-auto">
                            {isDropdownOpen ? (
                              <ChevronUp size={16} className="text-slate-500 transition-transform duration-200" />
                            ) : (
                              <ChevronDown
                                size={16}
                                className="text-slate-400 group-hover:text-slate-600 transition-all duration-200 group-hover:rotate-180"
                              />
                            )}
                          </div>
                        )}
                      </>
                    )}

                    {!sidebarOpen && (
                      <div className="absolute left-16 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20 transform translate-x-2 group-hover:translate-x-0">
                        {item.label}
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-800 rotate-45"></div>
                      </div>
                    )}
                  </div>

                  {item.hasDropdown && sidebarOpen && (
                    <div className={`${isDropdownOpen ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"} overflow-hidden transition-all duration-300 ease-in-out`}>
                      <ul className="ml-4 space-y-1 border-l-2 border-slate-200 pl-4 relative">
                        <div className={`absolute left-0 top-0 w-0.5 bg-gradient-to-b from-slate-400 to-slate-200 transition-all duration-500 ${isDropdownOpen ? "h-full" : "h-0"}`}></div>
                        {item.children?.map((child, childIndex) => {
                          const ChildIcon = child.icon;
                          return (
                            <li
                              key={childIndex}
                              className={`transform transition-all duration-300 ${isDropdownOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
                              style={{ transitionDelay: `${childIndex * 50}ms` }}
                            >
                              <a
                                href={child.href}
                                onClick={() => isMobile && setSidebarOpen(false)}
                                className="flex items-center px-3 py-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all duration-200 group text-sm relative overflow-hidden"
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-slate-25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                                <ChildIcon size={16} className="relative z-10 flex-shrink-0 group-hover:scale-110 transition-all duration-200 group-hover:text-slate-600" />
                                <span className="relative z-10 ml-2 font-medium group-hover:translate-x-1 transition-transform duration-200">
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
          <div className="p-4">
            {sidebarOpen && (
              <div className="flex items-center space-x-3 mb-3 p-2 rounded-lg hover:bg-slate-100 transition-all duration-200 group cursor-pointer">
                <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <span className="text-sm font-bold text-slate-700">{getInitials()}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 group-hover:text-slate-700 transition-colors duration-200">
                    {user?.name || "Unknown"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {isAdmin ? "Administrator" : "Cleaner"}
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              className={`w-full flex items-center px-3 py-2 rounded-lg text-slate-600 hover:text-red-500 
                hover:bg-red-50 transition-all duration-200 group relative overflow-hidden
                ${!sidebarOpen ? "justify-center" : ""}
                hover:shadow-sm`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-red-25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              <LogOut size={20} className="relative z-10 flex-shrink-0 group-hover:scale-110 transition-all duration-200" />
              {sidebarOpen && (
                <span className="relative z-10 ml-3 font-medium group-hover:translate-x-1 transition-transform duration-200">
                  Logout
                </span>
              )}
              {!sidebarOpen && (
                <div className="absolute left-16 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20 transform translate-x-2 group-hover:translate-x-0">
                  Logout
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-800 rotate-45"></div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && isMobile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar} />
      )}
    </>
  );
};

export default Sidebar;
