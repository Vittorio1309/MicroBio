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
  const token = sessionStorage.getItem("microbio_token");
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
  const [administradores, setAdministradores] = useState([]);

  // SLA Prazos de Acompanhamento
  const [deadlineHours, setDeadlineHours] = useState(48);
  const [prazoFilter, setPrazoFilter] = useState("todos");

  // Estados para Observações
  const [observacoes, setObservacoes] = useState([]);
  const [obsLoading, setObsLoading] = useState(false);
  const [newObsText, setNewObsText] = useState("");
  const [obsError, setObsError] = useState("");
  const [obsModalOpen, setObsModalOpen] = useState(false);
  const [activeOrcamentoForObs, setActiveOrcamentoForObs] = useState(null);

  const getDelayStatus = (o) => {
    if (o.status !== "PENDENTE" && o.status !== "ACEITO") {
      return "finalizado";
    }
    const lastMoveStr = o.dataMovimentacao || o.dataCriacao;
    if (!lastMoveStr) return "prazo";

    const lastMove = new Date(lastMoveStr).getTime();
    const now = new Date().getTime();
    const diffHours = (now - lastMove) / (1000 * 60 * 60);

    if (diffHours > deadlineHours) {
      return "atrasado";
    }
    if (diffHours > deadlineHours * 0.75) {
      return "alerta";
    }
    return "prazo";
  };

  const handleOpenObservacoes = async (orc) => {
    setActiveOrcamentoForObs(orc);
    setObsModalOpen(true);
    setObsLoading(true);
    setObsError("");
    setNewObsText("");
    try {
      const data = await fetchJson(`/api/orcamentos/${orc.id}/observacoes`, { headers: getAuthHeader() });
      setObservacoes(data || []);
    } catch (err) {
      setObsError(err.message || "Erro ao carregar observações.");
    } finally {
      setObsLoading(false);
    }
  };

  const handleAddObservacao = async () => {
    if (!newObsText.trim() || !activeOrcamentoForObs) return;
    setObsError("");
    try {
      const added = await fetchJson(`/api/orcamentos/${activeOrcamentoForObs.id}/observacoes`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify({ texto: newObsText.trim() }),
      });
      setObservacoes((prev) => [...prev, added]);
      setNewObsText("");
    } catch (err) {
      setObsError(err.message || "Erro ao adicionar observação.");
    }
  };

  useEffect(() => {
    const fetchAdminList = fetchJson("/api/admin/usuarios/administradores", { headers: getAuthHeader() });

    Promise.all([
      fetchJson("/api/orcamentos?size=100&sort=dataCriacao,desc", { headers: getAuthHeader() }),
      fetchJson("/api/pessoas", { headers: getAuthHeader() }),
      fetch("/api/admin/configuracoes/prazo_acompanhamento_orcamentos", { headers: getAuthHeader() })
        .then((r) => r.ok ? r.json() : { valor: "48 horas" })
        .catch(() => ({ valor: "48 horas" })),
      fetchAdminList
    ])
      .then(([orcData, pessoaList, configData, adminList]) => {
        setOrcamentos(orcData.content ?? []);
        const map = {};
        pessoaList.forEach((p) => { map[p.id] = p; });
        setPessoasMap(map);
        setAdministradores(adminList || []);

        // Parse deadline
        const val = configData.valor || "48 horas";
        const parts = val.trim().split(/\s+/);
        let num = parseInt(parts[0], 10) || 48;
        const unit = parts[1] || "horas";
        if (unit.startsWith("dia")) {
          num = num * 24;
        }
        setDeadlineHours(num);
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
    setTimeout(() => {
      setDraggingId(id);
    }, 0);
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
    // Filtro textual
    const matchesSearch = !search ||
      (o.pessoaNome ?? "").toLowerCase().includes(q) ||
      (o.servicoNome ?? "").toLowerCase().includes(q);

    if (!matchesSearch) return false;

    // Filtro de prazo
    if (prazoFilter === "todos") return true;

    const delayStatus = getDelayStatus(o);
    if (prazoFilter === "atrasado") {
      return delayStatus === "atrasado";
    }
    if (prazoFilter === "prazo") {
      return (delayStatus === "prazo" || delayStatus === "alerta") && (o.status === "PENDENTE" || o.status === "ACEITO");
    }
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

      <div className="analises-filters" style={{ marginBottom: "24px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <input
          type="text"
          className="filter-select"
          placeholder="Buscar por cliente ou serviço..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ minWidth: "240px", height: "38px" }}
        />

        <select
          className="filter-select"
          value={prazoFilter}
          onChange={(e) => setPrazoFilter(e.target.value)}
          style={{ minWidth: "180px", height: "38px" }}
        >
          <option value="todos">Todos os Prazos</option>
          <option value="prazo">Dentro do Prazo</option>
          <option value="atrasado">Atrasados</option>
        </select>
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

                {cards.map((o) => {
                  const delayStatus = getDelayStatus(o);
                  let cardStyle = {};
                  if (delayStatus === "atrasado") {
                    cardStyle = { borderLeft: "4px solid var(--red)" };
                  } else if (delayStatus === "alerta") {
                    cardStyle = { borderLeft: "4px solid var(--orange)" };
                  } else if (delayStatus === "prazo") {
                    cardStyle = { borderLeft: "4px solid var(--green-mid)" };
                  }

                  return (
                    <div
                      key={o.id}
                      className={`kanban-card${draggingId === o.id ? " kanban-card-dragging" : ""}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, o.id)}
                      onDragEnd={handleDragEnd}
                      style={cardStyle}
                    >
                      <div className="kanban-card-num">#{o.id}</div>
                      <div className="kanban-card-cliente">{o.pessoaNome ?? "—"}</div>
                      <div className="kanban-card-servico">{o.servicoNome ?? "—"}</div>
                      {o.responsavelNome && (
                        <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", marginTop: "4px" }}>
                          👤 {o.responsavelNome}
                        </div>
                      )}
                      
                      {/* Badge de Prazo de Acompanhamento */}
                      {delayStatus === "atrasado" && (
                        <div style={{ fontSize: "0.72rem", background: "#fee2e2", color: "var(--red)", padding: "3px 6px", borderRadius: "4px", fontWeight: 600, display: "inline-block", marginTop: "6px" }}>
                          ⚠️ Acompanhamento atrasado
                        </div>
                      )}
                      {delayStatus === "alerta" && (
                        <div style={{ fontSize: "0.72rem", background: "#fffbeb", color: "var(--orange)", padding: "3px 6px", borderRadius: "4px", fontWeight: 600, display: "inline-block", marginTop: "6px" }}>
                          ⏰ Próximo do vencimento
                        </div>
                      )}
                      {delayStatus === "prazo" && (
                        <div style={{ fontSize: "0.72rem", background: "#ecfdf5", color: "#059669", padding: "3px 6px", borderRadius: "4px", fontWeight: 600, display: "inline-block", marginTop: "6px" }}>
                          ✓ No prazo
                        </div>
                      )}

                      <div className="kanban-card-footer" style={{ gap: "4px", flexWrap: "wrap", marginTop: "8px" }}>
                        <span className="kanban-card-date">{formatDate(o.dataCriacao)}</span>
                        <div style={{ display: "flex", gap: "4px" }}>
                          <button
                            className="btn-secondary btn-sm"
                            style={{ padding: "3px 6px", fontSize: "0.7rem", height: "auto" }}
                            onClick={() => setSelected(o)}
                          >
                            Detalhes
                          </button>
                          <button
                            className="btn-primary btn-sm"
                            style={{ padding: "3px 6px", fontSize: "0.7rem", height: "auto" }}
                            onClick={() => handleOpenObservacoes(o)}
                          >
                            Observações
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
                <label className="form-label">Data de Criação</label>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  {formatDate(selected.dataCriacao)}
                </p>
              </div>

              {selected.dataMovimentacao && (
                <div className="modal-field">
                  <label className="form-label">Última Movimentação</label>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                    {new Date(selected.dataMovimentacao).toLocaleString("pt-BR")}
                  </p>
                </div>
              )}

              <div className="modal-field">
                <label className="form-label">Status atual</label>
                <span className={`status-badge ${STATUS_CLASS[selected.status] ?? "status-pendente"}`}>
                  {STATUS_LABEL[selected.status] ?? selected.status}
                </span>
              </div>

              <div className="modal-field">
                <label className="form-label">Responsável pelo Lead</label>
                <select
                  className="filter-select"
                  style={{ width: "100%", marginTop: "4px" }}
                  value={selected.responsavelId ?? ""}
                  onChange={async (e) => {
                    const val = e.target.value;
                    const newId = val === "" ? null : Number(val);
                    try {
                      const updated = await fetchJson(`/api/orcamentos/${selected.id}/responsavel`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json", ...getAuthHeader() },
                        body: JSON.stringify({ responsavelId: newId }),
                      });
                      setOrcamentos((prev) => prev.map((o) => (o.id === selected.id ? updated : o)));
                      setSelected(updated);
                    } catch (err) {
                      setError(err.message || "Erro ao transferir responsável.");
                    }
                  }}
                >
                  <option value="">Nenhum (Sem responsável)</option>
                  {administradores.map((adm) => (
                    <option key={adm.id} value={adm.id}>
                      {adm.nomePessoa ? `${adm.nomePessoa} (${adm.username})` : adm.username}
                    </option>
                  ))}
                </select>
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

      {obsModalOpen && activeOrcamentoForObs && (
        <div className="modal-overlay" onClick={() => { setObsModalOpen(false); setActiveOrcamentoForObs(null); }}>
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "560px", maxHeight: "85vh", display: "flex", flexDirection: "column" }}
          >
            <div className="modal-header">
              <h2 className="modal-title">Observações - Orçamento #{activeOrcamentoForObs.id}</h2>
              <button className="modal-close-btn" onClick={() => { setObsModalOpen(false); setActiveOrcamentoForObs(null); }}>✕</button>
            </div>

            {obsError && (
              <p style={{ color: "#c0392b", marginBottom: "12px", fontSize: "0.88rem" }}>{obsError}</p>
            )}

            <div style={{ flex: 1, overflowY: "auto", marginBottom: "20px", paddingRight: "8px", maxHeight: "300px" }}>
              {obsLoading ? (
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Carregando observações...</p>
              ) : observacoes.length === 0 ? (
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontStyle: "italic", textAlign: "center", padding: "20px 0" }}>
                  Nenhuma observação registrada.
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {observacoes.map((obs) => (
                    <div
                      key={obs.id}
                      style={{
                        background: "var(--bg-main)",
                        padding: "12px 14px",
                        borderRadius: "8px",
                        border: "1px solid var(--border)"
                      }}
                    >
                      <p style={{ margin: "0 0 6px 0", fontSize: "0.88rem", color: "var(--text-primary)", whiteSpace: "pre-wrap", lineHeight: 1.4 }}>
                        {obs.texto}
                      </p>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--text-muted)" }}>
                        <span>Por: <strong>{obs.usuarioNome}</strong></span>
                        <span>{new Date(obs.dataCriacao).toLocaleString("pt-BR")}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-field" style={{ marginBottom: "20px" }}>
              <label className="form-label" style={{ fontWeight: 600, fontSize: "0.8rem", color: "var(--text-primary)", marginBottom: "4px" }}>Nova Observação</label>
              <textarea
                className="modal-input"
                style={{ resize: "vertical", minHeight: "70px", fontFamily: "inherit" }}
                placeholder="Escreva detalhes ou novidades sobre este orçamento..."
                value={newObsText}
                onChange={(e) => setNewObsText(e.target.value)}
              />
            </div>

            <div className="modal-actions" style={{ marginTop: "auto" }}>
              <button
                className="btn-secondary"
                onClick={() => { setObsModalOpen(false); setActiveOrcamentoForObs(null); }}
              >
                Fechar
              </button>
              <button
                className="btn-primary"
                onClick={handleAddObservacao}
                disabled={!newObsText.trim()}
              >
                Adicionar Observação
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
