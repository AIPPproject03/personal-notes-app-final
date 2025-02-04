import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// PAGES
import Home from "./pages/Home";
import ArchivePage from "./pages/ArchivePage";
import CatatanPage from "./pages/CatatanPage";
import DetailPage from "./pages/DetailPage";
import NotFoundPage from "./pages/404";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// COMPONENTS
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
// CONTEXTS
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

function AppContent() {
  const { user } = useAuth();

  return (
    <>
      {user && <Navigation />}
      <main>
        <Routes>
          {!user ? (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/catatan"
                element={
                  <ProtectedRoute>
                    <CatatanPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/archive"
                element={
                  <ProtectedRoute>
                    <ArchivePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/catatan/:id"
                element={
                  <ProtectedRoute>
                    <DetailPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
