import { useState, useEffect } from "react";

const STATUS_LABEL = {
  PENDENTE:     "Pendente",
  EM_ANDAMENTO: "Em andamento",
  VISUALIZADO:  "Visualizado",
  FINALIZADO:   "Concluído",
};

function getAuthHeader() {
  const token = localStorage.getItem("microbio_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("pt-BR");
}

function isExternalUrl(url) {
  return url && (url.startsWith("http://") || url.startsWith("https://"));
}

async function downloadBlob(id, filename) {
  const r = await fetch(`/api/resultados/${id}/download`, { headers: getAuthHeader() });
  if (!r.ok) throw new Error(`Erro ${r.status} ao baixar arquivo`);
  const blob = await r.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "resultado.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function ClienteDashboard() {
  const [analises, setAnalises] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");
  const [detalhe,  setDetalhe]  = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");

  useEffect(() => {
    fetch("/api/resultados/meus", { headers: getAuthHeader() })
      .then((r) => {
        if (!r.ok) throw new Error(`Erro ${r.status} ao carregar análises`);
        return r.json();
      })
      .then((data) => {
        setAnalises(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Erro ao carregar análises.");
        setLoading(false);
      });
  }, []);

  const openDetalhe = (a) => {
    setDetalhe(a);
    setDownloadError("");
    if (a.status === "PENDENTE" || a.status === "EM_ANDAMENTO") {
      fetch(`/api/resultados/${a.id}/visualizar`, { method: "PATCH", headers: getAuthHeader() })
        .then((r) => {
          if (r.ok) {
            setAnalises((prev) =>
              prev.map((item) =>
                item.id === a.id ? { ...item, status: "VISUALIZADO" } : item
              )
            );
            setDetalhe((prev) => prev && prev.id === a.id ? { ...prev, status: "VISUALIZADO" } : prev);
          }
        })
        .catch(() => {});
    }
  };

  const closeDetalhe = () => {
    setDetalhe(null);
    setDownloadError("");
  };

  const handleDownload = async (a) => {
    setDownloading(true);
    setDownloadError("");
    try {
      if (isExternalUrl(a.arquivoUrl)) {
        window.open(a.arquivoUrl, "_blank", "noopener,noreferrer");
      } else {
        await downloadBlob(a.id, `resultado-${a.id}.pdf`);
      }
    } catch (err) {
      setDownloadError(err.message || "Erro ao baixar arquivo.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary, #1a1a1a)" }}>
          Minhas Análises
        </h1>
        <button
          style={{
            background: "none",
            border: "1px solid #ccc",
            borderRadius: "6px",
            padding: "6px 14px",
            cursor: "pointer",
            fontSize: "0.85rem",
          }}
          onClick={() => {
            localStorage.removeItem("microbio_token");
            localStorage.removeItem("microbio_role");
            window.location.href = "/login";
          }}
        >
          Sair
        </button>
      </div>

      {error && (
        <p style={{ color: "#c0392b", marginBottom: "16px", fontSize: "0.9rem" }}>{error}</p>
      )}

      {loading ? (
        <p style={{ color: "#888" }}>Carregando suas análises...</p>
      ) : analises.length === 0 ? (
        <div
          style={{
            background: "#f9f9f9",
            borderRadius: "8px",
            padding: "40px",
            textAlign: "center",
            color: "#888",
          }}
        >
          <p>Nenhuma análise disponível no momento.</p>
          <p style={{ fontSize: "0.85rem", marginTop: "8px" }}>
            Quando a equipe MicroBio cadastrar um resultado, ele aparecerá aqui.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {analises.map((a) => (
            <div
              key={a.id}
              style={{
                background: "#fff",
                border: "1px solid #e5e5e5",
                borderRadius: "8px",
                padding: "16px 20px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 600, margin: 0, color: "#1a1a1a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {a.descricao}
                  </h3>
                  <span
                    style={{
                      flexShrink: 0,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      padding: "2px 9px",
                      borderRadius: "12px",
                      background: a.status === "FINALIZADO" ? "#d4edda" : "#fff3cd",
                      color: a.status === "FINALIZADO" ? "#155724" : "#856404",
                    }}
                  >
                    {STATUS_LABEL[a.status] ?? a.status}
                  </span>
                </div>
                <p style={{ fontSize: "0.8rem", color: "#888", margin: 0 }}>
                  Emitido em: {formatDate(a.dataEmissao)}
                </p>
              </div>
              <button
                onClick={() => openDetalhe(a)}
                style={{
                  flexShrink: 0,
                  padding: "7px 16px",
                  background: "#2d6a4f",
                  color: "#fff",
                  border: "none",
                  borderRadius: "7px",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "0.83rem",
                }}
              >
                Ver Detalhes
              </button>
            </div>
          ))}
        </div>
      )}

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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1a5c35", margin: 0 }}>
                Detalhes da Análise
              </h2>
              <button
                onClick={closeDetalhe}
                style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#888", lineHeight: 1 }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <p style={{ fontSize: "0.75rem", color: "#888", margin: "0 0 3px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Descrição</p>
                <p style={{ margin: 0, fontSize: "0.95rem", color: "#1a1a1a" }}>{detalhe.descricao}</p>
              </div>

              <div style={{ display: "flex", gap: "24px" }}>
                <div>
                  <p style={{ fontSize: "0.75rem", color: "#888", margin: "0 0 3px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Status</p>
                  <span
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      padding: "3px 10px",
                      borderRadius: "12px",
                      background: detalhe.status === "FINALIZADO" ? "#d4edda" : "#fff3cd",
                      color: detalhe.status === "FINALIZADO" ? "#155724" : "#856404",
                    }}
                  >
                    {STATUS_LABEL[detalhe.status] ?? detalhe.status}
                  </span>
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", color: "#888", margin: "0 0 3px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Data</p>
                  <p style={{ margin: 0, fontSize: "0.88rem", color: "#555" }}>{formatDate(detalhe.dataEmissao)}</p>
                </div>
              </div>

              {detalhe.laudo && (
                <div>
                  <p style={{ fontSize: "0.75rem", color: "#888", margin: "0 0 6px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Laudo</p>
                  <div
                    style={{
                      background: "#f5f5f5",
                      borderRadius: "6px",
                      padding: "12px 14px",
                    }}
                  >
                    <p style={{ fontSize: "0.87rem", color: "#444", margin: 0, whiteSpace: "pre-wrap" }}>
                      {detalhe.laudo}
                    </p>
                  </div>
                </div>
              )}

              {detalhe.arquivoUrl && (
                <div>
                  <p style={{ fontSize: "0.75rem", color: "#888", margin: "0 0 8px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Arquivo</p>
                  {downloadError && (
                    <p style={{ color: "#c0392b", fontSize: "0.82rem", marginBottom: "6px" }}>{downloadError}</p>
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
              )}

              {!detalhe.arquivoUrl && (
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
