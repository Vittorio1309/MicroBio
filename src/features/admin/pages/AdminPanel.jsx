import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Usuarios from "./Usuarios";
import Clientes from "./Clientes";
import Analises from "./Analises";
import CadastrarAnalise from "./CadastrarAnalise";
import OrcamentosSolicitados from "./OrcamentosSolicitados";
import TiposExame from "./TiposExame";
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
          {page === "configuracoes"    && <Placeholder title="Configurações" />}
        </main>
      </div>
    </div>
  );
}

function Sidebar({ currentPage, navigate }) {
  const goToAgro = useNavigate();

  const items = [
    { id: "dashboard",  label: "Dashboard",      icon: "⊞" },
    { id: "analises",   label: "Análises",        icon: "🔬" },
    { id: "clientes",   label: "Leads",           icon: "👥" },
    { id: "usuarios",              label: "Usuários",             icon: "👤" },
    { id: "orcamentos-solicitados", label: "Orçamentos",           icon: "📋" },
    { id: "tipos-exame",           label: "Tipos de exame",       icon: "📄" },
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
      <button
        className="sidebar-logout"
        onClick={() => {
          localStorage.removeItem("microbio_token");
          localStorage.removeItem("microbio_role");
          window.location.href = "/login";
        }}
      >
        Sair
      </button>
    </aside>
  );
}

function Placeholder({ title }) {
  return (
    <section>
      <h1 className="page-title">{title}</h1>
      <div className="form-card">
        <p>Essa tela ainda não foi implementada.</p>
      </div>
    </section>
  );
}
