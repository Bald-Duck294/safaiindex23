'use client';

import { useState } from "react";
import Image from "next/image";
import WashroomsList from "../components/WashroomsList";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { icon: "🏠", label: "Dashboard" },
    { icon: "🧻", label: "Toilets" },
    { icon: "📊", label: "Reports" },
    { icon: "⚙", label: "Settings" },
  ];

  return (
    <>
      <Head>
        <title>Toilet Review System</title>
      </Head>

      <div className="flex h-[90vh] max-w-[100rem] mx-auto  overflow-hidden">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ${
            sidebarOpen ? "w-64" : "w-16"
          } bg-green-400 h-full flex flex-col`}
        >
          <div className="p-2">
            <button
              className="bg-yellow-100 rounded p-1 text-black hover:bg-yellow-200 w-full"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? "⬅" : "➡"}
            </button>
          </div>

          <ul className="p-2 space-y-2">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3 p-2 rounded hover:bg-amber-400 transition-colors"
              >
                <span className="text-lg">{item.icon}</span>
                <span className={`whitespace-nowrap transition-opacity duration-200 ${
                  sidebarOpen ? "opacity-100" : "opacity-0 hidden"
                }`}>
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-grow h-full">
          <Header />
          <div className="flex-grow overflow-y-auto">
            <WashroomsList />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
