// filepath: src/routes/index.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { ChoosePage } from "../pages/ChoosePage";
import { Nav, Section, BackgroundBorder } from "../features/agro";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChoosePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/agro"
          element={
            <>
              <Nav />
              <Section />
              <BackgroundBorder />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};