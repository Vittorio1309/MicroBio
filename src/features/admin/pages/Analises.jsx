import { useState, useEffect } from "react";
import "../styles/Analises.css";

const STATUS_LABEL = {
  PENDENTE:     "Pendente",
  EM_ANDAMENTO: "Em andamento",
  VISUALIZADO:  "Visualizado",
  FINALIZADO:   "Concluído",
};

const STATUS_CLASS = {
  PENDENTE:     "status-pendente",
  EM_ANDAMENTO: "status-pendente",
  VISUALIZADO:  "status-visualizado",
  FINALIZADO:   "status-concluido",
};

function getAuthHeader() {
  const token = sessionStorage.getItem("microbio_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function fetchJson(url, options) {
  const r = await fetch(url, options);
  if (!r.ok) {
    const body = await r.json().catch(() => ({}));
    throw new Error(body.message || `Erro ${r.status}`);
  }
  return r.status === 204 ? null : r.json();
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
  const [analises,      setAnalises]      = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [search,        setSearch]        = useState("");
  const [filterUsuario, setFilterUsuario] = useState("Todos");
  const [filterStatus,  setFilterStatus]  = useState("Todos");
  const [filterDate,    setFilterDate]    = useState("todos");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [deleteError,   setDeleteError]   = useState("");

  useEffect(() => {
    fetch("/api/resultados", { headers: getAuthHeader() })
      .then((r) => r.json())
      .then((data) => {
        setAnalises(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    setDeleteError("");
    try {
      await fetchJson(`/api/resultados/${id}`, { method: "DELETE", headers: getAuthHeader() });
      setAnalises((prev) => prev.filter((a) => a.id !== id));
      setConfirmDeleteId(null);
    } catch (err) {
      setDeleteError(err.message || "Erro ao deletar análise.");
    }
  };

  const usuarios = ["Todos", ...new Set(analises.map((a) => a.username))];
  const statuses  = ["Todos", "PENDENTE", "EM_ANDAMENTO", "VISUALIZADO", "FINALIZADO"];

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

      {deleteError && (
        <p style={{ color: "#c0392b", marginBottom: "12px", fontSize: "0.88rem" }}>{deleteError}</p>
      )}

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
                    {confirmDeleteId === a.id ? (
                      <span style={{ display: "inline-flex", gap: "8px", alignItems: "center", fontSize: "0.83rem" }}>
                        <span style={{ color: "#6b7280" }}>Tem certeza? Esta análise será removida para o usuário também.</span>
                        <button
                          style={{ background: "#dc2626", color: "#fff", border: "none", borderRadius: "6px", padding: "5px 12px", cursor: "pointer", fontWeight: 600, fontSize: "0.8rem" }}
                          onClick={() => handleDelete(a.id)}
                        >
                          Sim, deletar
                        </button>
                        <button
                          className="btn-secondary"
                          style={{ padding: "5px 10px", fontSize: "0.8rem" }}
                          onClick={() => { setConfirmDeleteId(null); setDeleteError(""); }}
                        >
                          Cancelar
                        </button>
                      </span>
                    ) : (
                      <button
                        style={{ background: "none", color: "#dc2626", border: "1px solid #dc2626", borderRadius: "6px", padding: "5px 12px", cursor: "pointer", fontWeight: 600, fontSize: "0.8rem" }}
                        onClick={() => { setConfirmDeleteId(a.id); setDeleteError(""); }}
                      >
                        Deletar
                      </button>
                    )}
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
