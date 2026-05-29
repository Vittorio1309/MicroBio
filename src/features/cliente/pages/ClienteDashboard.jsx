import { useState, useEffect } from "react";

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

export default function ClienteDashboard() {
  const [analises, setAnalises] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");

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
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {analises.map((a) => (
            <div
              key={a.id}
              style={{
                background: "#fff",
                border: "1px solid #e5e5e5",
                borderRadius: "8px",
                padding: "20px 24px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: 0, color: "#1a1a1a" }}>
                  {a.descricao}
                </h3>
                <span
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: "12px",
                    background: a.status === "FINALIZADO" ? "#d4edda" : "#fff3cd",
                    color: a.status === "FINALIZADO" ? "#155724" : "#856404",
                  }}
                >
                  {STATUS_LABEL[a.status] ?? a.status}
                </span>
              </div>

              <p style={{ fontSize: "0.82rem", color: "#888", margin: "0 0 10px" }}>
                Emitido em: {formatDate(a.dataEmissao)}
              </p>

              {a.laudo && (
                <div
                  style={{
                    background: "#f5f5f5",
                    borderRadius: "6px",
                    padding: "12px 14px",
                    marginBottom: "10px",
                  }}
                >
                  <p style={{ fontSize: "0.85rem", color: "#555", margin: 0, whiteSpace: "pre-wrap" }}>
                    {a.laudo}
                  </p>
                </div>
              )}

              {a.arquivoUrl && (
                <a
                  href={a.arquivoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    fontSize: "0.85rem",
                    color: "#2d6a4f",
                    textDecoration: "underline",
                    marginTop: "4px",
                  }}
                >
                  Baixar arquivo
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
