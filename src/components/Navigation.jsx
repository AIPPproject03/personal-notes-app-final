import React, { useState, useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { FiLogOut, FiSun, FiMoon, FiGlobe } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import "../styles/navbar.css";

function Navigation() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchKeyword = searchParams.get("search") || "";
  const { logout } = useAuth();
  const { language, toggleLanguage } = useLanguage();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSearchChange = (event) => {
    const keyword = event.target.value;
    setSearchParams(keyword ? { search: keyword } : {});
  };

  const isSearchVisible =
    location.pathname === "/catatan" || location.pathname === "/archive";

  return (
    <div className="navbar-container">
      {isLoading ? (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>{language === "id" ? "Memuat..." : "Loading..."}</p>
        </div>
      ) : (
        <nav className="navbar">
          <div className="logo">
            <h1>MyNotes</h1>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/">{language === "id" ? "Beranda" : "Home"}</Link>
            </li>
            <li>
              <Link to="/catatan">
                {language === "id" ? "Catatan" : "Notes"}
              </Link>
            </li>
            <li>
              <Link to="/archive">
                {language === "id" ? "Arsip" : "Archive"}
              </Link>
            </li>
          </ul>
          {isSearchVisible && (
            <div className="search-container">
              <input
                type="text"
                placeholder={
                  language === "id" ? "Cari catatan..." : "Search notes..."
                }
                value={searchKeyword}
                onChange={handleSearchChange}
              />
            </div>
          )}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            {theme === "light" ? <FiMoon size={24} /> : <FiSun size={24} />}
          </button>
          <button
            className="language-toggle"
            onClick={toggleLanguage}
            title="Toggle Language"
          >
            <FiGlobe size={24} />
            <p>{language === "id" ? "IN" : "EN"}</p>
          </button>
          <button className="logout-icon" onClick={logout} title="Logout">
            <FiLogOut size={24} color="black" />
          </button>
        </nav>
      )}
    </div>
  );
}

export default Navigation;
