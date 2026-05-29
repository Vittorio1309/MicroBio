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
  return r.json();
}

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");
  const [search,   setSearch]   = useState("");
  const [modal,    setModal]    = useState(null);
  const [form,     setForm]     = useState({ nome: "", email: "", telefone: "" });
  const [saving,   setSaving]   = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => { loadClientes(); }, []);

  async function loadClientes() {
    setLoading(true);
    setError("");
    try {
      const data = await fetchJson("/api/pessoas", { headers: getAuthHeader() });
      setClientes(data);
    } catch (err) {
      setError(err.message || "Erro ao carregar clientes.");
    } finally {
      setLoading(false);
    }
  }

  const filtered = clientes.filter(
    (c) =>
      c.nome.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const openNovo = () => {
    setForm({ nome: "", email: "", telefone: "" });
    setSaveError("");
    setModal({ mode: "novo" });
  };

  const openEditar = (c) => {
    setForm({ nome: c.nome, email: c.email, telefone: c.telefone ?? "" });
    setSaveError("");
    setModal({ mode: "editar", id: c.id });
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
      setModal(null);
      await loadClientes();
    } catch (err) {
      setSaveError(err.message || "Erro ao salvar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="clientes-page">
      <h1 className="page-title">Gerenciamento de Clientes</h1>

      <div className="clientes-topbar">
        <input
          type="text"
          className="clientes-search"
          placeholder="Buscar por nome ou e-mail"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn-primary" onClick={openNovo}>
          Novo Cliente
        </button>
      </div>

      {loading && <p className="clientes-empty">Carregando clientes...</p>}
      {error   && <p className="clientes-empty" style={{ color: "#c0392b" }}>{error}</p>}

      {!loading && !error && (
        <div className="clientes-list">
          {filtered.length === 0 && (
            <p className="clientes-empty">Nenhum cliente encontrado.</p>
          )}
          {filtered.map((c) => (
            <div key={c.id} className="cliente-row">
              <span className="cliente-nome">{c.nome}</span>
              <span className="cliente-cpf">{c.telefone ?? "—"}</span>
              <span className="cliente-email">{c.email}</span>
              <button className="btn-primary btn-sm" onClick={() => openEditar(c)}>Editar</button>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              {modal.mode === "novo" ? "Novo Cliente" : "Editar Cliente"}
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
              <p style={{ color: "#c0392b", fontSize: "0.85rem", margin: "8px 0 0" }}>
                {saveError}
              </p>
            )}
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setModal(null)}>Cancelar</button>
              <button className="btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
