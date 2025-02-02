import React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { FiLogOut, FiSun, FiMoon } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

import "../styles/navbar.css";

function Navigation() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchKeyword = searchParams.get("search") || "";
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleSearchChange = (event) => {
    setSearchParams(event.target.value ? { search: event.target.value } : {});
  };

  const isSearchVisible =
    location.pathname === "/catatan" || location.pathname === "/archive";

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin logout?")) {
      logout();
    }
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="logo">
          <h1>MyNotes</h1>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/catatan">Catatan</Link>
          </li>
          <li>
            <Link to="/archive">Arsip</Link>
          </li>
        </ul>
        {isSearchVisible && (
          <div className="search-container">
            <input
              type="text"
              placeholder="Cari catatan..."
              value={searchKeyword}
              onChange={handleSearchChange}
            />
          </div>
        )}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title="Ubah Tema"
        >
          {theme === "light" ? <FiMoon size={24} /> : <FiSun size={24} />}
        </button>
        <button className="logout-icon" onClick={handleLogout} title="Logout">
          <FiLogOut size={24} />
        </button>
      </nav>
    </div>
  );
}

export default Navigation;
