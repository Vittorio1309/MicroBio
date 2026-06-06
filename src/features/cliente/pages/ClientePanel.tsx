import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
  ArrowRight,
} from "lucide-react";
import "../styles/ClientePanel.css";

type StatusKey = "PENDENTE" | "EM_ANDAMENTO" | "VISUALIZADO" | "FINALIZADO";

type Analise = {
  id: number;
  descricao: string;
  dataEmissao: string;
  laudo: string | null;
  arquivoUrl: string | null;
  usuarioId: number;
  username: string;
  status: StatusKey;
};

const STATUS_LABEL: Record<StatusKey, string> = {
  PENDENTE: "Pendente",
  EM_ANDAMENTO: "Em Andamento",
  VISUALIZADO: "Visualizado",
  FINALIZADO: "Concluído",
};

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem("microbio_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("pt-BR");
}

function isExternalUrl(url: string | null): boolean {
  return !!(url && (url.startsWith("http://") || url.startsWith("https://")));
}

async function downloadBlob(id: number, filename: string): Promise<void> {
  const r = await fetch(`/api/resultados/${id}/download`, { headers: getAuthHeader() });
  if (!r.ok) throw new Error(`Erro ${r.status} ao baixar arquivo`);
  const blob = await r.blob();
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(blobUrl);
}

function getUsernameFromToken(): string {
  const token = localStorage.getItem("microbio_token");
  if (!token) return "";
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.sub || "";
  } catch {
    return "";
  }
}

function StatusPill({ status }: { status: StatusKey }) {
  const isOk = status === "FINALIZADO";
  return (
    <span className={`status-pill ${isOk ? "ok" : "pending"}`}>
      {isOk ? <CheckCircle2 size={13} /> : <SquareChartGantt size={13} />}
      {STATUS_LABEL[status]}
    </span>
  );
}

function AnaliseRow({
  analise,
  onOpen,
}: {
  analise: Analise;
  onOpen: (a: Analise) => void;
}) {
  return (
    <tr>
      <td className="cell-id">#{analise.id}</td>
      <td>
        <span className="analysis-dot">
          <CircleDot size={14} />
          {analise.descricao}
        </span>
      </td>
      <td>{formatDate(analise.dataEmissao)}</td>
      <td>
        <StatusPill status={analise.status} />
      </td>
      <td>
        <button
          className={`link-action ${analise.arquivoUrl ? "primary" : ""}`}
          type="button"
          onClick={() => onOpen(analise)}
        >
          {analise.arquivoUrl ? "Ver Relatório" : "Detalhes"}
        </button>
      </td>
    </tr>
  );
}

