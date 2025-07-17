import React from "react";

function Sidebar({ sidebarOpen }) {
  const menuItems = [
    { icon: "🏠", label: "Dashboard" },
    { icon: "🧻", label: "Toilets" },
    { icon: "📊", label: "Reports" },
    { icon: "⚙", label: "Settings" },
  ];
  return (
    <>
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
              <span
                className={`whitespace-nowrap transition-opacity duration-200 ${
                  sidebarOpen ? "opacity-100" : "opacity-0 hidden"
                }`}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
