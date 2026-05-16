import { useState, useEffect } from "react";
import "../styles/Dashboard.css";

const STATUS_CLASS = {
  PENDENTE: "status-pendente",
  FINALIZADO: "status-concluido",
  ACEITO: "status-concluido",
  REJEITADO: "status-atraso",
};

function getAuthHeader() {
  const token = localStorage.getItem("microbio_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR");
}

export default function Dashboard({ navigate }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/dashboard/stats", {
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    })
      .then((r) => {
        if (!r.ok) throw new Error(`Erro ${r.status} ao carregar estatísticas`);
        return r.json();
      })
      .then((data) => {
        setStats(data);
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
          <div className="stat-label">Novas Análises</div>
          <div className="stat-value blue">
            {loading ? "..." : stats?.totalOrcamentos ?? 0}
          </div>
          <div className="stat-icon">🔬</div>
        </div>
        <div className="stat-card stat-red">
          <div className="stat-label">Pendentes</div>
          <div className="stat-value red">
            {loading ? "..." : stats?.totalPendente ?? 0}
          </div>
          <div className="stat-icon">⏳</div>
        </div>
        <div className="stat-card stat-green">
          <div className="stat-label">Concluído</div>
          <div className="stat-value green">
            {loading ? "..." : stats?.totalFinalizado ?? 0}
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
                  <th>Cliente</th>
                  <th>Tipo de Análises</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {(stats?.resultadosRecentes ?? []).length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", color: "#888" }}>
                      Nenhum resultado encontrado.
                    </td>
                  </tr>
                ) : (
                  (stats?.resultadosRecentes ?? []).map((r) => (
                    <tr key={r.orcamentoId}>
                      <td>{r.nomeCliente}</td>
                      <td className="text-muted">{r.nomeServico}</td>
                      <td className="text-muted">{formatDate(r.dataCriacao)}</td>
                      <td>
                        <span
                          className={`status-badge ${STATUS_CLASS[r.statusOrcamento] || "status-pendente"}`}
                        >
                          {r.statusOrcamento}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn-primary btn-sm"
                          onClick={() => navigate("analises")}
                        >
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
            <button className="shortcut-btn" onClick={() => navigate("arquivos")}>
              <span>📁</span> Arquivos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
