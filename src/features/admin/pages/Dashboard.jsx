import { useState, useEffect } from "react";
import "../styles/Dashboard.css";

const STATUS_CLASS = {
  PENDENTE: "status-pendente",
  EM_ANDAMENTO: "status-pendente",
  VISUALIZADO: "status-visualizado",
  FINALIZADO: "status-concluido",
};

const STATUS_LABEL = {
  PENDENTE: "Pendente",
  EM_ANDAMENTO: "Em andamento",
  VISUALIZADO: "Visualizado",
  FINALIZADO: "Concluído",
};

function getAuthHeader() {
  const token = localStorage.getItem("microbio_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("pt-BR");
}

export default function Dashboard({ navigate }) {
  const [stats, setStats] = useState(null);
  const [recentes, setRecentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/dashboard/stats", {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      }).then((r) => {
        if (!r.ok) throw new Error(`Erro ${r.status} ao carregar estatísticas`);
        return r.json();
      }),
      fetch("/api/dashboard/resultados-recentes", {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      }).then((r) => {
        if (!r.ok) throw new Error(`Erro ${r.status} ao carregar resultados`);
        return r.json();
      }),
    ])
      .then(([statsData, recentesData]) => {
        setStats(statsData);
        setRecentes(recentesData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Erro ao carregar dados do dashboard.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard">
      <h1 className="page-title">Painel Administrativo</h1>

      {error && (
        <p style={{ color: "#c0392b", marginBottom: "16px", fontSize: "0.9rem" }}>
          {error}
        </p>
      )}

      <div className="dash-stats">
        <div className="stat-card stat-blue">
          <div className="stat-label">Total de Análises</div>
          <div className="stat-value blue">
            {loading ? "..." : stats?.totalAnalises ?? 0}
          </div>
          <div className="stat-icon">🔬</div>
        </div>
        <div className="stat-card stat-red">
          <div className="stat-label">Em Andamento</div>
          <div className="stat-value red">
            {loading ? "..." : stats?.totalEmAndamento ?? 0}
          </div>
          <div className="stat-icon">⏳</div>
        </div>
        <div className="stat-card stat-green">
          <div className="stat-label">Concluídas</div>
          <div className="stat-value green">
            {loading ? "..." : stats?.totalFinalizadas ?? 0}
          </div>
          <div className="stat-icon">✅</div>
        </div>
      </div>

      <div className="dash-body">
        <div className="dash-results">
          <h2 className="dash-section-title">Últimos Resultados</h2>
          {loading ? (
            <p className="text-muted">Carregando...</p>
          ) : (
            <table className="results-table">
              <thead>
                <tr>
                  <th>Usuário</th>
                  <th>Descrição</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {recentes.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", color: "#888" }}>
                      Nenhum resultado encontrado.
                    </td>
                  </tr>
                ) : (
                  recentes.map((r) => (
                    <tr key={r.id}>
                      <td>{r.nomeUsuario}</td>
                      <td className="text-muted">{r.descricao}</td>
                      <td className="text-muted">{formatDate(r.dataEmissao)}</td>
                      <td>
                        <span className={`status-badge ${STATUS_CLASS[r.status] || "status-pendente"}`}>
                          {STATUS_LABEL[r.status] ?? r.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn-primary btn-sm" onClick={() => navigate("analises")}>
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="dash-shortcuts">
          <h2 className="dash-section-title">Atalhos Rápidos</h2>
          <div className="shortcuts-list">
            <button className="shortcut-btn" onClick={() => navigate("cadastrar-analise")}>
              <span>📋</span> Nova Análise
            </button>
            <button className="shortcut-btn" onClick={() => navigate("usuarios")}>
              <span>👤</span> Novo Usuário
            </button>
            <button className="shortcut-btn" onClick={() => navigate("analises")}>
              <span>📊</span> Ver Análises
            </button>
            <button className="shortcut-btn" onClick={() => navigate("orcamentos-solicitados")}>
              <span>📋</span> Orçamentos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
