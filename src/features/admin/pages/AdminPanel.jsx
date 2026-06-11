import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Usuarios from "./Usuarios";
import Clientes from "./Clientes";
import Analises from "./Analises";
import CadastrarAnalise from "./CadastrarAnalise";
import OrcamentosSolicitados from "./OrcamentosSolicitados";
import TiposExame from "./TiposExame";
import Configuracoes from "./Configuracoes";
import AnaliseComercial from "./AnaliseComercial";
import "../styles/admin.css";

export default function AdminPanel() {
  const [page, setPage] = useState("dashboard");

  const navigate = (p) => setPage(p);

  return (
    <div className="admin-scope">
      <div className="app-layout">
        <Sidebar currentPage={page} navigate={navigate} />
        <main className="app-main">
          {page === "dashboard"        && <Dashboard navigate={navigate} />}
          {page === "usuarios"         && <Usuarios />}
          {page === "clientes"         && <Clientes />}
          {page === "analises"         && <Analises navigate={navigate} />}
          {page === "cadastrar-analise"      && <CadastrarAnalise navigate={navigate} />}
          {page === "orcamentos-solicitados" && <OrcamentosSolicitados />}
          {page === "tipos-exame"            && <TiposExame />}
          {page === "configuracoes"    && <Configuracoes />}
          {page === "comercial"        && <AnaliseComercial />}
        </main>
      </div>
    </div>
  );
}

function getUsernameFromToken() {
  const token = sessionStorage.getItem("microbio_token");
  if (!token) return "";
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.sub || "";
  } catch {
    return "";
  }
}

function Sidebar({ currentPage, navigate }) {
  const goToAgro = useNavigate();
  const username = getUsernameFromToken();
  const avatarText = (username || "A").substring(0, 2).toUpperCase();
  const roleLabel = "Admin · MicroBio";

  const items = [
    { id: "dashboard",  label: "Dashboard",      icon: "⊞" },
    { id: "analises",   label: "Análises",        icon: "🔬" },
    { id: "clientes",   label: "Leads",           icon: "👥" },
    { id: "usuarios",              label: "Usuários",             icon: "👤" },
    { id: "orcamentos-solicitados", label: "Orçamentos",           icon: "📋" },
    { id: "tipos-exame",           label: "Tipos de exame",       icon: "📄" },
    { id: "comercial",             label: "Análise Comercial",    icon: "📈" },
    { id: "configuracoes", label: "Configurações", icon: "⚙️" },
  ];

  return (
    <aside className="sidebar">
      <div
        className="sidebar-logo"
        onClick={() => goToAgro("/agro")}
        style={{ cursor: "pointer" }}
        title="Ir para a página inicial"
      >
        MicroBio
      </div>
      <nav className="sidebar-nav">
        {items.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${currentPage === item.id ? "active" : ""}`}
            onClick={() => navigate(item.id)}
          >
            {item.icon && <span className="sidebar-icon">{item.icon}</span>}
            {item.label}
          </button>
        ))}
      </nav>

      {/* Perfil do usuário logado na sidebar administrativa */}
      <div className="client-profile" style={{ borderTop: "1px solid var(--border)", margin: "0 12px 12px 12px", paddingTop: "16px" }}>
        <div className="client-avatar">{avatarText}</div>
        <div>
          <div className="client-profile-name">{username || "Administrador"}</div>
          <div className="client-profile-role">{roleLabel}</div>
        </div>
      </div>

      <button
        className="sidebar-logout"
        onClick={async () => {
          const token = sessionStorage.getItem("microbio_token");
          if (token) {
            try {
              await fetch("/api/auth/logout", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` }
              });
            } catch (ignored) {}
          }
          sessionStorage.removeItem("microbio_token");
          sessionStorage.removeItem("microbio_role");
          window.location.href = "/login";
        }}
      >
        Sair
      </button>
    </aside>
  );
}
