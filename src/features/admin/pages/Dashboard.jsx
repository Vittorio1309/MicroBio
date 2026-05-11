import "../styles/Dashboard.css";

const recentResults = [
  { cliente: "João Silva",  tipo: "Água",      data: "21/04/2025", status: "Pendente" },
  { cliente: "Ana Souza",   tipo: "Solo",       data: "23/01/2024", status: "Concluido" },
  { cliente: "Maria Eduardo", tipo: "Alimentos", data: "28/03/2026", status: "Em atraso" },
];

const statusClass = { "Pendente": "status-pendente", "Concluido": "status-concluido", "Em atraso": "status-atraso" };

export default function Dashboard({ navigate }) {
  return (
    <div className="dashboard">
      <h1 className="page-title">Painel Administrativo</h1>

      <div className="dash-stats">
        <div className="stat-card stat-blue">
          <div className="stat-label">Novas Análises</div>
          <div className="stat-value blue">125</div>
          <div className="stat-icon">🔬</div>
        </div>
        <div className="stat-card stat-red">
          <div className="stat-label">Pendentes</div>
          <div className="stat-value red">12</div>
          <div className="stat-icon">⏳</div>
        </div>
        <div className="stat-card stat-green">
          <div className="stat-label">Concluído</div>
          <div className="stat-value green">113</div>
          <div className="stat-icon">✅</div>
        </div>
      </div>

      <div className="dash-body">
        <div className="dash-results">
          <h2 className="dash-section-title">Últimos Resultados</h2>
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
              {recentResults.map((r, i) => (
                <tr key={i}>
                  <td>{r.cliente}</td>
                  <td className="text-muted">{r.tipo}</td>
                  <td className="text-muted">{r.data}</td>
                  <td><span className={`status-badge ${statusClass[r.status]}`}>{r.status}</span></td>
                  <td>
                    <button
                      className="btn-primary btn-sm"
                      onClick={() => navigate("analises")}
                    >Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dash-shortcuts">
          <h2 className="dash-section-title">Atalhos Rápidos</h2>
          <div className="shortcuts-list">
            <button className="shortcut-btn" onClick={() => navigate("cadastrar-analise")}>
              <span>📋</span> Nova Análise
            </button>
            <button className="shortcut-btn" onClick={() => navigate("clientes")}>
              <span>👤</span> Novo Cliente
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
