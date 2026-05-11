import { useState } from "react";
import "../styles/Analises.css";

const allAnalises = [
  { id: 1, cliente: "João Silva",    tipo: "Água",      data: "21/04/2025", status: "Pendente" },
  { id: 2, cliente: "Ana Souza",     tipo: "Solo",       data: "23/01/2024", status: "Concluido" },
  { id: 3, cliente: "Maria Eduardo", tipo: "Alimentos",  data: "28/03/2026", status: "Em atraso" },
  { id: 4, cliente: "Carlos Lima",   tipo: "Água",       data: "10/02/2026", status: "Concluido" },
  { id: 5, cliente: "Fernanda Melo", tipo: "Solo",       data: "05/05/2025", status: "Pendente" },
];

const statusClass = { "Pendente": "status-pendente", "Concluido": "status-concluido", "Em atraso": "status-atraso" };

export default function Analises({ navigate }) {
  const [filterCliente, setFilterCliente] = useState("Todos");
  const [filterTipo, setFilterTipo]       = useState("Todos");
  const [filterStatus, setFilterStatus]   = useState("Todos");

  const filtered = allAnalises.filter((a) => {
    if (filterCliente !== "Todos" && a.cliente !== filterCliente) return false;
    if (filterTipo    !== "Todos" && a.tipo    !== filterTipo)    return false;
    if (filterStatus  !== "Todos" && a.status  !== filterStatus)  return false;
    return true;
  });

  const clientes = ["Todos", ...new Set(allAnalises.map((a) => a.cliente))];
  const tipos    = ["Todos", ...new Set(allAnalises.map((a) => a.tipo))];
  const statuses = ["Todos", "Pendente", "Concluido", "Em atraso"];

  return (
    <div className="analises-page">
      <div className="page-header-row">
        <h1 className="page-title" style={{marginBottom:0,borderBottom:'none',paddingBottom:0}}>Lista de Análises</h1>
        <button className="btn-primary" onClick={() => navigate("cadastrar-analise")}>+ Nova Análise</button>
      </div>

      <div className="analises-divider" />

      <div className="analises-filters">
        <select
          className="filter-select"
          value={filterCliente}
          onChange={(e) => setFilterCliente(e.target.value)}
        >
          {clientes.map((c) => (
            <option key={c}>{c === "Todos" ? "Todos os Clientes" : c}</option>
          ))}
        </select>

        <select
          className="filter-select"
          value={filterTipo}
          onChange={(e) => setFilterTipo(e.target.value)}
        >
          {tipos.map((t) => (
            <option key={t}>{t === "Todos" ? "Todos os Tipos" : t}</option>
          ))}
        </select>

        <select
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          {statuses.map((s) => (
            <option key={s}>{s === "Todos" ? "Status: Todos" : s}</option>
          ))}
        </select>

        <select className="filter-select">
          <option>Data: Todos</option>
          <option>Hoje</option>
          <option>Esta semana</option>
          <option>Este mês</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="analises-empty">
          <p>Nenhuma análise encontrada.</p>
        </div>
      ) : (
        <div className="analises-table-wrap">
          <table className="analises-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Tipo</th>
                <th>Data</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id}>
                  <td className="text-muted">{a.id}</td>
                  <td>{a.cliente}</td>
                  <td className="text-muted">{a.tipo}</td>
                  <td className="text-muted">{a.data}</td>
                  <td>
                    <span className={`status-badge ${statusClass[a.status]}`}>{a.status}</span>
                  </td>
                  <td>
                    <button className="btn-primary btn-sm">Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
