import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserLogged, putAccessToken } from "../api/app-data";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const { error, data } = await getUserLogged();
      if (!error) setUser(data);
    }
    fetchUser();
  }, []);

  function logout() {
    putAccessToken("");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
