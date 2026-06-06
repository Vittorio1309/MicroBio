import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../features/auth";
import { ChoosePage } from "../features/common";
import { AgroPage } from "../features/agro/pages/AgroPage";
import Orcamento from "../features/agro/pages/Orcamento";
import { AboutPage } from "../features/about";
import AnaliseSolo from "../features/services/pages/tela_analise_solo";
import AnaliseFoliar from "../features/services/pages/tela_analise_foliar";
import ConsultoriaManejo from "../features/services/pages/tela_consultoria_manejo";
import ControleBiologico from "../features/services/pages/tela_controle_biologico";
import ValidacaoBioinsumos from "../features/services/pages/tela_validacao_bioinsumos";
import MonitoramentoPragas from "../features/services/pages/tela_monitoramento_pragas";
import NossosServicos from "../features/services/pages/tela_nossos_servicos";
import AdminPanel from "../features/admin/pages/AdminPanel";
import ClientePanel from "../features/cliente/pages/ClientePanel";

function AdminRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("microbio_token");
  const role = localStorage.getItem("microbio_role");
  if (!token) return <Navigate to="/login" replace />;
  if (role !== "ROLE_ADMIN") return <Navigate to="/agro" replace />;
  return <>{children}</>;
}

function ClienteRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("microbio_token");
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Common/Public Routes */}
        <Route path="/" element={<ChoosePage />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/servicos" element={<NossosServicos />} />
        <Route path="/analise-solo" element={<AnaliseSolo />} />
        <Route path="/analise-foliar" element={<AnaliseFoliar />} />
        <Route path="/consultoria-manejo" element={<ConsultoriaManejo />} />
        <Route path="/controle-biologico" element={<ControleBiologico />} />
        <Route path="/validacao-bioinsumos" element={<ValidacaoBioinsumos />} />
        <Route path="/monitoramento-pragas" element={<MonitoramentoPragas />} />
        <Route path="/orcamento" element={<Orcamento />} />

        {/* Agro Platform (public) */}
        <Route path="/agro" element={<AgroPage />} />

        {/* Admin-only Routes */}
        <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />

        {/* Client Portal */}
        <Route path="/cliente" element={<ClienteRoute><ClientePanel /></ClienteRoute>} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
