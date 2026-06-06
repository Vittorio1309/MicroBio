import { useState, useEffect } from "react";
import "../styles/Analises.css";
import "../styles/Clientes.css";
import "../styles/admin.css";

const STATUS_LABEL = {
  PENDENTE:   "Pendente",
  ACEITO:     "Aceito",
  REJEITADO:  "Rejeitado",
  FINALIZADO: "Concluído",
};

const STATUS_CLASS = {
  PENDENTE:   "status-pendente",
  ACEITO:     "status-concluido",
  REJEITADO:  "status-atraso",
  FINALIZADO: "status-concluido",
};

const COLUMNS = [
  { status: "PENDENTE",   label: "Pendente",  color: "var(--orange)" },
  { status: "ACEITO",     label: "Aceito",    color: "var(--green-mid)" },
  { status: "REJEITADO",  label: "Rejeitado", color: "var(--red)" },
  { status: "FINALIZADO", label: "Concluído", color: "var(--green-dark)" },
];

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
  const [orcamentos,   setOrcamentos]   = useState([]);
  const [pessoasMap,   setPessoasMap]   = useState({});
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState("");
  const [search,       setSearch]       = useState("");
  const [selected,     setSelected]     = useState(null);
  const [statusLoading, setStatusLoading] = useState(null);
  const [draggingId,   setDraggingId]   = useState(null);
  const [overCol,      setOverCol]      = useState(null);

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

  const handleStatusChange = async (id, newStatus) => {
    setStatusLoading(id);
    setError("");
    try {
      const updated = await fetchJson(`/api/orcamentos/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify({ status: newStatus }),
      });
      setOrcamentos((prev) => prev.map((o) => (o.id === id ? updated : o)));
      if (selected?.id === id) setSelected(updated);
    } catch (err) {
      setError(err.message || "Erro ao atualizar status.");
    } finally {
      setStatusLoading(null);
    }
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("id", String(id));
    setDraggingId(id);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setOverCol(null);
  };

  const handleDragOver = (e, status) => {
    e.preventDefault();
    setOverCol(status);
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    setOverCol(null);
    const id = Number(e.dataTransfer.getData("id"));
    const card = orcamentos.find((o) => o.id === id);
    if (!card || card.status === newStatus) { setDraggingId(null); return; }
    setDraggingId(null);
    await handleStatusChange(id, newStatus);
  };

  const q = search.toLowerCase();
  const filtered = orcamentos.filter((o) => {
    if (!search) return true;
    return (o.pessoaNome ?? "").toLowerCase().includes(q) ||
           (o.servicoNome ?? "").toLowerCase().includes(q);
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

      <div className="analises-filters" style={{ marginBottom: "24px" }}>
        <input
          type="text"
          className="filter-select"
          placeholder="Buscar por cliente ou serviço..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ minWidth: "240px" }}
        />
      </div>

      {error && (
        <p style={{ color: "#c0392b", marginBottom: "16px", fontSize: "0.9rem" }}>{error}</p>
      )}

      {loading ? (
        <div className="analises-empty"><p>Carregando...</p></div>
      ) : (
        <div className="kanban-board">
          {COLUMNS.map((col) => {
            const cards = filtered.filter((o) => o.status === col.status);
            return (
              <div
                key={col.status}
                className={`kanban-col${overCol === col.status ? " kanban-col-over" : ""}`}
                onDragOver={(e) => handleDragOver(e, col.status)}
                onDragLeave={() => setOverCol(null)}
                onDrop={(e) => handleDrop(e, col.status)}
              >
                <div className="kanban-col-header">
                  <span style={{ color: col.color }}>{col.label}</span>
                  <span className="kanban-count">{cards.length}</span>
                </div>

                {cards.length === 0 && (
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center", padding: "20px 0" }}>
                    Nenhum orçamento
                  </div>
                )}

                {cards.map((o) => (
                  <div
                    key={o.id}
                    className={`kanban-card${draggingId === o.id ? " kanban-card-dragging" : ""}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, o.id)}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="kanban-card-num">#{o.id}</div>
                    <div className="kanban-card-cliente">{o.pessoaNome ?? "—"}</div>
                    <div className="kanban-card-servico">{o.servicoNome ?? "—"}</div>
                    <div className="kanban-card-footer">
                      <span className="kanban-card-date">{formatDate(o.dataCriacao)}</span>
                      <button
                        className="btn-primary btn-sm"
                        style={{ padding: "4px 10px", fontSize: "0.75rem" }}
                        onClick={() => setSelected(o)}
                      >
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "560px", maxHeight: "85vh", overflowY: "auto" }}
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
                <label className="form-label">Status atual</label>
                <span className={`status-badge ${STATUS_CLASS[selected.status] ?? "status-pendente"}`}>
                  {STATUS_LABEL[selected.status] ?? selected.status}
                </span>
              </div>

              <div className="modal-field">
                <label className="form-label">Alterar Status</label>
                <select
                  className="filter-select"
                  style={{ width: "100%", marginTop: "4px" }}
                  value={selected.status}
                  disabled={statusLoading === selected.id}
                  onChange={(e) => handleStatusChange(selected.id, e.target.value)}
                >
                  {COLUMNS.map((col) => (
                    <option key={col.status} value={col.status}>{col.label}</option>
                  ))}
                </select>
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
                        style={{ borderLeft: "3px solid var(--green-light)", paddingLeft: "12px" }}
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
