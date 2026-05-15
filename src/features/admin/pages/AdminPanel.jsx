import { useState } from "react";
import Dashboard from "./Dashboard";
import Clientes from "./Clientes";
import Analises from "./Analises";
import CadastrarAnalise from "./CadastrarAnalise";
import "../styles/admin.css";

export default function AdminPanel() {
  const [page, setPage] = useState("dashboard");

  const navigate = (p) => setPage(p);

  return (
    <div className="admin-scope">
      <div className="app-layout">
        <Sidebar currentPage={page} navigate={navigate} />
        <main className="app-main">
          {page === "dashboard" && <Dashboard navigate={navigate} />}
          {page === "clientes" && <Clientes />}
          {page === "analises" && <Analises navigate={navigate} />}
          {page === "cadastrar-analise" && <CadastrarAnalise navigate={navigate} />}
          {page === "arquivos" && <Placeholder title="Arquivos" />}
          {page === "tipos-exame" && <Placeholder title="Tipos de exame" />}
          {page === "configuracoes" && <Placeholder title="Configurações" />}
        </main>
      </div>
    </div>
  );
}

function Sidebar({ currentPage, navigate }) {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: "⊞" },
    { id: "clientes", label: "Clientes", icon: null },
    { id: "analises", label: "Análises", icon: "📄" },
    { id: "arquivos", label: "Arquivos", icon: "📄" },
    { id: "tipos-exame", label: "Tipos de exame", icon: "📄" },
    { id: "configuracoes", label: "Configurações", icon: "📄" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">MicroBio</div>
      <nav className="sidebar-nav">
        {items.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${currentPage === item.id ? "active" : ""} ${!item.icon ? "sub-item" : ""}`}
            onClick={() => navigate(item.id)}
          >
            {item.icon && <span className="sidebar-icon">{item.icon}</span>}
            {item.label}
          </button>
        ))}
      </nav>
      <button className="sidebar-logout" onClick={() => {
        localStorage.removeItem("microbio_token");
        localStorage.removeItem("microbio_role");
        window.location.href = "/login";
      }}>Sair</button>
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
