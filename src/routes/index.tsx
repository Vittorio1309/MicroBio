import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../features/auth";
import { ChoosePage } from "../features/common";
import { AgroPage } from "../features/agro";
import Orcamento from "../features/agro/pages/Orcamento";
import { AboutPage } from "../features/about";
import AnaliseSolo from "../features/services/pages/tela_analise_solo";
import AnaliseFoliar from "../features/services/pages/tela_analise_foliar";
import ConsultoriaManejo from "../features/services/pages/tela_consultoria_manejo";
import ControleBiologico from "../features/services/pages/tela_controle_biologico";
import ValidacaoBioinsumos from "../features/services/pages/tela_validacao_bioinsumos";
import MonitoramentoPragas from "../features/services/pages/tela_monitoramento_pragas";
import NossosServicos from "../features/services/pages/tela_nossos_servicos";

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
        <Route path="/analise-solo" element={<AnaliseSolo />} />
        <Route path="/analise-foliar" element={<AnaliseFoliar />} />
        <Route path="/consultoria-manejo" element={<ConsultoriaManejo />} />
        <Route path="/controle-biologico" element={<ControleBiologico />} />
        <Route path="/validacao-bioinsumos" element={<ValidacaoBioinsumos />} />
        <Route path="/monitoramento-pragas" element={<MonitoramentoPragas />} />
        <Route path="/servicos" element={<NossosServicos />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
};
