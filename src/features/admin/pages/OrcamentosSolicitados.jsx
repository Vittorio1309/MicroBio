import { useState, useEffect } from "react";
import "../styles/Analises.css";
import "../styles/Clientes.css";

const STATUS_LABEL = {
  PENDENTE:   "Pendente",
  FINALIZADO: "Concluído",
  ACEITO:     "Aceito",
  REJEITADO:  "Rejeitado",
};

const STATUS_CLASS = {
  PENDENTE:   "status-pendente",
  FINALIZADO: "status-concluido",
  ACEITO:     "status-concluido",
  REJEITADO:  "status-atraso",
};

function getAuthHeader() {
  const token = localStorage.getItem("microbio_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function fetchJson(url, options) {
  const r = await fetch(url, options);
  if (!r.ok) {
    const body = await r.json().catch(() => ({}));
    throw new Error(body.message || `Erro ${r.status}`);
  }
  return r.json();
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("pt-BR");
}

export default function OrcamentosSolicitados() {
  const [orcamentos,  setOrcamentos]  = useState([]);
  const [pessoasMap,  setPessoasMap]  = useState({});
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState("");
  const [search,      setSearch]      = useState("");
  const [filterStatus, setFilterStatus] = useState("Todos");
  const [selected,    setSelected]    = useState(null);

  useEffect(() => {
    Promise.all([
      fetchJson("/api/orcamentos?size=100&sort=dataCriacao,desc", { headers: getAuthHeader() }),
      fetchJson("/api/pessoas", { headers: getAuthHeader() }),
    ])
      .then(([orcData, pessoaList]) => {
        setOrcamentos(orcData.content ?? []);
        const map = {};
        pessoaList.forEach((p) => { map[p.id] = p; });
        setPessoasMap(map);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Erro ao carregar orçamentos.");
        setLoading(false);
      });
  }, []);

  const statuses = ["Todos", "PENDENTE", "ACEITO", "REJEITADO", "FINALIZADO"];

  const filtered = orcamentos.filter((o) => {
    const nome    = (o.pessoaNome  ?? "").toLowerCase();
    const servico = (o.servicoNome ?? "").toLowerCase();
    const q = search.toLowerCase();
    if (search && !nome.includes(q) && !servico.includes(q)) return false;
    if (filterStatus !== "Todos" && o.status !== filterStatus) return false;
    return true;
  });

  const selectedPessoa = selected ? pessoasMap[selected.pessoaId] : null;

  return (
    <div className="analises-page">
      <div className="page-header-row">
        <h1 className="page-title" style={{ marginBottom: 0, borderBottom: "none", paddingBottom: 0 }}>
          Orçamentos Solicitados
        </h1>
      </div>

      <div className="analises-divider" />

      <div className="analises-filters">
        <input
          type="text"
          className="filter-select"
          placeholder="Buscar por cliente ou serviço..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ minWidth: "220px" }}
        />
        <select
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s === "Todos" ? "Status: Todos" : STATUS_LABEL[s] ?? s}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p style={{ color: "#c0392b", marginBottom: "16px", fontSize: "0.9rem" }}>{error}</p>
      )}

      {loading ? (
        <div className="analises-empty"><p>Carregando...</p></div>
      ) : filtered.length === 0 ? (
        <div className="analises-empty"><p>Nenhum orçamento encontrado.</p></div>
      ) : (
        <div className="analises-table-wrap">
          <table className="analises-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Serviço</th>
                <th>Data</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id}>
                  <td className="text-muted">{o.id}</td>
                  <td>{o.pessoaNome ?? "—"}</td>
                  <td className="text-muted">{o.servicoNome ?? "—"}</td>
                  <td className="text-muted">{formatDate(o.dataCriacao)}</td>
                  <td>
                    <span className={`status-badge ${STATUS_CLASS[o.status] ?? "status-pendente"}`}>
                      {STATUS_LABEL[o.status] ?? o.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-primary btn-sm" onClick={() => setSelected(o)}>
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "560px", maxHeight: "80vh", overflowY: "auto" }}
          >
            <h2 className="modal-title">Orçamento #{selected.id}</h2>

            <div className="modal-fields">
              <div className="modal-field">
                <label className="form-label">Cliente</label>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  {selected.pessoaNome ?? "—"}
                </p>
              </div>

              <div className="modal-field">
                <label className="form-label">Telefone</label>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  {selectedPessoa?.telefone ?? "—"}
                </p>
              </div>

              <div className="modal-field">
                <label className="form-label">Email</label>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  {selectedPessoa?.email ?? "—"}
                </p>
              </div>

              <div className="modal-field">
                <label className="form-label">Serviço Solicitado</label>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  {selected.servicoNome ?? "—"}
                </p>
              </div>

              <div className="modal-field">
                <label className="form-label">Data</label>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  {formatDate(selected.dataCriacao)}
                </p>
              </div>

              <div className="modal-field">
                <label className="form-label">Status</label>
                <span className={`status-badge ${STATUS_CLASS[selected.status] ?? "status-pendente"}`}>
                  {STATUS_LABEL[selected.status] ?? selected.status}
                </span>
              </div>

              {selected.observacao && (
                <div className="modal-field">
                  <label className="form-label">Observação</label>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                    {selected.observacao}
                  </p>
                </div>
              )}

              {selected.respostas && selected.respostas.length > 0 && (
                <div className="modal-field">
                  <label className="form-label">Informações do Serviço</label>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "6px" }}>
                    {selected.respostas.map((r, i) => (
                      <div
                        key={i}
                        style={{
                          borderLeft: "3px solid var(--green-light)",
                          paddingLeft: "12px",
                        }}
                      >
                        <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "3px" }}>
                          {r.pergunta}
                        </p>
                        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                          {r.resposta ?? "—"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setSelected(null)}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
