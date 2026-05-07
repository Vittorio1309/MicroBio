import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../features/auth";
import { ChoosePage } from "../features/common";
import { AgroPage } from "../features/agro";
import Orcamento from "../features/agro/pages/Orcamento";
import { AboutPage } from "../features/about";

/**
 * AppRoutes Component
 * Centralized routing configuration for the entire application
 * Organized by feature modules for better maintainability
 */
export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Common/Public Routes */}
        <Route path="/" element={<ChoosePage />} />

        {/* Feature Routes */}
        <Route path="/agro" element={<AgroPage />} />
        <Route path="/orcamento" element={<Orcamento />} />
        <Route path="/sobre" element={<AboutPage />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
};
