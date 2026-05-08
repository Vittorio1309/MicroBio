// filepath: src/routes/index.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { ChoosePage } from "../pages/ChoosePage";
import { AgroPage } from "../pages/AgroPage";
import { AdminPage } from "../pages/AdminPage";
import { UserPage } from "../pages/UserPage";
export { AboutPage } from '../pages/AboutPage';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChoosePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/agro" element={<AgroPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
};