function ClientSidebar({
  currentPage,
  setCurrentPage,
  username,
}: {
  currentPage: "painel" | "relatorios";
  setCurrentPage: (page: "painel" | "relatorios") => void;
  username: string;
}) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("microbio_token");
    localStorage.removeItem("microbio_role");
    window.location.href = "/login";
  };

  const items = [
    { id: "painel" as const, label: "Painel de Resultados", icon: LayoutDashboard },
    { id: "relatorios" as const, label: "Relatórios", icon: FileText },
  ];

  const avatarText = (username || "U").substring(0, 2).toUpperCase();

  return (
    <aside className="client-sidebar">
      <div
        className="client-brand"
        onClick={() => navigate("/agro")}
        style={{ cursor: "pointer" }}
        title="Ir para a página inicial"
      >
        MicroBio
      </div>

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
        <div className="client-avatar">{avatarText}</div>
        <div>
          <div className="client-profile-name">{username || "Usuário"}</div>
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
  const [analises, setAnalises] = useState<Analise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [detalhe, setDetalhe] = useState<Analise | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");

  const username = getUsernameFromToken();

  useEffect(() => {
    fetch("/api/resultados/meus", { headers: getAuthHeader() })
      .then((r) => {
        if (!r.ok) throw new Error(`Erro ${r.status} ao carregar análises`);
        return r.json();
      })
      .then((data: Analise[]) => {
        setAnalises(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message || "Erro ao carregar análises.");
        setLoading(false);
      });
  }, []);

  const sortedAnalises = useMemo(
    () => [...analises].sort((a, b) => b.id - a.id),
    [analises]
  );

  const recentRows = sortedAnalises.slice(0, 3);

  const filteredRows = useMemo(
    () =>
      sortedAnalises.filter(
        (a) =>
          String(a.id).includes(search.toLowerCase()) ||
          a.descricao.toLowerCase().includes(search.toLowerCase())
      ),
    [sortedAnalises, search]
  );

  const totalAnalises = analises.length;
  const emAndamento = analises.filter(
    (a) => a.status === "PENDENTE" || a.status === "EM_ANDAMENTO"
  ).length;
  const concluido = analises.filter((a) => a.status === "FINALIZADO").length;

  const openDetalhe = (a: Analise) => {
    setDetalhe(a);
    setDownloadError("");
    if (a.status === "PENDENTE" || a.status === "EM_ANDAMENTO") {
      fetch(`/api/resultados/${a.id}/visualizar`, {
        method: "PATCH",
        headers: getAuthHeader(),
      })
        .then((r) => {
          if (r.ok) {
            setAnalises((prev) =>
              prev.map((item) =>
                item.id === a.id ? { ...item, status: "VISUALIZADO" as const } : item
              )
            );
            setDetalhe((prev) =>
              prev && prev.id === a.id ? { ...prev, status: "VISUALIZADO" as const } : prev
            );
          }
        })
        .catch(() => {});
    }
  };

  const closeDetalhe = () => {
    setDetalhe(null);
    setDownloadError("");
  };

  const handleDownload = async (a: Analise) => {
    setDownloading(true);
    setDownloadError("");
    try {
      if (isExternalUrl(a.arquivoUrl)) {
        window.open(a.arquivoUrl!, "_blank", "noopener,noreferrer");
      } else {
        await downloadBlob(a.id, `resultado-${a.id}.pdf`);
      }
    } catch (err: unknown) {
      setDownloadError(err instanceof Error ? err.message : "Erro ao baixar arquivo.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="client-shell">
      <ClientSidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        username={username}
      />

      <main className="client-main">
        <header className="client-hero">
          <div>
            <h1>Olá, {username || "Cliente"}</h1>
            <p>
              {currentPage === "painel"
                ? "Aqui está o panorama geral das suas amostras laboratoriais."
                : "Seus arquivos de consultas estão aqui."}
            </p>
          </div>
        </header>

        {error && (
          <p style={{ color: "#c0392b", marginBottom: "16px", fontSize: "0.9rem" }}>{error}</p>
        )}

        {currentPage === "painel" ? (
          <>
            <section className="client-stats-grid">
              <StatCard label="Total Análises" value={loading ? "…" : String(totalAnalises)} tone="green" />
              <StatCard label="Em Andamento" value={loading ? "…" : String(emAndamento)} tone="wine" />
              <StatCard label="Concluído" value={loading ? "…" : String(concluido)} tone="green" />
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
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="empty-row">Carregando...</td>
                      </tr>
                    ) : recentRows.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="empty-row">
                          Nenhuma análise disponível no momento.
                        </td>
                      </tr>
                    ) : (
                      recentRows.map((a) => (
                        <AnaliseRow key={a.id} analise={a} onOpen={openDetalhe} />
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <button
                className="client-report-link"
                type="button"
                onClick={() => setCurrentPage("relatorios")}
              >
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
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="empty-row">Carregando...</td>
                      </tr>
                    ) : filteredRows.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="empty-row">
                          Nenhuma amostra encontrada.
                        </td>
                      </tr>
                    ) : (
                      filteredRows.map((a) => (
                        <AnaliseRow key={a.id} analise={a} onOpen={openDetalhe} />
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="pagination">
                <div className="pagination-label">
                  {filteredRows.length} resultado{filteredRows.length !== 1 ? "s" : ""}
                </div>
                <div className="pagination-controls">
                  <button type="button" aria-label="Página anterior">
                    <ChevronLeft size={16} />
                  </button>
                  <button type="button" aria-label="Próxima página">
                    <ChevronRight size={16} />
                  </button>
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

      {detalhe && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.38)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
            backdropFilter: "blur(3px)",
            padding: "16px",
          }}
          onClick={closeDetalhe}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "36px 40px",
              width: "100%",
              maxWidth: "540px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1a5c35", margin: 0 }}>
                Detalhes da Análise
              </h2>
              <button
                onClick={closeDetalhe}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  color: "#888",
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#888",
                    margin: "0 0 3px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  Descrição
                </p>
                <p style={{ margin: 0, fontSize: "0.95rem", color: "#1a1a1a" }}>
                  {detalhe.descricao}
                </p>
              </div>

              <div style={{ display: "flex", gap: "24px" }}>
                <div>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "#888",
                      margin: "0 0 3px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Status
                  </p>
                  <StatusPill status={detalhe.status} />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "#888",
                      margin: "0 0 3px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Data
                  </p>
                  <p style={{ margin: 0, fontSize: "0.88rem", color: "#555" }}>
                    {formatDate(detalhe.dataEmissao)}
                  </p>
                </div>
              </div>

              {detalhe.laudo && (
                <div>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "#888",
                      margin: "0 0 6px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Laudo
                  </p>
                  <div
                    style={{ background: "#f5f5f5", borderRadius: "6px", padding: "12px 14px" }}
                  >
                    <p
                      style={{
                        fontSize: "0.87rem",
                        color: "#444",
                        margin: 0,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {detalhe.laudo}
                    </p>
                  </div>
                </div>
              )}

              {detalhe.arquivoUrl ? (
                <div>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "#888",
                      margin: "0 0 8px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Arquivo
                  </p>
                  {downloadError && (
                    <p style={{ color: "#c0392b", fontSize: "0.82rem", marginBottom: "6px" }}>
                      {downloadError}
                    </p>
                  )}
                  <button
                    onClick={() => handleDownload(detalhe)}
                    disabled={downloading}
                    style={{
                      padding: "9px 20px",
                      background: downloading ? "#888" : "#2d6a4f",
                      color: "#fff",
                      border: "none",
                      borderRadius: "7px",
                      cursor: downloading ? "not-allowed" : "pointer",
                      fontWeight: 600,
                      fontSize: "0.88rem",
                    }}
                  >
                    {downloading ? "Baixando..." : "Baixar Exame"}
                  </button>
                </div>
              ) : (
                <p style={{ fontSize: "0.85rem", color: "#aaa", fontStyle: "italic" }}>
                  Nenhum arquivo disponível ainda.
                </p>
              )}
            </div>

            <div style={{ marginTop: "28px", display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={closeDetalhe}
                style={{
                  padding: "9px 22px",
                  background: "none",
                  border: "1.5px solid #ccc",
                  borderRadius: "7px",
                  cursor: "pointer",
                  fontSize: "0.88rem",
                  color: "#555",
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
