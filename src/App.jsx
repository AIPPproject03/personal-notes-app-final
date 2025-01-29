import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import ArchivePage from "./pages/ArchivePage";
import CatatanPage from "./pages/CatatanPage";
import DetailPage from "./pages/DetailPage";
import NotFoundPage from "./pages/404";

function App() {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catatan" element={<CatatanPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/catatan/:id" element={<DetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
