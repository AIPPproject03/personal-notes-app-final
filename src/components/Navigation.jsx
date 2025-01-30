import React from "react";
import {
  Link,
  useLocation,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // Import ikon logout

import "../styles/navbar.css";

function Navigation() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchKeyword = searchParams.get("search") || "";
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    const keyword = event.target.value;
    setSearchParams(keyword ? { search: keyword } : {});
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Hapus token
    navigate("/login"); // Redirect ke halaman login
  };

  const isSearchVisible =
    location.pathname === "/catatan" || location.pathname === "/archive";

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
        <button className="logout-icon" onClick={handleLogout} title="Logout">
          <FiLogOut size={24} color="#e74c3c" />
        </button>
      </nav>
    </div>
  );
}

export default Navigation;
