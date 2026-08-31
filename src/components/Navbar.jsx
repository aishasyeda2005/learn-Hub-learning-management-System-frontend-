import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Search, ChevronDown, Moon, Sun } from "lucide-react";
import { useApp } from "../context/AppContext";
import AuthModal from "./AuthModal";
import ExploreMenu from "./ExploreMenu";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState(null); // null | "login" | "signup"
  const [exploreOpen, setExploreOpen] = useState(false);
  const { darkMode, setDarkMode } = useApp();

  const navLinks = [
    { to: "/courses", label: "Courses" },
    { to: "/profile", label: "Profile" },
  ];

  return (
    <nav className="relative bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#0056D2] dark:text-blue-400 shrink-0">
          learnhub
        </Link>

        {/* Explore dropdown */}
        <button
          onClick={() => setExploreOpen(!exploreOpen)}
          className="hidden md:flex items-center gap-1 text-gray-700 dark:text-gray-200 font-medium text-sm shrink-0"
        >
          Explore <ChevronDown size={16} className={`transition-transform ${exploreOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Search bar - Coursera style pill */}
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="flex items-center w-full border border-gray-300 dark:border-gray-600 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-[#0056D2]">
            <input
              type="text"
              placeholder="What do you want to learn?"
              className="w-full px-4 py-2 text-sm bg-transparent outline-none text-gray-700 dark:text-gray-200"
            />
            <button className="bg-[#0056D2] text-white p-2.5 mr-1 rounded-full">
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* Right side links */}
        <div className="hidden md:flex items-center gap-5 ml-auto shrink-0">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-[#0056D2] dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-[#0056D2] dark:hover:text-blue-400"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setAuthMode("login")}
            className="text-sm font-medium text-[#0056D2] dark:text-blue-400"
          >
            Log In
          </button>
          <button
            onClick={() => setAuthMode("signup")}
            className="text-sm font-semibold border-2 border-[#0056D2] text-[#0056D2] dark:text-blue-400 dark:border-blue-400 px-4 py-1.5 rounded-full hover:bg-blue-50 dark:hover:bg-gray-800 transition"
          >
            Join for Free
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden ml-auto text-gray-700 dark:text-gray-200" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-6 pb-4 flex flex-col gap-3 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-full overflow-hidden mt-3">
            <input
              type="text"
              placeholder="What do you want to learn?"
              className="w-full px-4 py-2 text-sm bg-transparent outline-none text-gray-700 dark:text-gray-200"
            />
            <button className="bg-[#0056D2] text-white p-2.5 mr-1 rounded-full">
              <Search size={16} />
            </button>
          </div>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 dark:text-gray-200 font-medium py-1"
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 py-1"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />} Toggle theme
          </button>
          <button
            onClick={() => { setAuthMode("signup"); setMenuOpen(false); }}
            className="text-sm font-semibold border-2 border-[#0056D2] text-[#0056D2] px-4 py-2 rounded-full w-full"
          >
            Join for Free
          </button>
        </div>
      )}

      {exploreOpen && <ExploreMenu onClose={() => setExploreOpen(false)} />}

      {authMode && <AuthModal mode={authMode} onClose={() => setAuthMode(null)} />}
    </nav>
  );
}

export default Navbar;
