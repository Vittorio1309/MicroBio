import { useState, useEffect } from "react";
import "../styles/Analises.css";

const STATUS_LABEL = {
  EM_ANDAMENTO: "Em andamento",
  FINALIZADO:   "Concluído",
};

const STATUS_CLASS = {
  EM_ANDAMENTO: "status-pendente",
  FINALIZADO:   "status-concluido",
};

function getAuthHeader() {
  const token = localStorage.getItem("microbio_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("pt-BR");
}

function isInDateRange(rawDate, range) {
  if (range === "todos" || !rawDate) return true;
  const d = new Date(rawDate);
  const now = new Date();
  if (range === "hoje") return d.toDateString() === now.toDateString();
  if (range === "semana") {
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 7);
    return d >= weekAgo;
  }
  if (range === "mes") {
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }
  return true;
}

export default function Analises({ navigate }) {
  const [analises,     setAnalises]     = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [search,       setSearch]       = useState("");
  const [filterUsuario, setFilterUsuario] = useState("Todos");
  const [filterStatus,  setFilterStatus]  = useState("Todos");
  const [filterDate,    setFilterDate]    = useState("todos");

  useEffect(() => {
    fetch("/api/resultados", { headers: getAuthHeader() })
      .then((r) => r.json())
      .then((data) => {
        setAnalises(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const usuarios = ["Todos", ...new Set(analises.map((a) => a.username))];
  const statuses  = ["Todos", "EM_ANDAMENTO", "FINALIZADO"];

  const filtered = analises.filter((a) => {
    if (search && !a.username.toLowerCase().includes(search.toLowerCase()) &&
        !a.descricao.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterUsuario !== "Todos" && a.username !== filterUsuario) return false;
    if (filterStatus  !== "Todos" && a.status   !== filterStatus)  return false;
    if (!isInDateRange(a.dataEmissao, filterDate)) return false;
    return true;
  });

  return (
    <div className="analises-page">
      <div className="page-header-row">
        <h1 className="page-title" style={{ marginBottom: 0, borderBottom: "none", paddingBottom: 0 }}>
          Lista de Análises
        </h1>
        <button className="btn-primary" onClick={() => navigate("cadastrar-analise")}>
          + Nova Análise
        </button>
      </div>

      <div className="analises-divider" />

      <div className="analises-filters">
        <input
          type="text"
          className="filter-select"
          placeholder="Buscar por usuário ou descrição..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ minWidth: "200px" }}
        />
        <select className="filter-select" value={filterUsuario} onChange={(e) => setFilterUsuario(e.target.value)}>
          {usuarios.map((u) => (
            <option key={u} value={u}>{u === "Todos" ? "Todos os Usuários" : u}</option>
          ))}
        </select>
        <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          {statuses.map((s) => (
            <option key={s} value={s}>{s === "Todos" ? "Status: Todos" : STATUS_LABEL[s] ?? s}</option>
          ))}
        </select>
        <select className="filter-select" value={filterDate} onChange={(e) => setFilterDate(e.target.value)}>
          <option value="todos">Data: Todos</option>
          <option value="hoje">Hoje</option>
          <option value="semana">Esta semana</option>
          <option value="mes">Este mês</option>
        </select>
      </div>

      {loading ? (
        <div className="analises-empty"><p>Carregando...</p></div>
      ) : filtered.length === 0 ? (
        <div className="analises-empty"><p>Nenhuma análise encontrada.</p></div>
      ) : (
        <div className="analises-table-wrap">
          <table className="analises-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Usuário</th>
                <th>Descrição</th>
                <th>Data</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id}>
                  <td className="text-muted">{a.id}</td>
                  <td>{a.username}</td>
                  <td className="text-muted">{a.descricao}</td>
                  <td className="text-muted">{formatDate(a.dataEmissao)}</td>
                  <td>
                    <span className={`status-badge ${STATUS_CLASS[a.status] ?? "status-pendente"}`}>
                      {STATUS_LABEL[a.status] ?? a.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-primary btn-sm"
                      onClick={() => navigate("cadastrar-analise")}
                    >
                      Editar
                    </button>
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
