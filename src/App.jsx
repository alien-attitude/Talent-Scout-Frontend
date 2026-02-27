import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage.jsx";
import {ProfileDetailPage} from "./pages/ProfileDetailPage.jsx";
import {SubmissionPage} from "./pages/SubmissionPage.jsx";


export default function App() {
  return (
    <BrowserRouter>
        <main className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Navigate to="/submit" replace />} />
            <Route path="submit" element={<SubmissionPage/>} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/candidates/:id" element={<ProfileDetailPage />} />
          </Routes>
        </main>
    </BrowserRouter>
  );
}