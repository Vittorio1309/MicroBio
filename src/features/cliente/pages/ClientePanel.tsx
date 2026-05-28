import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  LogOut,
  Search,
  SquareChartGantt,
  CircleDot,
  LayoutDashboard,
  FileSearch,
  ArrowRight,
} from "lucide-react";
import "../styles/ClientePanel.css";

type ResultRow = {
  id: string;
  analysis: string;
  date: string;
  status: "Concluído" | "Em Processamento";
  report: boolean;
};

const initialRows: ResultRow[] = [
  { id: "#MB-9821", analysis: "Solo Completa", date: "24 Mai 2025", status: "Concluído", report: true },
  { id: "#MB-9844", analysis: "Foliar Soja", date: "26 Mai 2025", status: "Em Processamento", report: false },
  { id: "#MB-9812", analysis: "Nematóides", date: "22 Mai 2025", status: "Concluído", report: true },
  { id: "#MB-9850", analysis: "Solo Completa", date: "18 Mai 2025", status: "Concluído", report: true },
  { id: "#MB-9855", analysis: "Foliar Milho", date: "16 Mai 2025", status: "Em Processamento", report: false },
  { id: "#MB-9863", analysis: "Solo Completa", date: "13 Mai 2025", status: "Concluído", report: true },
];

const recentRows = initialRows.slice(0, 3);

function ClientSidebar({ currentPage, setCurrentPage }: { currentPage: "painel" | "relatorios"; setCurrentPage: (page: "painel" | "relatorios") => void }) {
  const logout = () => {
    localStorage.removeItem("microbio_token");
    localStorage.removeItem("microbio_role");
    window.location.href = "/login";
  };

  const items = [
    { id: "painel" as const, label: "Painel de Resultados", icon: LayoutDashboard },
    { id: "relatorios" as const, label: "Relatórios", icon: FileText },
  ];

  return (
    <aside className="client-sidebar">
      <div className="client-brand">MicroBio</div>

      <nav className="client-nav">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`client-nav-item ${currentPage === item.id ? "active" : ""}`}
              onClick={() => setCurrentPage(item.id)}
              type="button"
            >
              <Icon size={16} strokeWidth={2} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="client-profile">
        <div className="client-avatar">SF</div>
        <div>
          <div className="client-profile-name">Fazenda Santa Fé</div>
          <div className="client-profile-role">Membro · MicroBio</div>
        </div>
      </div>

      <button className="client-logout" onClick={logout} type="button">
        <LogOut size={16} /> Sair
      </button>
    </aside>
  );
}

function StatCard({ label, value, tone }: { label: string; value: string; tone: "green" | "wine" }) {
  return (
    <div className={`client-stat ${tone}`}>
      <span className="client-stat-label">{label}</span>
      <strong className="client-stat-value">{value}</strong>
    </div>
  );
}

export default function ClientePanel() {
  const [currentPage, setCurrentPage] = useState<"painel" | "relatorios">("painel");
  const [search, setSearch] = useState("");
  const rows = useMemo(
    () =>
      initialRows.filter(
        (row) =>
          row.id.toLowerCase().includes(search.toLowerCase()) ||
          row.analysis.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const totalAnalises = initialRows.length;
  const concluido = initialRows.filter((row) => row.status === "Concluído").length;
  const andamento = initialRows.filter((row) => row.status === "Em Processamento").length;

  return (
    <div className="client-shell">
      <ClientSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="client-main">
        <header className="client-hero">
          <div>
            <h1>Olá, Fazenda Santa Fé</h1>
            <p>{currentPage === "painel" ? "Aqui está o panorama geral das suas amostras laboratoriais." : "Seus arquivos de consultas estão aqui."}</p>
          </div>
        </header>

        {currentPage === "painel" ? (
          <>
            <section className="client-stats-grid">
              <StatCard label="Total Análises" value={String(totalAnalises)} tone="green" />
              <StatCard label="Em Andamento" value={String(andamento)} tone="wine" />
              <StatCard label="Concluído" value={String(concluido)} tone="green" />
            </section>

            <section className="client-card">
              <div className="client-card-head">
                <h2>Resultados Recentes</h2>
              </div>

              <div className="client-table-wrap">
                <table className="client-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tipo de Análise</th>
                      <th>Data</th>
                      <th>Status</th>
                      <th>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRows.map((row) => (
                      <tr key={row.id}>
                        <td className="cell-id">{row.id}</td>
                        <td>
                          <span className="analysis-dot">
                            <CircleDot size={14} />
                            {row.analysis}
                          </span>
                        </td>
                        <td>{row.date}</td>
                        <td>
                          <span className={`status-pill ${row.status === "Concluído" ? "ok" : "pending"}`}>
                            {row.status === "Concluído" ? <CheckCircle2 size={13} /> : <SquareChartGantt size={13} />}
                            {row.status}
                          </span>
                        </td>
                        <td>
                          <button className="link-action" type="button">
                            {row.report ? "Ver Relatório" : "Detalhes"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button className="client-report-link" type="button" onClick={() => setCurrentPage("relatorios")}>
                <span>Ir para a página de relatórios</span>
                <ArrowRight size={16} />
              </button>
            </section>
          </>
        ) : (
          <>
            <section className="client-doc-card">
              <div className="client-doc-head">
                <h2>Selecione o seu arquivo</h2>
                <label className="client-search">
                  <Search size={14} />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar amostra..."
                  />
                </label>
              </div>

              <div className="client-table-wrap">
                <table className="client-table report-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tipo de Análise</th>
                      <th>Data</th>
                      <th>Status</th>
                      <th>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.id}>
                        <td className="cell-id">{row.id}</td>
                        <td>
                          <span className="analysis-dot">
                            <CircleDot size={14} />
                            {row.analysis}
                          </span>
                        </td>
                        <td>{row.date}</td>
                        <td>
                          <span className={`status-pill ${row.status === "Concluído" ? "ok" : "pending"}`}>
                            {row.status === "Concluído" ? <CheckCircle2 size={13} /> : <SquareChartGantt size={13} />}
                            {row.status}
                          </span>
                        </td>
                        <td>
                          <button className={`link-action ${row.report ? "primary" : "muted"}`} type="button">
                            {row.report ? "Ver Relatório" : "Detalhes"}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {rows.length === 0 && (
                      <tr>
                        <td colSpan={5} className="empty-row">
                          Nenhuma amostra encontrada.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="pagination">
                <div className="pagination-label">1 - Página</div>
                <div className="pagination-controls">
                  <button type="button" aria-label="Página anterior"><ChevronLeft size={16} /></button>
                  <button type="button" aria-label="Próxima página"><ChevronRight size={16} /></button>
                </div>
              </div>
            </section>
          </>
        )}

        <footer className="client-footer">
          <strong>MicroBio</strong>
          <a href="mailto:contato@microbio.com.br">Contato</a>
        </footer>
      </main>
    </div>
  );
}
