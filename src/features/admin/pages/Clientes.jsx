import { useState, useEffect } from "react";
import "../styles/Clientes.css";

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
  return r.status === 204 ? null : r.json();
}

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

export default function Clientes() {
  const [leads,     setLeads]     = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState("");
  const [search,    setSearch]    = useState("");
  const [modal,     setModal]     = useState(null);
  const [form,      setForm]      = useState({ nome: "", email: "", telefone: "" });
  const [saving,    setSaving]    = useState(false);
  const [saveError, setSaveError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => { loadLeads(); }, []);

  async function loadLeads() {
    setLoading(true);
    setError("");
    try {
      const data = await fetchJson("/api/pessoas", { headers: getAuthHeader() });
      setLeads(data);
    } catch (err) {
      setError(err.message || "Erro ao carregar leads.");
    } finally {
      setLoading(false);
    }
  }

  const filtered = leads.filter(
    (c) =>
      c.nome.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const openNovo = () => {
    setForm({ nome: "", email: "", telefone: "" });
    setSaveError("");
    setConfirmDelete(false);
    setModal({ mode: "novo" });
  };

  const openEditar = (c) => {
    setForm({ nome: c.nome, email: c.email, telefone: c.telefone ?? "" });
    setSaveError("");
    setConfirmDelete(false);
    setModal({ mode: "editar", id: c.id });
  };

  const closeModal = () => {
    setModal(null);
    setConfirmDelete(false);
    setSaveError("");
  };

  const handleSave = async () => {
    if (!form.nome || !form.email) {
      setSaveError("Nome e e-mail são obrigatórios.");
      return;
    }
    setSaving(true);
    setSaveError("");
    try {
      if (modal.mode === "novo") {
        await fetchJson("/api/pessoas", {
          method: "POST",
          headers: { "Content-Type": "application/json", ...getAuthHeader() },
          body: JSON.stringify({ nome: form.nome, email: form.email, telefone: form.telefone || null }),
        });
      } else {
        await fetchJson(`/api/pessoas/${modal.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", ...getAuthHeader() },
          body: JSON.stringify({ nome: form.nome, email: form.email, telefone: form.telefone || null }),
        });
      }
      closeModal();
      await loadLeads();
    } catch (err) {
      setSaveError(err.message || "Erro ao salvar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    setSaveError("");
    try {
      await fetchJson(`/api/pessoas/${modal.id}`, {
        method: "DELETE",
        headers: getAuthHeader(),
      });
      closeModal();
      await loadLeads();
    } catch (err) {
      setSaveError(err.message || "Erro ao excluir lead.");
      setConfirmDelete(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="clientes-page">
      <h1 className="page-title">Gerenciamento de Leads</h1>

      <div className="clientes-topbar">
        <input
          type="text"
          className="clientes-search"
          placeholder="Buscar por nome ou e-mail"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn-primary" onClick={openNovo}>
          Novo Lead
        </button>
      </div>

      {loading && <p className="clientes-empty">Carregando leads...</p>}
      {error   && <p className="clientes-empty" style={{ color: "#c0392b" }}>{error}</p>}

      {!loading && !error && (
        <div className="clientes-list">
          {filtered.length === 0 && (
            <p className="clientes-empty">Nenhum lead encontrado.</p>
          )}
          {filtered.map((c) => (
            <div key={c.id} className="cliente-row">
              <span className="cliente-nome">{c.nome}</span>
              <span className="cliente-cpf">{c.telefone ?? "—"}</span>
              <span className="cliente-email">{c.email}</span>
              <span>
                {c.statusUltimoOrcamento ? (
                  <span className={`status-badge ${STATUS_CLASS[c.statusUltimoOrcamento] ?? "status-pendente"}`}>
                    {STATUS_LABEL[c.statusUltimoOrcamento] ?? c.statusUltimoOrcamento}
                  </span>
                ) : (
                  <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Sem orçamento</span>
                )}
              </span>
              <button className="btn-primary btn-sm" onClick={() => openEditar(c)}>Editar</button>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              {modal.mode === "novo" ? "Novo Lead" : "Editar Lead"}
            </h2>
            <div className="modal-fields">
              <div className="modal-field">
                <label className="form-label">Nome</label>
                <input
                  className="modal-input"
                  placeholder="Nome completo"
                  value={form.nome}
                  onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
                />
              </div>
              <div className="modal-field">
                <label className="form-label">E-mail</label>
                <input
                  className="modal-input"
                  type="email"
                  placeholder="email@email.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div className="modal-field">
                <label className="form-label">Telefone</label>
                <input
                  className="modal-input"
                  placeholder="(00) 00000-0000"
                  value={form.telefone}
                  onChange={(e) => setForm((f) => ({ ...f, telefone: e.target.value }))}
                />
              </div>
            </div>

            {saveError && (
              <p style={{ color: "#c0392b", fontSize: "0.85rem", margin: "0 0 12px" }}>
                {saveError}
              </p>
            )}

            {modal.mode === "editar" && confirmDelete && (
              <div style={{ background: "#fff3cd", border: "1px solid #ffc107", borderRadius: "8px", padding: "12px 14px", marginBottom: "16px", fontSize: "0.88rem", color: "#856404" }}>
                Tem certeza que deseja excluir este lead? Esta ação não pode ser desfeita.
              </div>
            )}

            <div className="modal-actions">
              {modal.mode === "editar" && !confirmDelete && (
                <button
                  className="btn-secondary"
                  style={{ marginRight: "auto", color: "#c0392b", borderColor: "#c0392b" }}
                  onClick={() => setConfirmDelete(true)}
                  disabled={saving}
                >
                  Excluir
                </button>
              )}
              {modal.mode === "editar" && confirmDelete && (
                <>
                  <button
                    className="btn-secondary"
                    style={{ marginRight: "auto" }}
                    onClick={() => setConfirmDelete(false)}
                    disabled={saving}
                  >
                    Cancelar exclusão
                  </button>
                  <button
                    style={{ background: "#c0392b", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", fontWeight: 600, fontSize: "0.88rem" }}
                    onClick={handleDelete}
                    disabled={saving}
                  >
                    {saving ? "Excluindo..." : "Confirmar exclusão"}
                  </button>
                </>
              )}
              {!confirmDelete && (
                <>
                  <button className="btn-secondary" onClick={closeModal} disabled={saving}>Cancelar</button>
                  <button className="btn-primary" onClick={handleSave} disabled={saving}>
                    {saving ? "Salvando..." : "Salvar"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
